import React from 'react';
import Image from 'next/image';
import { BiCoinStack } from 'react-icons/bi';

const defaultProfileImage = '/random_profile1.png';

interface UserProfileProps {
  user: {
    profile_image: string | null;
    nickname: string | null;
    hashtags: string[] | null;
    gameScore_ball: number;
    gameScore_quiz: number;
    gameScore_fruit: number;
    coins: number;
    id: string;
  };
  loggedInUserId: string | null;
  onEdit: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, loggedInUserId, onEdit }) => {
  return (
    <div className="bg-white-200 relative flex items-center justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
      <div className="relative flex items-start">
        <div className="relative h-24 w-24">
          <Image
            src={user.profile_image || defaultProfileImage}
            alt="userImage"
            layout="fill"
            className="rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = defaultProfileImage;
            }}
          />
        </div>
        <div className="ml-5">
          <div className="text-2xl font-bold">{user.nickname || '트레이너'}</div>
          <div className="mt-2">
            {user.hashtags && user.hashtags.length > 0 ? (
              user.hashtags.map((hashtag: string, index: number) => (
                <div key={index}>
                  <h4 className="text-sm font-light"># {hashtag}</h4>
                </div>
              ))
            ) : (
              <div className="text-sm font-light">해시태그가 없습니다.</div>
            )}
          </div>
        </div>
        <div className="ml-10 mt-0 flex flex-col items-start justify-center">
          <div className="text-lg font-bold">Game Scores</div>
          <div className="text-md mt-0">Ball: {user.gameScore_ball}</div>
          <div className="text-md mt-0">Quiz: {user.gameScore_quiz}</div>
          <div className="text-md mt-0">Fruits: {user.gameScore_fruit}</div>
          <div className="mt-1 flex text-sm font-bold">
            <div className="mt-1 flex">
              <div className="text-sm font-bold">보유코인</div>
              <BiCoinStack className="mr-1 mt-1 text-yellow-400 flex" />{user.coins}
            </div>
          </div>
        </div>
      </div>
      {loggedInUserId === user.id && (
        <button
          onClick={onEdit}
          className="absolute right-4 top-4 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
        >
          수정
        </button>
      )}
    </div>
  );
};

export default UserProfile;
