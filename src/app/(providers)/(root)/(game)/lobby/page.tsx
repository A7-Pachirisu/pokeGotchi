import React from 'react';
import LinkItem from './_components/LinkItem';
import Link from 'next/link';

const GameLobbyPage = () => {
  return (
    <div className="flex-col text-center">
      <div className="mt-40">유저정보</div>
      <div className="mt-20 grid">
        <LinkItem href="/ball" altText="lobby-ball" className="bg-custom-yellow">
          포켓볼 피하기
        </LinkItem>
        <LinkItem href="/quiz" altText="lobby-quiz" className="bg-custom-blue">
          퀴즈 맞히기
        </LinkItem>
        <LinkItem href="/fruit" altText="lobby-fruit" className="bg-custom-red">
          수박 게임
        </LinkItem>
      </div>
      <Link href="/">GoHome</Link>
    </div>
  );
};

export default GameLobbyPage;
