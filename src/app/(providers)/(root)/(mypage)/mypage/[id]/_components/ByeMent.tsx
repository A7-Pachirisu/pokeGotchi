// ByeMent.tsx
import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';

interface ByeMentProps {
  isOpen: boolean;
  pokemonName: string;
  onClose: () => void;
}

const ByeMent: React.FC<ByeMentProps> = ({ isOpen, pokemonName, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500); // 2초 후 자동으로 닫기

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
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
          leave="transition ease-in duration-200 transform"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <div className="relative z-20 flex w-400 h-400 flex-col items-center p-6 text-white rounded-md">
            <p className="mb-4 text-2xl font-bold">{`잘가... ${pokemonName}`}</p>
            <p className="text-lg">포켓몬을 판매했습니다.</p>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default ByeMent;
