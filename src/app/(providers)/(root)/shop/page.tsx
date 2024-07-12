'use client';
import { useQuery } from '@tanstack/react-query';
import { Pokemon } from '@/types/pokemonType';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import topBtn from './_components/topBtn';
import { BsWallet2 } from 'react-icons/bs';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import PokeCard from './_components/PokeCard';

const getPokemons = async () => {
  const res = await fetch('http://localhost:3000/api/shop');
  const data: Pokemon[] = await res.json();
  return data;
};

const ShopPage = () => {
  const { coins, nickname, fetchUserAndCoinInfo, ownedPokemons } = useUserStore();
  const {
    data: pokemons,
    isLoading,
    isError
  } = useQuery<Pokemon[]>({
    queryKey: ['pokemonsQuery'],
    queryFn: getPokemons
  });

  useEffect(() => {
    fetchUserAndCoinInfo();
  }, [fetchUserAndCoinInfo]);

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
  const owned = pokemons?.filter((pokemon) => !ownedPokemons.includes(pokemon.id)) || [];
  const unOwned = pokemons?.filter((pokemon) => ownedPokemons.includes(pokemon.id)) || [];
  const filterPokemons = [...owned, ...unOwned];

  return (
    <>
      <div className="relative mx-auto h-screen w-[600px]">
        <div className="align-center mx-auto my-auto mt-7 flex justify-center text-center text-3xl">포켓몬 상점</div>
        <div className="my-5 flex justify-between">
          <div className="mx-3 rounded-md border border-gray-400 p-2 text-3xl shadow-md">
            <div>{nickname}</div>
          </div>

          <div className="align-center mx-3 flex gap-2 rounded-md border border-gray-400 px-3 py-2 text-2xl shadow-md">
            <BsWallet2 className="my-auto text-yellow-400" />
            {coins}
          </div>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-3 gap-1 text-center">
          {filterPokemons?.map((pokemon) => {
            return <PokeCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
        <IoArrowUpCircleOutline
          className="fixed bottom-20 right-[calc(50%-300px)] mr-5 cursor-pointer text-5xl text-gray-600"
          onClick={topBtn}
        />
      </div>
    </>
  );
};

export default ShopPage;
