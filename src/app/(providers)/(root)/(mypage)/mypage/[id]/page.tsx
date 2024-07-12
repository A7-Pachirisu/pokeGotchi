'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import supabase from '@/supabase/client';
import EditProfileModal from './_components/EditProfileModal';
import UserProfile from './_components/UserProfile';
import { useAuth } from '@/contexts/auth.context/auth.context';
import Link from 'next/link';
import Image from 'next/image';

const Page: React.FC = () => {
  const { id } = useParams();
  const { me } = useAuth(); // 로그인된 사용자 정보를 가져옵니다
  const [startIndex, setStartIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardsPerView = 3; // 한 번에 보여줄 카드 수
  const cardWidth = 180; // 각 카드의 폭
  const cardMargin = 20; // 각 카드 사이의 간격

  useEffect(() => {
    if (id) {
      fetchUserData(id as string);
      fetchUserPokemons(id as string);
    }
  }, [id]);

  const fetchUserData = async (userId: string) => {
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
          <UserProfile user={user} loggedInUserId={me?.id || null} onEdit={handleOpenModal} />
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
                          src={mypokemon.gifUrl || '/random_profile1.png'}
                          alt={mypokemon.pokemonName}
                          fill
                          className="object-cover"
                          sizes="100%"
                          onError={(e) => {
                            e.currentTarget.src = '/random_profile1.png';
                          }}
                        />
                      </div>
                      <h3 className="mb-2 text-sm font-bold">{mypokemon.pokemonName}</h3>
                      <Link href={`/shopDetail/${mypokemon.pokemonNumber}`}>
                        <button className="rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-xs">
                          상세정보
                        </button>
                      </Link>
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
