import { Body } from 'matter-js';
import { MutableRefObject } from 'react';
import { Fruit } from '../types/Fruit.type';

interface HandleKeyDownProps {
  event: KeyboardEvent;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  currentBodyRef: MutableRefObject<Body | null>;
  currentFruitRef: MutableRefObject<Fruit | null>;
  disableActionRef: MutableRefObject<boolean>;
  addFruit: () => void;
}

export const handleKeyDown = ({
  event,
  intervalRef,
  currentBodyRef,
  currentFruitRef,
  disableActionRef,
  addFruit
}: HandleKeyDownProps) => {
  if (disableActionRef.current) return;

  switch (event.code) {
    case 'KeyA':
    case 'ArrowLeft':
      if (intervalRef.current) return;

      intervalRef.current = setInterval(() => {
        if (currentBodyRef.current && currentBodyRef.current.position.x - (currentFruitRef.current?.radius || 0) > 30) {
          Body.setPosition(currentBodyRef.current, {
            x: currentBodyRef.current.position.x - 1,
            y: currentBodyRef.current.position.y
          });
        }
      }, 5);
      break;

    case 'KeyD':
    case 'ArrowRight':
      if (intervalRef.current) return;

      intervalRef.current = setInterval(() => {
        if (
          currentBodyRef.current &&
          currentBodyRef.current.position.x + (currentFruitRef.current?.radius || 0) < 570
        ) {
          Body.setPosition(currentBodyRef.current, {
            x: currentBodyRef.current.position.x + 1,
            y: currentBodyRef.current.position.y
          });
        }
      }, 5);
      break;

    case 'KeyS':
    case 'Space':
      if (currentBodyRef.current) {
        currentBodyRef.current.isSleeping = false;
        disableActionRef.current = true;

        setTimeout(() => {
          addFruit();
          disableActionRef.current = false;
        }, 1000);
      }
      break;
  }
};
