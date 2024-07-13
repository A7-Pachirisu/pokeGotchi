'use client';

import { Engine, Events, Render, Runner, World } from 'matter-js';
import { RefObject, useEffect, useRef } from 'react';
import { addFruit } from '../_utils/addFruit';
import { createWallsAndGround } from '../_utils/createWallsAndGround';
import { FRUITS_BASE } from '../_utils/fruites';
import { moveOn } from '../_utils/moveOn';
import { FruitBody, KeyDownParams } from '../types/Fruit';

interface MatterRendererProps {
  containerRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

function setupKeydownListener({ engine, bodyRef, isAbleRef }: KeyDownParams) {
  const handleKeydown = (event: KeyboardEvent): void => moveOn({ event, engine, bodyRef, isAbleRef }); // 키 다운 이벤트리스너
  window.addEventListener('keydown', handleKeydown);

  return () => {
    window.removeEventListener('keydown', handleKeydown);
  };
}

export default function MatterRenderer({ containerRef, canvasRef }: MatterRendererProps) {
  const engineRef = useRef(Engine.create()); // 물리 엔진
  const bodyRef = useRef<FruitBody | null>(null); // 움직일 과일
  const isAbleRef = useRef<boolean>(false); // 새로고침 안되게 하기 위해서 ref

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // 화면 구성할 인스턴스
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

    // 게임 화면
    const canvasHeight = render.canvas.height;

    createWallsAndGround({ engine: engineRef.current, canvasHeight }); // 프레임을 그리고

    addFruit({ engine: engineRef.current, bodyRef }); // 과일 추가 (첫번째 과일)

    const cleanupKeydownListener = setupKeydownListener({ engine: engineRef.current, bodyRef, isAbleRef }); // 이벤트 리스너 추가

    // 충돌 이벤트 적용
    Events.on(engineRef.current, 'collisionStart', (event) => {
      event.pairs.forEach((collision) => {
        const bodyA = collision.bodyA;
        const bodyB = collision.bodyB;

        // 바닥이나 벽과 충돌한 경우 return
        if (bodyA.index === undefined || bodyB.index === undefined) return;
        if (bodyA.label === 'Rectangle Body' || bodyB.label === 'Rectangle Body') return;

        if (bodyA.index === bodyB.index) {
          console.log('충돌한 인덱스 ', bodyA, bodyB);

          const collisionIdx = bodyA.index; // 충돌한 과일 인덱스

          if (collisionIdx === FRUITS_BASE.length - 1) return; // 수박이면 리턴

          World.remove(engineRef.current.world, [bodyA, bodyB]); // 충돌한 요소 제거

          const newFruit = FRUITS_BASE[collisionIdx + 1];

          if (!newFruit) return;
          console.log('새로운 과일', newFruit);

          addFruit({
            engine: engineRef.current,
            bodyRef,
            x: collision.collision.supports[0].x,
            y: collision.collision.supports[0].y,
            index: collisionIdx + 1
          });
        }
      });
    });

    return () => {
      cleanupKeydownListener();
      Render.stop(render);
      World.clear(engineRef.current.world, false);
      Engine.clear(engineRef.current);
      Runner.stop(runner);
    };
  }, [containerRef, canvasRef]);

  return null;
}
