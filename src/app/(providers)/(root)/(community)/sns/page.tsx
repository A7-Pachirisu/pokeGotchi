'use client';

import React, { useEffect, useState } from 'react';
import RankItem from './_components/RankItem';
import PostItem from './_components/PostItem';
import Link from 'next/link';
import { FaPencil } from 'react-icons/fa6';
import { supabase } from '@/supabase/supabaseClient';
import { useAuth } from '@/contexts/auth.context/auth.context';

function Page() {
  const [posts, setPosts] = useState<any[]>([]);
  const { me } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*, user:users(id, profile_image, nickname)')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('게시물 fetch 에러: ', error);
      } else {
        setPosts(data || []);
      }
    }

    fetchPosts();
  }, [me]);

  return (
    <div className="">
      <header className="mt-10">
        <h2 className="ml-10 text-lg font-semibold">랭킹</h2>
        <RankItem />
      </header>
      <main className="mt-20">
        <div className="mr-[70px] mt-2 flex justify-between text-xl">
          <h1 className="ml-10 text-lg font-semibold">자랑하기</h1>
          <Link href="/upload">
            <FaPencil />
          </Link>
        </div>
        <PostItem posts={posts} />
      </main>
    </div>
  );
}

export default Page;
