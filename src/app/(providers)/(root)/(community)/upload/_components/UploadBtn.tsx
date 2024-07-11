import React from 'react';

interface UploadBtnProps {
  onClick: () => void;
}

const UploadBtn: React.FC<UploadBtnProps> = ({ onClick }) => {
  return (
    <button className="ml-10 mt-5 rounded bg-blue-500 p-2 text-white" onClick={onClick}>
      업로드
    </button>
  );
};

export default UploadBtn;
