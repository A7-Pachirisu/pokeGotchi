import React from 'react';
import Image from 'next/image';
import profile1 from '../../../../../../assets/random profile1.png';
import profile2 from '../../../../../../assets/random profile2.png';
import profile3 from '../../../../../../assets/random profile3.png';
import ball1 from '../../../../../../assets/1st ball.png';
import ball2 from '../../../../../../assets/2nd ball.png';
import ball3 from '../../../../../../assets/3rd ball.png';

const imgPaths = [
  {
    profileImg: profile1,
    ballImg: ball1
  },
  {
    profileImg: profile2,
    ballImg: ball2
  },
  {
    profileImg: profile3,
    ballImg: ball3
  }
];

const RankItem = () => {
  return (
    <div className="mt-5 flex w-full">
      <div className="flex w-full justify-around">
        {imgPaths.map((item, index) => (
          <div key={index} className="h-[100px] w-[100px] rounded-full border border-gray-200">
            <p className="mt-3 text-lg">{index + 1}</p>
            <Image src={item.profileImg} alt="profileImg" className="mt-[-40px] h-full w-full rounded-full" />
            <Image src={item.ballImg} alt="ballImg" className="ml-[65px] mt-[-30px] h-[40px] w-[40px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankItem;
