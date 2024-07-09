import Image from 'next/image';
import React from 'react';
import pokemonData from './dumy';
import { hashtagData } from './dumy';

const Page: React.FC = () => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 py-10">
      <div className="w-[600px] rounded-lg bg-white p-7 shadow-lg">
        {/* <h1 className="text-center text-3xl font-bold mb-8">여기는 마이페이지다</h1> */}
        <div className="mb-8 mt-5">
          <div className="flex items-center justify-between rounded-md bg-gray-200 p-4">
            <div className="flex items-center">
              <Image src="/img1.png" alt="userImage" width={100} height={100} className="rounded-full" />
              <div className="ml-4">
                {hashtagData.map((hashtag) => (
                  <div key={hashtag.id}>
                    <h4 className="font-bold">#{hashtag.hashtag}</h4>
                  </div>
                ))}
              </div>
            </div>
            <button className="rounded-md bg-gray-400 px-2 py-1">수정</button>
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-bold">내 포켓몬</h2>
        <div className="mb-5 grid grid-cols-3 gap-8">
          {pokemonData.map((mypokemon) => (
            <div key={mypokemon.id} className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative mb-4 h-24 w-24">
                  <Image
                    src={mypokemon.image}
                    alt={mypokemon.name}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="mb-2 font-bold">{mypokemon.name}</h3>
                <button className="rounded-md bg-gray-400 px-2 py-1">상세정보</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
