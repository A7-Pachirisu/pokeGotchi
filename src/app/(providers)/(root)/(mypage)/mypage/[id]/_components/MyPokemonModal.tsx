// MyPokemonModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import supabase from '@/supabase/client';
import ByeMyPokemon from './ByeMyPokemon';
import ByeMent from './ByeMent'; // ByeMent 추가

interface MyPokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonId: string;
  userId: string;
  loggedInUserId: string | null;
  pokemonImage: string;
  onPokemonUpdated: () => void;  // 변경된 사항이 페이지에 반영되도록 콜백 추가
}

interface User {
  coins: number;
}

interface Pokemon {
  pokemonName: string;
}

const MyPokemonModal: React.FC<MyPokemonModalProps> = ({
  isOpen,
  onClose,
  pokemonId,
  userId,
  loggedInUserId,
  pokemonImage,
  onPokemonUpdated,
}) => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [newPokemonName, setNewPokemonName] = useState<string>('');
  const [isByeModalOpen, setIsByeModalOpen] = useState(false);
  const [isByeMentOpen, setIsByeMentOpen] = useState(false); // ByeMent 상태 추가
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonName = async () => {
      const { data, error } = await supabase
        .from('user_pokemons')
        .select('pokemonName')
        .eq('id', pokemonId)
        .single<Pokemon>();
      if (data) {
        setPokemonName(data.pokemonName);
        setNewPokemonName(data.pokemonName);
      }
      if (error) {
        console.error('Error fetching pokemon name:', error.message);
      }
    };

    if (pokemonId) {
      fetchPokemonName();
    }
  }, [pokemonId]);

  const handleSell = async () => {
    setIsByeModalOpen(true);
  };

  const handleConfirmSell = async () => {
    try {
      // user_pokemons 테이블에서 포켓몬 삭제
      const { error: deleteError } = await supabase
        .from('user_pokemons')
        .delete()
        .eq('id', pokemonId);

      if (deleteError) {
        console.error('Error deleting pokemon:', deleteError.message);
        return;
      }

      // users 테이블의 coins 컬럼 업데이트
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('coins')
        .eq('id', userId)
        .single<User>();

      if (userError || !user) {
        console.error('Error fetching user coins:', userError?.message);
        return;
      }

      const newCoins = user.coins + 40;

      const { error: updateError } = await supabase
        .from('users')
        .update({ coins: newCoins })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating coins:', updateError.message);
        return;
      }

      onPokemonUpdated();  // 변경된 사항이 페이지에 반영되도록 콜백 호출
      setIsByeModalOpen(false);
      setIsByeMentOpen(true);
      setTimeout(() => {
        handleCloseAllModals(); 
      }, 1500); 
    } catch (error: any) {
      console.error('Error selling pokemon:', error.message);
    }
  };

  const handleCloseAllModals = () => {
    setIsByeMentOpen(false);
    setIsByeModalOpen(false);
    onClose();
  };

  const handleNameChange = async () => {
    try {
      const { error } = await supabase
        .from('user_pokemons')
        .update<any>({ pokemonName: newPokemonName })
        .eq('id', pokemonId);

      if (error) {
        console.error('Error updating pokemon name:', error.message);
        return;
      }

      setPokemonName(newPokemonName);
      onPokemonUpdated();  // 변경된 사항이 페이지에 반영되도록 콜백 호출
      onClose();
    } catch (error: any) {
      console.error('Error updating pokemon name:', error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 11) {
      setNewPokemonName(e.target.value);
      setNameError(null);
    } else {
      setNameError('포켓몬 이름은 최대 11자까지 입력할 수 있습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="w-[400px] bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">내 포켓몬</h2>
          <div className="flex flex-col items-center">
            <img src={pokemonImage} alt={pokemonName} className="mb-4 h-24 w-24 object-contain" />
            <p className="mb-4 text-lg font-bold">{pokemonName}</p>
            {loggedInUserId === userId && (
              <>
                <input
                  type="text"
                  value={newPokemonName}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded-md border border-gray-300 p-2"
                  placeholder="새로운 포켓몬 이름"
                />
                {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                <button
                  type="button"
                  onClick={handleNameChange}
                  className="mr-auto mt-1 px-2 py-1 bg-green-500 text-white rounded-md"
                >
                  이름 변경
                </button>
              </>
            )}
            <div className="flex justify-end w-full mt-4">
              {loggedInUserId === userId && (
                <button
                  type="button"
                  onClick={handleSell}
                  className="mr-auto px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  판매
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 border border-gray-300 rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
      <ByeMyPokemon
        isOpen={isByeModalOpen}
        onClose={() => setIsByeModalOpen(false)}
        onConfirm={handleConfirmSell}
        pokemonImage={pokemonImage}
        pokemonName={pokemonName}
        onShowByeMent={() => setIsByeMentOpen(true)} // onShowByeMent 추가
      />
      <ByeMent
        isOpen={isByeMentOpen}
        pokemonName={pokemonName}
        onClose={handleCloseAllModals}
      />
    </>
  );
};

export default MyPokemonModal;
