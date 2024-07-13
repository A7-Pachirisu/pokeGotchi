import { Body } from 'matter-js';
import { moveOnProps } from '../types/Fruit';
import { addFruit } from './addFruit';

export const moveOn = ({ event, engine, bodyRef, isAbleRef }: moveOnProps): void => {
  const currentFruit = bodyRef.current; // 만든 과일

  if (!currentFruit || isAbleRef.current) return;

  switch (event.code) {
    case 'KeyA':
    case 'ArrowLeft':
      Body.setPosition(currentFruit, {
        x: currentFruit.position.x - 10,
        y: currentFruit.position.y
      });
      break;

    case 'KeyD':
    case 'ArrowRight':
      Body.setPosition(currentFruit, {
        x: currentFruit.position.x + 10,
        y: currentFruit.position.y
      });
      break;

    case 'KeyS':
    case 'Space':
      console.log('내려갑니다');
      currentFruit.isSleeping = false;
      isAbleRef.current = true;
      setTimeout(() => {
        addFruit({ engine, bodyRef });
        isAbleRef.current = false;
      }, 500);
      break;

    default:
      break;
  }
};
