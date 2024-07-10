'use client';
import Image from 'next/image';
import Link from 'next/link';
import img from '../assets/default ball.png';

const Header = () => {
  const handleClick = () => {
    console.log('1');
  };

  return (
    <header className="relative flex h-[70px] w-full items-center justify-center bg-bar-color px-4">
      <Link href="/">
        <Image src={img} alt="" width={40} height={40} />
      </Link>
      <button
        className="absolute right-4 rounded bg-custom-yellow p-1.5 px-2 text-lg uppercase text-black hover:brightness-95 active:brightness-90"
        onClick={handleClick}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
