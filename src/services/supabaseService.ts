import { createClient } from '@/supabase/client';

const supabase = createClient();

export const getUserInfo = async () => {
  // 유저 정보
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) console.error('유저 정보 조회 실패', error.message);
  return user;
};

export const coinAndNicknameInfo = async (userId: string) => {
  //코인, 닉네임
  const { data: coinNickname, error } = await supabase
    .from('users')
    .select('coins, nickname')
    .eq('id', userId)
    .single();
  if (error) console.error('코인, 닉네임 조회 실패', error.message);
  return coinNickname;
};

export const ownedPokemonList = async (userId: string) => {
  //소유 포켓몬
  const { data: own, error } = await supabase.from('user_pokemons').select('pokemonNumber').eq('userId', userId);
  if (error) console.error('에러가 발생했습니다:', error.message);
  return own ? own.map((pokemon) => pokemon.pokemonNumber!).filter((pokemonNumber) => pokemonNumber !== null) : [];
};

export const updateCoin = async (userId: string, coins: number) => {
  //코인 업데이트
  const { error } = await supabase.from('users').update({ coins }).eq('id', userId);
  if (error) console.error('에러가 발생했습니다:', error.message);
};
