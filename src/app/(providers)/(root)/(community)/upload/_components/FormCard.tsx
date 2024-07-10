import React from 'react';
import profile1 from '../../../../../../assets/random profile1.png';
import Image from 'next/image';
import { FaRegImage } from 'react-icons/fa6';

const FormCard = () => {
  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <div className="mb-5 flex w-[450px] items-center">
        <Image src={profile1} alt="profileImg" className="h-[50px] w-[50px] rounded-full border" />
        <p className="ml-5">ooo 님</p>
      </div>
      <main className="flex h-[400px] w-[450px] flex-col items-center justify-between rounded-xl border">
        <textarea placeholder="내용을 입력하세요..." className="mt-5 h-[200px] w-[420px] resize-none pl-[10px] pt-5" />
        <div className="mb-5 ml-5 w-[420px] text-2xl">
          <FaRegImage />
        </div>
      </main>
    </div>
  );
};

export default FormCard;
