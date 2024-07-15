// ByeMyPokemon.tsx
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Ments } from './Ment'; // 더미 데이터 import
import { BiCoinStack } from 'react-icons/bi';

interface ByeMyPokemonProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pokemonImage: string;
  pokemonName: string;
  onShowByeMent: () => void; // 추가된 콜백
}

const ByeMyPokemon: React.FC<ByeMyPokemonProps> = ({ isOpen, onClose, onConfirm, pokemonImage, pokemonName, onShowByeMent }) => {
  const [randomMent, setRandomMent] = useState<string>('');
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * Ments.length);
      setRandomMent(Ments[randomIndex].message);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onShowByeMent(); // 추가된 콜백 호출
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 100); // 빠른 닫기 트랜지션 시간
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={`transition-opacity ease-in ${isClosing ? 'duration-100' : 'duration-200'}`}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75"></div>
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-1000 transform"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave={`transition ease-in ${isClosing ? 'duration-100' : 'duration-200'} transform`}
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <div className="relative z-20 flex flex-col items-center">
            <img src={pokemonImage} alt={pokemonName} className="mb-4 h-36 w-36 object-contain" />
            <h2 className="text-md font-bold mb-2 text-white">{pokemonName}와 작별하시겠습니까?</h2>
            <p className="mb-4 text-2xl text-white">{randomMent}</p>
            <p className="mt-5 mb-0 text-lg text-white flex">
              포켓몬을 40<BiCoinStack className="text-yellow-400 my-auto" />에 판매합니다
            </p>
            <p className="mt-0 mb-3 text-md text-white">포켓몬을 판매하시면 되돌릴 수 없습니다</p>

            <div className="flex space-x-4">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                판매
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default ByeMyPokemon;
