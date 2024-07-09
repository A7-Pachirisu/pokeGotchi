import React from 'react';
import RankItem from './_components/RankItem';
import PostItem from './_components/PostItem';

function page() {
  return (
    <div className="">
      <header className="mt-10">
        <h1 className="ml-10 text-lg font-semibold">랭킹</h1>
        <RankItem />
      </header>
      <main className="mt-16">
        <h1 className="ml-10 text-lg font-semibold">자랑하기</h1>
        <PostItem />
      </main>
    </div>
  );
}

export default page;
