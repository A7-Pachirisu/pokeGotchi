'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import profile1 from '@/assets/random profile1.png';
import profile2 from '@/assets/random profile2.png';
import profile3 from '@/assets/random profile3.png';
import ball1 from '@/assets/1st ball.png';
import ball2 from '@/assets/2nd ball.png';
import ball3 from '@/assets/3rd ball.png';
import supabase from '@/supabase/client';

type UserProfileProps = {
  id: string;
  profile_image: string | null;
  nickname: string | null;
  gameScore_ball: number;
  gameScore_quiz: number;
};

const imgPaths = [
  {
    profileImg: profile1,
    ballImg: ball1
  },
  {
    profileImg: profile2,
    ballImg: ball2
  },
  {
    profileImg: profile3,
    ballImg: ball3
  }
];

const fetchAllUsers = async (): Promise<UserProfileProps[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, profile_image, nickname, gameScore_ball, gameScore_quiz');

  if (error) throw new Error(error.message);

  return data as UserProfileProps[];
};

const RankItem: React.FC = () => {
  const {
    data: users,
    error,
    isLoading
  } = useQuery<UserProfileProps[]>({
    queryKey: ['users'],
    queryFn: fetchAllUsers
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rankedUsers = users
    ? users
        .map((user) => ({
          ...user,
          totalScore: user.gameScore_ball + user.gameScore_quiz
        }))
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 3)
    : [];

  return (
    <div className="flex w-full">
      <div className="flex w-full justify-around">
        {rankedUsers.map((user, index) => (
          <div key={user.id}>
            <p className="text-lg">{index + 1}</p>
            <div className="h-[100px] w-[100px] rounded-full border border-gray-200 text-center">
              {user.profile_image ? (
                <Image
                  src={user.profile_image}
                  alt="profileImg"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full"
                />
              ) : (
                <Image
                  src={imgPaths[index].profileImg}
                  alt="defaultProfileImg"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full"
                />
              )}
              <Image
                src={imgPaths[index].ballImg}
                alt="ballImg"
                width={40}
                height={40}
                className="ml-[65px] mt-[-30px] h-[40px] w-[40px]"
              />
              <p className="">{user.nickname}</p>
              <p className="">총점수: {user.totalScore}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankItem;
