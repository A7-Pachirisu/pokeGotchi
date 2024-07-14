'use client';
import React, { useEffect, useState } from 'react';
import LobbyButton from './_components/LobbyButton';
import { BiCoinStack } from 'react-icons/bi';
import { useUserStore } from '@/store/userStore';

interface User {
  profile_image: string | null;
  nickname: string | null;
  hashtags: string[] | null;
  gameScore_ball: number;
  gameScore_quiz: number;
  gameScore_fruit: number;
  coins: number;
  id: string;
}

const GameLobbyPage = () => {
  const { nickname, coins, fetchUserAndCoinInfo, user } = useUserStore();

  useEffect(() => {
    fetchUserAndCoinInfo();
  }, []);

  if (!user) {
    <div className="flex min-h-full items-center justify-center">
      <div className="text-center text-3xl">로딩중. . .</div>
    </div>;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
      <div className="flex h-32 items-center justify-center rounded-lg bg-blue-500 p-4 shadow-sm">
        <div className="flex flex-col items-start">
          <div className="text-2xl font-bold">
            <h1>유저 정보</h1>닉네임:{nickname || 'Trainer'}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm font-bold">보유 코인: {coins}</span>
            <BiCoinStack className="mx-2 text-yellow-400" />
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col items-center gap-y-10">
        <LobbyButton intent="yellow" size="xl" href="/game/ball" title="포켓볼 피하기 게임" />
        <LobbyButton intent="blue" size="xl" href="/game/quiz" title="퀴즈 맞추기 게임" />
        <LobbyButton intent="red" size="xl" href="/game/fruit" title="수박 게임" />
      </div>
    </div>
  );
};

export default GameLobbyPage;
