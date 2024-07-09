import Image from 'next/image';
import img from '../assets/default ball.png';

const Header = () => {
  return (
    <header className={`flex h-[70px] w-full items-center justify-center bg-[#39394A]`}>
      <Image src={img} alt="" width={40} height={40} />
    </header>
  );
};

export default Header;
