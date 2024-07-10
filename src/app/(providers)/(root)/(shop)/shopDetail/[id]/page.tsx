import { Pokemon } from '@/types/pokemonType';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Alert from './_components/alert';
import Confirm from './_components/confirm';

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
      <div className="my-[5%] text-center text-2xl">
        <div>{pokemons.korean_name}</div>
        <div>No.{pokemons.id}</div>
      </div>
      <div className="mx-auto w-96 rounded-lg border bg-gray-200 text-center">
        <div className="mx-1 my-1 w-1/5 rounded-md border border-gray-400 p-1 text-2xl shadow-md">Lv.1</div>
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
        <div className="mx-auto my-7 w-3/4 rounded-md bg-white">
          {pokemons.stats.map((pokemon, index) => {
            return (
              <div key={index}>
                <div>{pokemon.stat.name}</div>
                <div>{pokemon.base_stat}</div>
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
