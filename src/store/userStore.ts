//유저 정보, 코인, 닉네임 가져오기 (users 테이블)
import { create } from 'zustand';
import { createClient } from '@/supabase/client';

interface userState {
  user: any;
  coins: number | null;
  fetchUserAndCoinInfo: () => void;
  nickname: string | null;
  deductCoins: (amount: number) => Promise<boolean>;
}

export const useUserStore = create<userState>((set) => ({
  user: null,
  coins: null,
  nickname: null,

  fetchUserAndCoinInfo: async () => {
    const supabase = createClient();
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('에러가 발생했습니다:', userError.message);
      return;
    }

    set({ user });

    if (user) {
      const { data, error } = await supabase.from('users').select('coins, nickname').eq('id', user.id).single();

      if (error) {
        console.error('에러가 발생했습니다:', error.message);
      } else {
        set({
          coins: data.coins,
          nickname: data.nickname
        });
      }
    }
  },

  //코인 차감
  deductCoins: async (amount: number) => {
    const supabase = createClient();
    const { user, coins } = useUserStore.getState();

    if (user && coins !== null && coins >= amount) {
      const updateCoin = coins - amount;

      const { error } = await supabase.from('users').update({ coins: updateCoin }).eq('id', user.id);

      if (error) {
        console.error('에러가 발생했습니다', error.message);
        return false;
      } else {
        set({ coins: updateCoin });
        return true;
      }
    } else {
      return false;
    }
  }
}));
