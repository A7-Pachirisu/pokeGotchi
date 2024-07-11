'use client';
import img from '@/assets/random profile1.png';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/client';
import { BiCoinStack } from 'react-icons/bi';
import EditProfileModal from './EditProfileModal';
import Link from 'next/link';

const defaultProfileImage = img.src; // 기본 프로필 이미지 경로
const defaultPokemonImage = '/random profile1.png'; // 기본 포켓몬 이미지 경로

const Page: React.FC = () => {
  const { id } = useParams();
  const [startIndex, setStartIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const cardsPerView = 3; // 한 번에 보여줄 카드 수
  const cardWidth = 180; // 각 카드의 폭
  const cardMargin = 20; // 각 카드 사이의 간격

  useEffect(() => {
    if (id) {
      fetchUserData(id as string);
      fetchUserPokemons(id as string);
    }

    // 로그인된 사용자 아이디 가져오기
    const fetchLoggedInUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching logged in user:', error);
      } else {
        setLoggedInUserId(data?.user?.id || null);
      }
    };

    fetchLoggedInUserId();
  }, [id]);

  const fetchUserData = async (userId: string) => {
    console.log('Fetching user data for ID:', userId); // 콘솔에 userId 출력
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error || !data) {
      console.error('Error fetching user data:', error);
      setUser(null);
    } else {
      setUser(data);
    }
  };

  const fetchUserPokemons = async (userId: string) => {
    const { data, error } = await supabase.from('user_pokemons').select('*').eq('userId', userId);

    if (error) {
      console.error('Error fetching user pokemons:', error);
    } else {
      setPokemons(data || []);
    }
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + cardsPerView, pokemons.length - cardsPerView));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - cardsPerView, 0));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchUserData(user.id); // 모달이 닫힐 때 유저 데이터를 새로고침합니다.
  };

  if (!user) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex items-center justify-center overflow-hidden bg-gray-100">
      <div className="w-[600px] bg-white p-7">
        <div className="mb-8">
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
                <div className="text-lg font-bold">{user.nickname || '트레이너'}</div>
                <div className="mt-2">
                  {user.hashtags && user.hashtags.length > 0 ? (
                    user.hashtags.map((hashtag: string, index: number) => (
                      <div key={index}>
                        <h4 className="text-xs font-light">#{hashtag}</h4>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs font-light">해시태그가 없습니다.</div>
                  )}
                </div>
              </div>
              <div className="ml-10 mt-0 flex flex-col items-start justify-center">
                <div className="text-sm font-bold">Game Scores</div>
                <div className="mt-0 text-xs">Ball: {user.gameScore_ball}</div>
                <div className="mt-0 text-xs">Quiz: {user.gameScore_quiz}</div>
                <div className="mt-0 text-xs">Fruits: {user.gameScore_fruit}</div>
                <div className="mt-2 flex text-sm font-bold">
                  <div className='mt-1 flex'>
                    <div className="text-sm font-bold">보유코인</div>
                    <BiCoinStack className="mr-1 mt-1 text-yellow-400 flex" /> {user.coins} conis
                  </div>
                </div>
              </div>
            </div>
            {loggedInUserId === user.id && (
              <button
                onClick={handleOpenModal}
                className="absolute bottom-4 right-4 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs"
              >
                수정
              </button>
            )}
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-bold">내 포켓몬</h2>
        {pokemons && pokemons.length > 0 ? (
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
                  width: `${pokemons.length * (cardWidth + cardMargin)}px`,
                  marginLeft: '8px'
                }}
              >
                {pokemons.map((mypokemon) => (
                  <div
                    key={mypokemon.id}
                    className="bg-white-100 mx-2 min-w-[180px] transform rounded-lg border border-gray-300 p-4 shadow-sm transition duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4 h-24 w-24">
                        <Image
                          src={mypokemon.gifUrl || defaultPokemonImage}
                          alt={mypokemon.pokemonName}
                          fill
                          className=" object-cover"
                          sizes="100%"
                          onError={(e) => {
                            e.currentTarget.src = defaultPokemonImage;
                          }}
                        />
                      </div>
                      <h3 className="mb-2 text-sm font-bold">{mypokemon.pokemonName}</h3>
                      <Link href={`/shopDetail/${mypokemon.pokemonNumber}`}>
                      <button className="rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs">
                        상세정보
                      </button></Link>
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
      <EditProfileModal user={user} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Page;
