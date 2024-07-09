'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import users from './dumy';

const Page: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div>유저를 찾을 수 없습니다.</div>;
  }

  const userId = parseInt(id as string, 10);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return <div>유저를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[600px] rounded-lg bg-white p-7 shadow-lg">
        <div className="mb-8 mt-5">
          <div className="flex items-center justify-between rounded-md bg-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-24 h-24 relative">
                <Image src={user.profileImage} alt="userImage" layout="fill" className="rounded-full object-cover" />
              </div>
              <div className="ml-5 flex flex-col">
                <div className="text-lg font-bold mb-2">{user.name}</div>
                {user.hashtags.map((hashtag) => (
                  <div key={hashtag.id}>
                    <h4 className="font-lighter">#{hashtag.hashtag}</h4>
                  </div>
                ))}
              </div>
            </div>
            <button className="rounded-md bg-gray-400 px-2 py-1">수정</button>
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-bold">내 포켓몬</h2>
        <div className="mb-5 grid grid-cols-3 gap-8">
          {user.pokemons.map((mypokemon) => (
            <div key={mypokemon.id} className="rounded-lg bg-gray-100 p-4 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative mb-4 w-24 h-24">
                  <Image src={mypokemon.image} alt={mypokemon.name} fill className="rounded-full object-cover" sizes="100%" />
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
