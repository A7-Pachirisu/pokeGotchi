import { AiOutlineMessage } from 'react-icons/ai';
import { BsShop } from 'react-icons/bs';
import { IoGameControllerOutline } from 'react-icons/io5';
import { FaRegCircleUser } from 'react-icons/fa6';
import Link from 'next/link';

const MenuBar = () => {
  return (
    <div className="flex h-[70px] w-full items-center justify-around bg-bar-color">
      <Link href="/sns">
        <button className="text-[35px] text-white hover:brightness-90 active:brightness-75">
          <AiOutlineMessage />
        </button>
      </Link>
      <button className="text-[35px] text-white hover:brightness-90 active:brightness-75">
        <Link href="/shop">
          <BsShop />
        </Link>
      </button>
      <Link href="/game">
        <button className="text-[40px] text-white hover:brightness-90 active:brightness-75">
          <IoGameControllerOutline />
        </button>
      </Link>
      <Link href="/mypage/1">
        <button className="text-[35px] text-white hover:brightness-90 active:brightness-75">
          <FaRegCircleUser />
        </button>
      </Link>
    </div>
  );
};

export default MenuBar;
