'use client';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { notify } from '../../../../../../utils/toastify'; // 유틸리티 파일 경로
import 'react-confirm-alert/src/react-confirm-alert.css';

const Confirm = () => {
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="mx-auto my-16 max-w-md rounded-lg bg-white p-8 font-dunggeunmo shadow-lg">
          <h1 className="mb-4 text-xl font-bold">이 포켓몬을 데려옵니다.</h1>
          <div className="flex justify-between">
            <button
              className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
              onClick={() => {
                notify('선택한 포켓몬을 데려왔습니다');
                onClose();
              }}
            >
              Yes
            </button>
            <button className="rounded bg-red-500 px-4 py-2 text-white" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="flex">
      <button className="mx-auto mt-4 rounded-md bg-custom-yellow p-3">마이페이지</button>

      <button className="mx-auto mt-4 rounded-md bg-custom-yellow p-3" onClick={submit}>
        데려오기
      </button>
    </div>
  );
};

export default Confirm;
