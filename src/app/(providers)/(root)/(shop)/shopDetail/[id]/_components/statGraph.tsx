'use client';

import React from 'react';

const Graph = ({ ratio }: { ratio: number }) => {
  return (
    <div className="flex h-6 w-36 justify-start border-2">
      <div
        className="animate-gradient h-5 bg-gradient-to-r from-red-300 to-red-500"
        style={{ width: `${ratio}%`, backgroundSize: '200% 200%' }}
      />
    </div>
  );
};

export default Graph;
