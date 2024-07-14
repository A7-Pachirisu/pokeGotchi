import { Bodies, Body, World } from 'matter-js';
import { Fruit, FruitBody } from '../types/Fruit.type';
import { FRUITS_BASE as FRUITS } from './fruites';

interface AddFruitParams {
  world: World;
  currentBodyRef: React.MutableRefObject<Body | null>;
  currentFruitRef: React.MutableRefObject<Fruit | null>;
}

export const addFruit = ({ world, currentBodyRef, currentFruitRef }: AddFruitParams) => {
  const index = Math.floor(Math.random() * 5);
  const fruit = FRUITS[index];

  const body = Bodies.circle(300, 50, fruit.radius, {
    isSleeping: true,
    render: {
      fillStyle: fruit.color
    },
    restitution: 0.3
  }) as FruitBody;

  body.index = index;

  currentBodyRef.current = body;
  currentFruitRef.current = fruit;

  World.add(world, body);
};
