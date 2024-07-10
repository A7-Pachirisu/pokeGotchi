import { Pokemon } from '@/types/pokemonType';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Alert from './_components/alert';
import Confirm from './_components/confirm';
import Graph from './_components/statGraph';

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

  return (
    <>
      <div className="my-[5%] text-center text-2xl"></div>
      <div className="mx-auto w-10/12 rounded-lg border bg-gray-200 text-center">
        <div className="my-5 flex justify-center gap-2 text-3xl">
          <div className="text-orange-500">No.{pokemons.id}</div>
          <div>{pokemons.korean_name}</div>
        </div>
        <div className="mt-3 h-[100] w-[100]">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemons.id}.gif`}
            alt={'pokemon_img'}
            unoptimized
            width={100}
            height={100}
            className="mx-auto flex justify-center"
          />
        </div>
        <div className="mx-auto my-7 w-4/5 rounded-md bg-white p-5">
          <div className="mx-auto w-1/5 rounded-md text-xl">Lv.1</div>
          {pokemons.stats.map((pokemon, index) => {
            const ratio = pokemon.base_stat % 100;
            return (
              <div key={index}>
                <div className="my-6 flex items-center gap-3 text-lg">
                  <div className="w-3/5 font-bold">{pokemon.stat.name}</div>
                  <div className="flex w-2/3 justify-center">
                    <Graph ratio={ratio} />
                  </div>
                  <div className="text-red-500">{pokemon.base_stat}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Confirm />
        <Alert />
      </div>
      <Link href={'/shop/'}>
        <IoArrowBackCircleOutline className="fixed bottom-20 ml-5 text-5xl text-gray-600" />
      </Link>
    </>
  );
};

export default ShopDetailPage;
