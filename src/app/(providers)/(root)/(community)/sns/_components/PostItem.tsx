import React from 'react';
import imgPath from '../../../../../../assets/background.png';
import profile1 from '../../../../../../assets/random profile1.png';
import profile2 from '../../../../../../assets/random profile2.png';
import profile3 from '../../../../../../assets/random profile3.png';
import profile4 from '../../../../../../assets/random profile4.png';
import Image from 'next/image';

const postItems = [
  {
    img: imgPath,
    profile: profile1,
    name: '김oo',
    content:
      '내 포켓몬 자랑하기 sns 내용 ... 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 ...'
  },
  {
    img: imgPath,
    profile: profile2,
    name: '이oo',
    content:
      '내 포켓몬 자랑하기 sns 내용 ... 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 ...'
  },
  {
    img: imgPath,
    profile: profile3,
    name: '유oo',
    content:
      '내 포켓몬 자랑하기 sns 내용 ... 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 ...'
  },
  {
    img: imgPath,
    profile: profile4,
    name: '원oo',
    content:
      '내 포켓몬 자랑하기 sns 내용 ... 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 내 포켓몬 자랑하기 sns 내용 ...'
  }
];

const PostItem = () => {
  return (
    <div className="mt-5 flex w-full flex-col items-center">
      {postItems.map((item, index) => (
        <main key={index} className="mb-10 h-[500px] w-[450px] rounded-xl border border-gray-300">
          <div className="ml-5 mt-3 flex items-center">
            <Image src={item.profile} alt="profile" className="h-[50px] w-[50px] rounded-full border border-gray-300" />
            <p className="ml-5">{item.name}</p>
          </div>
          <div className="flex justify-center">
            <Image src={item.img} alt="bgImg" className="mt-5 h-[250px] w-[400px] rounded-lg border" />
          </div>
          <div className="flex justify-center">
            <p className="mt-5 w-[380px]">{item.content}</p>
          </div>
        </main>
      ))}
    </div>
  );
};

export default PostItem;
