import { Bodies, Body, Engine, Events, Render, Runner, World } from 'matter-js';
import { RefObject, useEffect, useRef } from 'react';
import { addFruit } from '../_utils/addFruit';
import { createWallsAndGround } from '../_utils/createWallsAndGround';
import { FRUITS_BASE as FRUITS } from '../_utils/fruites';
import { handleKeyDown } from '../_utils/handleKeyDown';
import { handleKeyUp } from '../_utils/handleKeyUp';
import { Fruit, FruitBody } from '../types/Fruit.type';

interface MatterRendererProps {
  containerRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  onUpdateScore: (updateFn: (prev: number) => number) => void;
}

const MatterRenderer = ({ containerRef, canvasRef, onUpdateScore }: MatterRendererProps) => {
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
        height: containerRef.current.clientHeight / 1.5,
        background: '#F7F4C8'
      }
    });

    const runner = Runner.create(); // 물리엔진 실행 역할
    Runner.run(runner, engineRef.current); // 물리 엔진 실행
    Render.run(render); // 물리 엔진 상태를 화면에 그림

    const canvasHeight = render.canvas.height;
    createWallsAndGround({ engine: engineRef.current, canvasHeight }); // 프레임을 그리고

    const addFruitHandler = () => addFruit({ world, currentBodyRef, currentFruitRef });

    addFruitHandler(); // 과일 추가 (첫번째 과일)

    const keyDownHandler = (event: KeyboardEvent) =>
      handleKeyDown({
        event,
        intervalRef,
        currentBodyRef,
        currentFruitRef,
        disableActionRef,
        addFruit: addFruitHandler
      });

    const keyUpHandler = (event: KeyboardEvent) =>
      handleKeyUp({
        event,
        intervalRef
      });

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    Events.on(engineRef.current, 'collisionStart', (event) => {
      if (collisionFlagRef.current) return; // 이미 충돌 처리 중이면 무시

      collisionFlagRef.current = true; // 충돌 처리 시작

      event.pairs.forEach((collision) => {
        const bodyA = collision.bodyA as FruitBody;
        const bodyB = collision.bodyB as FruitBody;
        const bodyAIndex = bodyA.index;
        const bodyBIndex = bodyB.index;

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
          ) as FruitBody;

          newBody.index = index + 1;

          World.add(world, newBody);

          onUpdateScore((prevScore) => prevScore + newBody.index);

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
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return null;
};

export default MatterRenderer;
