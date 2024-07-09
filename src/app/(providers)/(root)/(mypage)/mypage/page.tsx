import Image from 'next/image';
import React from 'react';
import pokemonData from './dumy';

const Page: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white w-[600px] p-7 rounded-lg shadow-lg">
        {/* <h1 className="text-center text-3xl font-bold mb-8">여기는 마이페이지다</h1> */}
        <div className="mb-8 mt-5">
          <div className="bg-gray-200 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/img1.png" alt="userImage" width={100} height={100} className="rounded-full" />
              <div className="ml-4">
                <h4 className="font-bold">#갸라도스의 폭풍 속에서</h4>
                {/* 여기에 뭐를 어떻게 넣을까 */}
              </div>
            </div>
            <button className="bg-gray-400 px-2 py-1 rounded-md">수정</button>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">내 포켓몬</h2>
        <div className="grid grid-cols-3 gap-8">
          {pokemonData.map((mypokemon) => (
            <div key={mypokemon.id} className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 mb-4">
                  <Image
                    src={mypokemon.image}
                    alt={mypokemon.name}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-bold mb-2">{mypokemon.name}</h3>
                <button className="bg-gray-400 px-2 py-1 rounded-md">상세정보</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
