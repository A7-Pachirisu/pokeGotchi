import ballTwo from '@/assets/1st ball.png';
import ballThree from '@/assets/2nd ball.png';
import ballFour from '@/assets/3rd ball.png';
import ballOne from '@/assets/default ball.png';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col justify-center bg-blue-200 p-10">
      <div className="flex animate-bounce items-center justify-center">
        <Image src={ballOne} alt="" width={40} height={40} className="bounce-delay-1" />
        <Image src={ballTwo} alt="" width={40} height={40} className="bounce-delay-2" />
        <Image src={ballThree} alt="" width={40} height={40} className="bounce-delay-3" />
        <Image src={ballFour} alt="" width={40} height={40} className="bounce-delay-4" />
      </div>

      <h1 className="text-center text-3xl font-semibold">PokeGotchi</h1>

      {children}
    </div>
  );
}

export default AuthLayout;
