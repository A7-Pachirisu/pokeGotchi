import { create } from 'zustand';
import { userState } from '@/types/userStateType';
import { getUserInfo, coinAndNicknameInfo, ownedPokemonList, updateCoin } from '@/services/supabaseService';

export const useUserStore = create<userState>((set) => ({
  user: null,
  coins: null,
  nickname: null,
  ownedPokemons: [],

  // 닉네임, 코인 정보, 소유 포켓몬
  fetchUserAndCoinInfo: async () => {
    const user = await getUserInfo();
    set({ user });
    if (user) {
      const userData = await coinAndNicknameInfo(user.id);
      const ownedPokemons = await ownedPokemonList(user.id);
      set({ coins: userData?.coins, nickname: userData?.nickname, ownedPokemons });
    }
  },

  // 코인 차감
  deductCoins: async (amount: number) => {
    const { user, coins } = useUserStore.getState();
    if (user && coins !== null && coins >= amount) {
      await updateCoin(user.id, coins - amount);
      set((state) => ({ coins: state.coins! - amount }));
      return true;
    }
    return false;
  },

  // 소유 포켓몬
  fetchOwnedPokemons: async () => {
    const { user } = useUserStore.getState();
    if (user) {
      set({ ownedPokemons: await ownedPokemonList(user.id) });
    }
  }
}));
