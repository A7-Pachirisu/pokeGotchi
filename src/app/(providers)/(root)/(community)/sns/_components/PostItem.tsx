import React from 'react';
import Image from 'next/image';
import img from '@/assets/random profile1.png';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { supabase } from '@/supabase/supabaseClient';
import Link from 'next/link';

const defaultProfileImage = img.src;

interface PostItemType {
  id: number;
  content: string;
  img_url: string;
  user_id: number;
  user: {
    profile_image: string | null;
    nickname: string | null;
  };
}

interface PostItemProps {
  posts: PostItemType[];
}

const PostItem: React.FC<PostItemProps> = ({ posts }) => {
  const { me } = useAuth();

  const handleDelete = async (postId: number) => {
    const confirmDelete = window.confirm('이 게시물을 삭제하시겠습니까?');
    if (confirmDelete) {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) {
        console.error('게시물 삭제 에러:', error);
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className="mt-5 flex w-full flex-col items-center">
      {posts.map((item: PostItemType, index: number) => (
        <main key={index} className="mb-10 h-[500px] w-[450px] rounded-xl border border-gray-300">
          <div className="ml-5 mt-3 flex items-center">
            <Image
              src={item.user.profile_image || defaultProfileImage}
              alt="profile"
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-full border border-gray-300"
            />
            <p className="ml-5">{item.user.nickname || 'Unknown User'}</p>
            {me?.id?.toString() === item.user_id.toString() && (
              <div className="ml-auto mr-5 flex items-center">
                <Link href={`/edit/${item.id}`}>
                  <button className="mr-3 text-blue-500">수정</button>
                </Link>
                <button onClick={() => handleDelete(item.id)} className="text-red-500">
                  삭제
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Image
              src={item.img_url}
              alt="bgImg"
              width={400}
              height={250}
              className="mt-5 h-[250px] w-[400px] rounded-lg border"
            />
          </div>
          <div className="flex justify-center">
            <p className="mt-5 w-[380px]">{item.content}</p>
          </div>
        </main>
      ))}
    </div>
  );
};

export default PostItem;
