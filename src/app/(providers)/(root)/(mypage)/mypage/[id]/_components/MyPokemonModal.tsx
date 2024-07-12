import React from 'react';
import supabase from '@/supabase/client';

interface MyPokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonId: string;
  userId: string;
}

interface User {
  coins: number;
}

const MyPokemonModal: React.FC<MyPokemonModalProps> = ({ isOpen, onClose, pokemonId, userId }) => {
  const handleSell = async () => {
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

      const newCoins = user.coins + 25;

      const { error: updateError } = await supabase
        .from('users')
        .update({ coins: newCoins })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating coins:', updateError.message);
        return;
      }

      console.log('Pokemon sold successfully');
      onClose();
    } catch (error: any) {
      console.error('Error selling pokemon:', error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-[400px] bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">내 포켓몬</h2>
        <p>이 포켓몬을 판매하시겠습니까?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSell}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            판매
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPokemonModal;
