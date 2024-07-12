// 벽, 바닥 생성

import { Bodies, World } from 'matter-js';

// x, y, xW, yH
interface createWallsAndGroundProps {
  engine: Matter.Engine;
  canvasHeight: number;
}

export const createWallsAndGround = ({ engine, canvasHeight }: createWallsAndGroundProps) => {
  const wallWidth = 30;
  const groundHeight = 50;
  const topLineHeight = 2;
  const canvasWidth = 600;

  const leftWall = Bodies.rectangle(wallWidth / 2, canvasHeight / 2, wallWidth, canvasHeight, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
  });

  const rightWall = Bodies.rectangle(canvasWidth - wallWidth / 2, canvasHeight / 2, wallWidth, canvasHeight, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
  });

  const ground = Bodies.rectangle(canvasWidth / 2, canvasHeight - groundHeight / 2, canvasWidth, groundHeight, {
    isStatic: true,
    render: { fillStyle: '#E6B143' }
  });

  const topLine = Bodies.rectangle(canvasWidth / 2, 100, canvasWidth, topLineHeight, {
    isStatic: true,
    isSensor: true, // 부딫히지 않고 감지
    render: { fillStyle: '#E6B143' }
  });

  World.add(engine.world, [leftWall, rightWall, ground, topLine]);
};
