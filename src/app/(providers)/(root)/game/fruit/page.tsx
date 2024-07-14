'use client';
import { useRef, useState } from 'react';
import MatterRenderer from './_components/MatterRenderer';

function FruitGamePage() {
  const [score, setScore] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScore = (updateFn: (prev: number) => number) => setScore((prev) => updateFn(prev));

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div className="text-2xl">Score : {score}</div>
      <canvas ref={canvasRef}></canvas>
      <MatterRenderer containerRef={containerRef} canvasRef={canvasRef} onUpdateScore={handleScore} />
    </div>
  );
}

export default FruitGamePage;
