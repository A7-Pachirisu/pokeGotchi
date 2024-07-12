import { Bodies, World } from 'matter-js';
import { AddFruitParams, FruitBody } from '../types/Fruit';
import { FRUITS_BASE } from './fruites';

export const addFruit = ({ engine, bodyRef }: AddFruitParams) => {
  const index =
    bodyRef.current?.id && bodyRef.current?.id < 100
      ? Math.floor(Math.random() * 5)
      : Math.floor(Math.random() * FRUITS_BASE.length);
  const fruit = FRUITS_BASE[index];

  const body: FruitBody = Bodies.circle(300, 100 - fruit.radius, fruit.radius, {
    isSleeping: true,
    render: {
      fillStyle: fruit.color
    },
    restitution: 0.3
  });
  body.index = index;

  bodyRef.current = body;

  World.add(engine.world, body);
};
