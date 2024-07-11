import Link from 'next/link';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsShop } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoGameControllerOutline } from 'react-icons/io5';

const MenuBar = () => {
  return (
    <div className="flex h-[70px] w-full items-center justify-around bg-bar-color">
      <Link href="/sns" className="text-[35px] text-white hover:brightness-90 active:brightness-75">
        <AiOutlineMessage />
      </Link>
      <Link href="/shop" className="text-[35px] text-white hover:brightness-90 active:brightness-75">
        <BsShop />
      </Link>
      <Link href="/game" className="text-[35px] text-white hover:brightness-90 active:brightness-75">
        <IoGameControllerOutline />
      </Link>
      <Link href="/mypage/1" className="text-[35px] text-white hover:brightness-90 active:brightness-75">
        <FaRegCircleUser />
      </Link>
    </div>
  );
};

export default MenuBar;
