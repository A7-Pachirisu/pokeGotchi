import { Pokemon } from '@/types/pokemonType';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import PokemonConfirm from './_components/PokemonConfirm';
import StatGraph from './_components/statGraph';

const ShopDetailPage = async ({
  params
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/shop/${id}`);
  const pokemons: Pokemon = await res.json();

  const pokemonGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemons.id}.gif`;
  return (
    <>
      <div className="mx-10 flex h-full flex-col items-center justify-center rounded-lg border bg-gray-200">
        <div className="my-5 flex justify-center gap-2 text-3xl">
          <div className="mr-2 text-orange-500">No.{pokemons.id}</div>
          <div>{pokemons.korean_name}</div>
        </div>
        <div className="mt-3 h-[100] w-[100]">
          <Image
            src={pokemonGif}
            alt={'pokemon_img'}
            width={100}
            height={100}
            className="mx-auto flex justify-center"
            unoptimized
          />
        </div>
        <div className="mx-auto my-7 w-4/5 rounded-md bg-white p-5">
          {pokemons.stats.map((pokemon, index) => {
            const ratio = pokemon.base_stat % 100;
            return (
              <div key={index}>
                <div className="my-6 flex items-center gap-3 text-lg">
                  <div className="w-3/5 font-bold">{pokemon.stat.name}</div>
                  <div className="flex w-2/3 justify-center">
                    <StatGraph ratio={ratio} />
                  </div>
                  <div className="text-red-500">{pokemon.base_stat}</div>
                </div>
              </div>
            );
          })}
        </div>
        <PokemonConfirm pokemonNumber={pokemons.id} gifUrl={pokemonGif} pokemonName={pokemons.korean_name} />
      </div>
      <Link href={'/shop/'}>
        <IoArrowBackCircleOutline className="fixed bottom-20 ml-5 text-5xl text-gray-600" />
      </Link>
    </>
  );
};

export default ShopDetailPage;
