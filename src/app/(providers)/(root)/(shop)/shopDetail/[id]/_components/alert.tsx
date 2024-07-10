'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../../../../../../globals.css';

const Alert = () => {
  return (
    <ToastContainer
      className="w-auto"
      toastClassName={() =>
        'relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white shadow-md '
      }
      bodyClassName={() => 'text-sm font-medium block p-3 '} // 토스트 내용에 Tailwind CSS 클래스 적용
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={true}
    />
  );
};

export default Alert;
