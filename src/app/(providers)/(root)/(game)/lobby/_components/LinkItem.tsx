import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LinkItemProps = {
  href: string;
  altText: string;
  children: ReactNode;
  className?: string;
};

const LinkItem: React.FC<LinkItemProps> = ({ href, altText, children, className }) => {
  return (
    <Link
      className={`mb-10 flex items-center rounded border border-black pr-20 text-4xl font-bold ${className}`}
      href={href}
    >
      <Image className="ml-20 mr-20 py-4" src="/Pokeball.png" alt={altText} width="80" height="80"></Image>
      {children}
    </Link>
  );
};

export default LinkItem;
