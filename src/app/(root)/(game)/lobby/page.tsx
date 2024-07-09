import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex-col text-center">
      로비페이지
      <div className="grid">
        <Link href="/ball">go ball</Link>
        <Link href="/quiz">go quiz</Link>
      </div>
    </div>
  );
};

export default page;
