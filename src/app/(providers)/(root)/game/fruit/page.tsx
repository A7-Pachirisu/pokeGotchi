'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import Link from 'next/link';

export default function MatterGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;

    const engine = Engine.create();

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        wireframes: false,
        width: 600,
        height: 790,
        background: '#F7F4C8'
      }
    });

    const leftWall = Bodies.rectangle(15, 350, 30, 800, {
      isStatic: true,
      render: { fillStyle: '#E6B143' }
    });

    const rightWall = Bodies.rectangle(585, 350, 30, 800, {
      isStatic: true,
      render: { fillStyle: '#E6B143' }
    });

    const ground = Bodies.rectangle(300, 780, 700, 60, {
      isStatic: true,
      render: { fillStyle: '#E6B143' }
    });

    const topLine = Bodies.rectangle(300, 50, 700, 2, {
      isStatic: true,
      render: { fillStyle: '#E6B143' }
    });

    World.add(engine.world, [leftWall, rightWall, ground, topLine]);
    Matter.Runner.run(engine);
    Render.run(render);
  }, []);

  return (
    <div>
      <div className="items-center" ref={containerRef}>
        <canvas ref={canvasRef}></canvas>
      </div>
      {/* <Link href="/game">GoLobby</Link> */}
    </div>
  );
}
