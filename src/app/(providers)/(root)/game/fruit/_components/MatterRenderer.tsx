import { FRUITS_BASE as FRUITS } from '../_utils/fruites';

interface MatterRendererProps {
  containerRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

import { Bodies, Body, Engine, Events, Render, Runner, World } from 'matter-js';
import { RefObject, useEffect, useRef } from 'react';
import { createWallsAndGround } from '../_utils/createWallsAndGround';
import { Fruit } from '../types/Fruit';

const MatterRenderer = ({ containerRef, canvasRef }: MatterRendererProps) => {
  const engineRef = useRef(Engine.create()); // 물리 엔진
  const world = engineRef.current.world;
  const currentBodyRef = useRef<Body | null>(null); // 현재 생성된 과일
  const currentFruitRef = useRef<Fruit | null>(null); // 현재 과일 정보
  const disableActionRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const collisionFlagRef = useRef(false); // 충돌 처리 플래그

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) {
      return;
    }

    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engineRef.current,
      options: {
        wireframes: false,
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        background: '#F7F4C8'
      }
    });

    const runner = Runner.create(); // 물리엔진 실행 역할
    Runner.run(runner, engineRef.current); // 물리 엔진 실행
    Render.run(render); // 물리 엔진 상태를 화면에 그림

    const canvasHeight = render.canvas.height;
    createWallsAndGround({ engine: engineRef.current, canvasHeight }); // 프레임을 그리고

    const addFruit = () => {
      const index = Math.floor(Math.random() * 5);
      const fruit = FRUITS[index];

      const body = Bodies.circle(300, 50, fruit.radius, {
        isSleeping: true,
        render: {
          fillStyle: fruit.color
        },
        restitution: 0.3
      });

      body.index = index;

      currentBodyRef.current = body;
      currentFruitRef.current = fruit;

      World.add(world, body);
    };

    addFruit(); // 과일 추가 (첫번째 과일)

    // 키 눌렀을 때
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disableActionRef.current) return;

      switch (event.code) {
        case 'KeyA':
        case 'ArrowLeft':
          if (intervalRef.current) return; // 타이머 있으면 종료

          intervalRef.current = setInterval(() => {
            if (
              currentBodyRef.current &&
              currentBodyRef.current.position.x - (currentFruitRef.current?.radius || 0) > 30
            ) {
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

            // 1초 뒤에 새로운 과일 그리기
            setTimeout(() => {
              addFruit();
              disableActionRef.current = false;
            }, 1000);
          }
          break;
      }
    };

    // 키 때면 타이머 초기화
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'KeyA' || event.code === 'ArrowLeft' || event.code === 'KeyD' || event.code === 'ArrowRight') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    Events.on(engineRef.current, 'collisionStart', (event) => {
      if (collisionFlagRef.current) return; // 이미 충돌 처리 중이면 무시

      collisionFlagRef.current = true; // 충돌 처리 시작

      event.pairs.forEach((collision) => {
        const bodyAIndex = (collision.bodyA as any).index;
        const bodyBIndex = (collision.bodyB as any).index;

        if (bodyAIndex !== undefined && bodyAIndex === bodyBIndex) {
          console.log(bodyAIndex, bodyBIndex);
          const index = bodyAIndex;

          //수박이면 리턴
          if (index === FRUITS.length - 1) {
            collisionFlagRef.current = false; // 충돌 처리 완료
            return;
          }

          World.remove(world, [collision.bodyA, collision.bodyB]);

          const newFruit = FRUITS[index + 1];

          const newBody = Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newFruit.radius,
            {
              render: {
                fillStyle: newFruit.color
              },
              restitution: 0.2
            }
          );

          console.log(newFruit);

          newBody.index = index + 1;

          World.add(world, newBody);

          setTimeout(() => {
            collisionFlagRef.current = false; // 충돌 처리 완료
          }, 500); // 충돌 처리 후 약간의 지연을 추가하여 중복 생성 방지
        }
      });

      collisionFlagRef.current = false; // 충돌 처리 완료
    });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engineRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
};

export default MatterRenderer;
