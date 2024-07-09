import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="mx-5 flex gap-5">
      로비페이지
      <Link href="/ball">go ball</Link>
      <Link href="/quiz">go quiz</Link>
    </div>
  );
};

export default page;
