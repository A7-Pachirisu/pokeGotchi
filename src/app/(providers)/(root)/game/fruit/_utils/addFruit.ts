import { Bodies, World } from 'matter-js';
import { AddFruitParamsExtended, FruitBody } from '../types/Fruit';
import { FRUITS_BASE } from './fruites';

export const addFruit = ({ engine, bodyRef, x = 300, y = 100, index }: AddFruitParamsExtended) => {
  // 새로운 과일일 때 인덱스
  if (index === undefined) {
    index = Math.floor(Math.random() * 5);
  }

  const fruit = FRUITS_BASE[index];
  const isSleeping = x === 300 && y === 100; // 초기값일때만 true

  const body: FruitBody = Bodies.circle(x, y - fruit.radius, fruit.radius, {
    isSleeping: isSleeping,
    index: fruit.index,
    render: {
      fillStyle: fruit.color
    },
    restitution: 0.3
  });

  bodyRef.current = body;

  World.add(engine.world, body);
};
