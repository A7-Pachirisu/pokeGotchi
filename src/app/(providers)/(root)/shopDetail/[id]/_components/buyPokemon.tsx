import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { notify } from '@/utils/toastify';

const buyPokemon = async (pokemonNumber: number, gifUrl: string, pokemonName: string) => {
  const { user, deductCoins } = useUserStore.getState();
  const supabase = createClient();
  const pokemon_price = 50;

  if (!user) {
    notify('로그인이 필요합니다');
    window.location.href = '/log-in';
    return false;
  }

  const { data, error } = await supabase
    .from('user_pokemons')
    .select('*')
    .eq('userId', user.id)
    .eq('pokemonNumber', pokemonNumber)
    .single();

  if (data) {
    notify('소유하고 있는 포켓몬입니다');
    return;
  }

  const success = await deductCoins(pokemon_price);

  if (success) {
    const { error } = await supabase.from('user_pokemons').insert([
      {
        userId: user.id,
        pokemonNumber: pokemonNumber,
        gifUrl: gifUrl,
        pokemonName: pokemonName
      }
    ]);
    if (error) {
      console.error(error);
    } else {
      notify('포켓몬을 데려왔습니다');
    }
  } else {
    notify('코인이 부족합니다');
  }
};

export default buyPokemon;
