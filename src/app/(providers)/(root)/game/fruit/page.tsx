'use client';
import { useRef } from 'react';
import MatterRenderer from './_components/MatterRenderer';

function FruitGamePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasRef}></canvas>
      <MatterRenderer containerRef={containerRef} canvasRef={canvasRef} />
    </div>
  );
}

export default FruitGamePage;
