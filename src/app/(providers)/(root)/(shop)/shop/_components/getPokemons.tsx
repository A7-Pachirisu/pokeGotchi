import { Pokemon } from '@/types/pokemonType';

const GetPokemons = async () => {
  const res = await fetch('http://localhost:3000/api/shop');
  const data: Pokemon[] = await res.json();
  return data;
};

export default GetPokemons;
