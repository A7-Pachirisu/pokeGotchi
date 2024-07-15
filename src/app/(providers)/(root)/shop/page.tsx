'use client';
import { useUserStore } from '@/store/userStore';
import { Pokemon } from '@/types/pokemonType';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BiCoinStack } from 'react-icons/bi';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import PokeCard from './_components/PokeCard';
import TopBtn from './_components/topBtn';

const getPokemons = async ({ pageParam = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shop?page=${pageParam}`);
  const data = await res.json();
  return data;
};

const ShopPage = () => {
  const { coins, nickname, fetchUserAndCoinInfo } = useUserStore();

  useEffect(() => {
    fetchUserAndCoinInfo();
  }, [fetchUserAndCoinInfo]);

  const {
    data: pokemons,
    fetchNextPage, // 다음 페이지 데이터 가져옴
    hasNextPage, // 다음 페이지 있는지 확인
    isFetchingNextPage, // 다음 페이지를 가져오는 중인지 확인
    isLoading
  } = useInfiniteQuery({
    queryKey: ['pokemonsQuery'],
    queryFn: getPokemons,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1
  });

  const { ref, inView } = useInView(); // 스크롤 감지

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="text-center text-3xl">로딩중. . .</div>
      </div>
    );
  }
  return (
    <>
      <div className="relative mx-auto h-screen w-[600px]">
        <div className="align-center mx-auto my-auto mt-7 flex justify-center text-center text-3xl">포켓몬 상점</div>
        <div className="my-5 flex justify-between">
          <div className="mx-3 rounded-md border border-gray-400 p-2 text-3xl shadow-md">{nickname}</div>
          <div className="align-center mx-3 flex gap-2 rounded-md border border-gray-400 px-3 py-2 text-2xl shadow-md">
            <BiCoinStack className="my-auto text-yellow-400" />
            {coins}
          </div>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-3 gap-1 text-center">
          {pokemons?.pages.map((page) =>
            page.result.map((pokemon: Pokemon) => <PokeCard key={pokemon.id} pokemon={pokemon} />)
          )}
        </div>
        {isFetchingNextPage ? <div className="my-2 text-center text-2xl">로딩중...</div> : <div ref={ref}></div>}
        <IoArrowUpCircleOutline
          className="fixed bottom-20 right-[calc(50%-300px)] mr-5 cursor-pointer text-5xl text-gray-600"
          onClick={TopBtn}
        />
      </div>
    </>
  );
};

export default ShopPage;
