import React from 'react';
import Image from 'next/image';
import img from '@/assets/random profile1.png';

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
