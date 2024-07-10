'use client';
import img from '@/assets/pokemon1.png';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/client';
import { BiCoinStack } from 'react-icons/bi';
import dummyUsers from './dumy';

const defaultProfileImage = '/random profile1.png'; // 기본 프로필 이미지 경로
const defaultPokemonImage = '/random profile1.png'; // 기본 포켓몬 이미지 경로

const Page: React.FC = () => {
  const { id } = useParams();
  const [startIndex, setStartIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const cardsPerView = 3; // 한 번에 보여줄 카드 수
  const cardWidth = 180; // 각 카드의 폭
  const cardMargin = 20; // 각 카드 사이의 간격

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('Error fetching user data:', error);
      const dummyUser = dummyUsers.find((user) => user.id === parseInt(userId, 10));
      if (dummyUser) {
        setUser(dummyUser);
      } else {
        setUser(null);
      }
    } else {
      setUser(data);
    }
  };

  if (!user) {
    return <div>자료가 없습니다.</div>;
  }

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + cardsPerView, user.pokemons.length - cardsPerView));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerView, 0));
  };

  return (
    <div className="flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="w-[600px] bg-white p-7">
        <div className="mb-8">
          <div className="bg-white-200 relative flex items-center justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
            <div className="relative flex items-center">
              <div className="relative h-24 w-24">
                <Image 
                  src={user.profileImage || defaultProfileImage} 
                  alt="userImage" 
                  layout="fill" 
                  className="rounded-full object-cover" 
                  onError={(e) => { e.currentTarget.src = defaultProfileImage; }}
                />
              </div>
              <div className="relative flex ml-5">
                <div className="absolute left-0 top-0 text-lg font-bold">{user.nickName}</div>
                <div className="mt-6">
                  {user.hashtags && user.hashtags.length > 0 ? (
                    user.hashtags.map((hashtag) => (
                      <div key={hashtag.id}>
                        <h4 className="text-xs font-light">#{hashtag.hashtag}</h4>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs font-light">해시태그가 없습니다.</div>
                  )}
                </div>
                <div className='flex'>
                  <div className="mt-1 ml-5">
                    <div className="text-sm font-bold">Game Scores</div>
                    <div className="text-xs">Ball: {user.gameScore_ball}</div>
                    <div className="text-xs">Quiz: {user.gameScore_quiz}</div>
                    <div className="text-xs">Fruits: {user.gameScore_fruits}</div>
                  </div>
                  <div className="flex mt-auto text-sm font-bold">
                    <BiCoinStack className="mt-1 text-yellow-400" /> {user.coins}
                  </div>
                </div>
              </div>
            </div>
            <button className="absolute bottom-4 right-4 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs">
              수정
            </button>
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-bold">내 포켓몬</h2>
        {dummyUsers[0].pokemons && dummyUsers[0].pokemons.length > 0 ? (
          <div className="relative flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-[-25px] z-10 bg-gray-200 bg-opacity-50 p-2 hover:bg-opacity-75"
            >
              &lt;
            </button>
            <div className="w-[600px]">
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${startIndex * (cardWidth + cardMargin)}px)`,
                  width: `${dummyUsers[0].pokemons.length * (cardWidth + cardMargin)}px`,
                  marginLeft: '8px'
                }}
              >
                {dummyUsers[0].pokemons.map((mypokemon) => (
                  <div
                    key={mypokemon.id}
                    className="bg-white-100 mx-2 min-w-[180px] transform rounded-lg border border-gray-300 p-4 shadow-sm transition duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4 h-24 w-24">
                        <Image
                          src={mypokemon.image || defaultPokemonImage}
                          alt={mypokemon.name}
                          fill
                          className="rounded-full object-cover"
                          sizes="100%"
                          onError={(e) => { e.currentTarget.src = defaultPokemonImage; }}
                        />
                      </div>
                      <h3 className="mb-2 text-sm font-bold">{mypokemon.name}</h3>
                      <button className="rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs">
                        상세정보
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="absolute right-[-20px] z-10 bg-gray-200 bg-opacity-50 p-2 hover:bg-opacity-75"
            >
              &gt;
            </button>
          </div>
        ) : (
          <div>포켓몬이 없습니다.</div>
        )}
        <div>
          <h2 className="mb-4 mt-4 text-2xl font-bold">내 게시글</h2>
          <div>게시글이 없습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
