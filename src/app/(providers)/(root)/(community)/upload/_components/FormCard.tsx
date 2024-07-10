import React from 'react';
import profile1 from '../../../../../../assets/random profile1.png';
import Image from 'next/image';

const FormCard = () => {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <div className="mb-5 flex w-[450px] items-center">
        <Image src={profile1} alt="profileImg" className="h-[50px] w-[50px] rounded-full border" />
        <p className="ml-5">ooo 님</p>
      </div>
      <main className="flex h-[450px] w-[450px] justify-center rounded-xl border">
        <input type="text" placeholder="내용을 입력하세요..." className="mt-5 h-[300px] w-[420px] border pl-[10px]" />
      </main>
    </div>
  );
};

export default FormCard;
