'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';
import Image from 'next/image';
import Link from 'next/link';
import img from '../assets/default ball.png';
import Button from './Button';

const Header = () => {
  const { me, logOut } = useAuth();

  const handleClick = async () => {
    await logOut();
  };

  return (
    <header className="relative flex h-[70px] w-full items-center justify-center bg-bar-color px-4">
      <Link href="/" prefetch={false}>
        <Image src={img} alt="" width={40} height={40} />
      </Link>
      {me && (
        <Button size="sm" intent="yellow" className="absolute right-4 uppercase" onClick={handleClick}>
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
