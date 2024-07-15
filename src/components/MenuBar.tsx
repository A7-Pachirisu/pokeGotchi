'use client';

import Link from 'next/link';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsShop } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoGameControllerOutline } from 'react-icons/io5';
import React from 'react';
import { useAuth } from '@/contexts/auth.context/auth.context';

const MenuBar = () => {
  const { me, isLoggedIn } = useAuth();

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
      {isLoggedIn && me ? (
        <Link href={`/mypage/${me.id}`} className="text-[35px] text-white hover:brightness-90 active:brightness-75">
          <FaRegCircleUser />
        </Link>
      ) : (
        <div className="text-[35px] text-white hover:brightness-90 active:brightness-75">
          <FaRegCircleUser />
        </div>
      )}
    </div>
  );
};

export default MenuBar;
