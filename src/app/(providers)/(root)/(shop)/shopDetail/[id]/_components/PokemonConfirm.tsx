'use client';

import Button from '@/components/Button';
import { notify } from '@/utils/toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PokemonConfirm = () => {
  const handleConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="font-dunggeunmo mx-auto my-16 max-w-md rounded-lg bg-gray-100 p-8 shadow-lg">
          <h1 className="mb-4 mt-2 text-2xl">이 포켓몬을 데려옵니다</h1>
          <div className="mt-2 flex justify-around">
            <Button
              intent="green"
              size="md"
              onClick={() => {
                notify('선택한 포켓몬을 데려왔습니다');
                onClose();
              }}
            >
              Yes
            </Button>
            <Button intent="red" size="md" onClick={onClose}>
              No
            </Button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="flex justify-center">
      <Button size="md" intent="yellow" onClick={handleConfirm}>
        데려오기
      </Button>
    </div>
  );
};

export default PokemonConfirm;
