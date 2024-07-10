'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';
import { Pokemon } from '../../../../../types/pokemonType';
import { BiCoinStack } from 'react-icons/bi';
import Link from 'next/link';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import topBtn from './_components/topBtn';
import { BsWallet2 } from 'react-icons/bs';

const getPokemons = async () => {
  const res = await fetch('http://localhost:3000/api/shop');
  const data: Pokemon[] = await res.json();
  return data;
};

const ShopPage = () => {
  const {
    data: pokemons,
    isLoading,
    isError
  } = useQuery<Pokemon[]>({
    queryKey: ['pokemonsQuery'],
    queryFn: getPokemons
  });

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="text-center text-3xl">로딩중. . .</div>
      </div>
    );
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  return (
    <>
      <div className="relative mx-auto h-screen w-[600px]">
        <div className="align-center mx-auto my-auto mt-7 flex justify-center text-center text-3xl">포켓몬 상점</div>
        <div className="my-5 flex justify-between">
          <div className="mx-3 rounded-md border border-gray-400 p-2 text-3xl shadow-md">
            <div>Lv.1</div>
          </div>

          <div className="align-center mx-3 flex gap-2 rounded-md border border-gray-400 px-3 py-2 text-2xl shadow-md">
            <BsWallet2 className="my-auto text-yellow-400" />
            50
          </div>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-3 gap-1 text-center">
          {pokemons?.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="mx-1 my-1 rounded-md border border-gray-300 p-3 shadow-lg hover:scale-105"
              >
                <Link href={`/shopDetail/${pokemon.id}`}>
                  <div className="align-center flex justify-end text-xl">
                    <BiCoinStack className="my-auto text-yellow-400" />
                    50
                  </div>
                  <div className="align-center mx-auto flex h-[100px] w-[100px] justify-center">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
                      alt={'pokemon_img'}
                      unoptimized
                      width={100}
                      height={100}
                    />
                  </div>

                  <div>
                    <div className="my-2 text-xl">{pokemon.korean_name}</div>
                  </div>

                  <button className="border-custom-green bg-custom-green rounded-md border px-3 text-lg text-white shadow-sm shadow-black hover:brightness-95">
                    Buy
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
        <Link href={'/'}>
          <IoArrowBackCircleOutline className="fixed bottom-20 ml-5 text-5xl text-gray-600" />
        </Link>
        <IoArrowUpCircleOutline
          className="fixed bottom-20 right-[calc(50%-300px)] mr-5 cursor-pointer text-5xl text-gray-600"
          onClick={topBtn}
        />
      </div>
    </>
  );
};

export default ShopPage;
