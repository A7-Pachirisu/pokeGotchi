'use client';
import Button from '@/components/Button';
import { Pokemon } from '@/types/pokemonType';
import { useQuery } from '@tanstack/react-query';
import { BiCoinStack } from 'react-icons/bi';
import PokeCard from './_components/PokeCard';

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
      <div className="align-center mx-auto my-auto mt-7 flex justify-center text-center text-3xl">포켓몬 상점</div>

      <div className="m-5 flex justify-between">
        <Button intent="white" size="md">
          <span>Lv.1</span>
        </Button>
        <Button intent="white" size="md">
          <BiCoinStack className="my-auto text-yellow-400" />
          <span>50</span>
        </Button>
      </div>

      <div className="mx-auto mt-10 grid grid-cols-3 gap-3 text-center">
        {pokemons?.map((pokemon) => {
          return <PokeCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </>
  );
};

export default ShopPage;
