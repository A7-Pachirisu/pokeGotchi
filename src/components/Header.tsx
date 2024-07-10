import Image from 'next/image';
import img from '../assets/default ball.png';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex h-[70px] w-full items-center justify-center bg-bar-color">
      <Link href="/">
        <Image src={img} alt="" width={40} height={40} />
      </Link>
      <Link className="pl-10 text-white" href="/log-in">
        Login
      </Link>
    </header>
  );
};

export default Header;
