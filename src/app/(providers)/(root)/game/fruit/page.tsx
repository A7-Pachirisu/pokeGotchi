'use client';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { formatTime } from '@/utils/formatTime';
import { useEffect, useRef, useState } from 'react';
import MatterRenderer from './_components/MatterRenderer';
import { updateScore } from './_utils/updateScore';

function FruitGamePage() {
  const { me } = useAuth();
  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef(0); // 최신 score 값을 저장
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0); // 경과 시간
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    setScore(0); // 게임 시작 시 score 초기화

    const timerInterval = setInterval(() => {
      const spendTime = Date.now() - startTime;
      setTimer(spendTime);

      // 1분
      if (spendTime >= 1000 * 60) {
        handleGameOver();
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [me]);

  const handleScore = (updateFn: (prev: number) => number) => {
    setScore((prev) => {
      const newScore = updateFn(prev);
      scoreRef.current = newScore; // 최신 score 값을 scoreRef에 저장
      return newScore;
    });
  };

  const handleGameOver = async () => {
    setIsGameOver(true);

    const userId = me?.id;
    if (!userId) return;

    try {
      await updateScore(scoreRef.current, userId); // 최신 score 값을 사용
    } catch (err) {
      console.error('Error during game over:', err);
    }
  };

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {isGameOver ? (
        <div className="flex flex-col items-center gap-y-5 text-2xl text-custom-blue">
          <p>게임 종료!</p>
          {scoreRef.current}
          <Button intent="green" href="/game">
            로비로 돌아가기
          </Button>
        </div>
      ) : (
        <>
          <div className="text-2xl">Score: {score}</div>
          <div className="text-2xl">Time: {formatTime(timer)} (1분)</div>
          <canvas ref={canvasRef}></canvas>
          <MatterRenderer
            containerRef={containerRef}
            canvasRef={canvasRef}
            onUpdateScore={handleScore}
            onGameOver={handleGameOver}
          />
        </>
      )}
    </div>
  );
}

export default FruitGamePage;
