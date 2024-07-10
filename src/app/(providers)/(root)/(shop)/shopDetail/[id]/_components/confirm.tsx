'use client';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { notify } from '../../../../../../../utils/toastify'; // 유틸리티 파일 경로
import 'react-confirm-alert/src/react-confirm-alert.css';

const Confirm = () => {
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="mx-auto my-16 max-w-md rounded-lg bg-gray-100 p-8 font-dunggeunmo shadow-lg">
          <h1 className="mb-4 mt-2 text-2xl">이 포켓몬을 데려옵니다</h1>
          <div className="mt-2 flex justify-around">
            <button
              className="bg-custom-green mr-2 w-20 rounded px-4 py-2 text-2xl text-white hover:brightness-95"
              onClick={() => {
                notify('선택한 포켓몬을 데려왔습니다');
                onClose();
              }}
            >
              Yes
            </button>
            <button
              className="w-20 rounded bg-red-500 px-4 py-2 text-2xl text-white hover:brightness-95"
              onClick={() => {
                onClose();
              }}
            >
              No
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="flex justify-center gap-10">
      <button className="mt-4 w-32 rounded-md bg-custom-yellow p-3" onClick={submit}>
        데려오기
      </button>
    </div>
  );
};

export default Confirm;
