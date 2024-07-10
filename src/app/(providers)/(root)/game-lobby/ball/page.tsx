'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PokeBallImage from '@/assets/default ball.png';
import PokemonImage from '@/assets/pokemon2.png';

interface ItemPos {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function PokeBallGamePage() {
  const [state, setState] = useState<'play' | 'pause' | 'stop'>('stop');
  const [score, setScore] = useState(0);

  const ref = useRef<HTMLCanvasElement>(null);
  const minionRef = useRef<HTMLImageElement>(null);
  const bananaRef = useRef<HTMLImageElement>(null);
  const bananaSizeRef = useRef({ w: 50, h: 50 });
  const posRef = useRef<{
    bananas: ItemPos[];
    bananaAccel: number[];
    minion: ItemPos;
  }>({
    bananas: [],
    bananaAccel: [],
    minion: { x: 0, y: 0, w: 0, h: 0 }
  });
  const keyRef = useRef({
    isLeft: false,
    isRight: false
  });

  const W = 500;
  const H = 600;
  const VELOCITY = {
    minion: {
      left: 6,
      right: 6
    },
    bananaAccel: 0.02
  };
  const CREATE_BANANA_TIME = 500;
  const BANANA_SCORE = 50;
  const AVOID_BANANA_SCORE = 10;

  const drawImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, { x, y, w, h }: ItemPos) => {
    const maxWidth = 50;
    const maxHeight = 50;
    const aspectRatio = img.width / img.height;

    if (w > maxWidth || h > maxHeight) {
      if (aspectRatio > 1) {
        w = maxWidth;
        h = maxWidth / aspectRatio;
      } else {
        w = maxHeight * aspectRatio;
        h = maxHeight;
      }
    }

    ctx.drawImage(img, x, y, w, h);
  }, []);

  const loadImage = useCallback(
    (src: string) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      }),
    []
  );

  const blockOverflowPos = useCallback(
    (pos: ItemPos) => {
      pos.x = pos.x + pos.w >= W ? W - pos.w : pos.x < 0 ? 0 : pos.x;
      pos.y = pos.y + pos.h >= H ? H - pos.h : pos.y < 0 ? 0 : pos.y;
    },
    [W, H]
  );

  const updateMinionPos = useCallback(
    (minionPos: ItemPos) => {
      const key = keyRef.current;
      if (key.isLeft) minionPos.x -= VELOCITY.minion.left;
      if (key.isRight) minionPos.x += VELOCITY.minion.right;
      blockOverflowPos(minionPos);
    },
    [blockOverflowPos]
  );

  const createBanana = useCallback(() => {
    if (!bananaRef.current) return;
    const size = bananaSizeRef.current;
    posRef.current.bananas.push({
      x: Math.random() * (W - size.w),
      y: -size.h,
      ...size
    });
    posRef.current.bananaAccel.push(1);
  }, [W]);

  const updateBananaPos = useCallback((bananaPos: ItemPos, index: number) => {
    const y = bananaPos.y;
    const accel = posRef.current.bananaAccel[index];
    posRef.current.bananaAccel[index] = accel + accel * VELOCITY.bananaAccel;
    bananaPos.y = y + accel;
  }, []);

  const deleteBanana = useCallback((index: number) => {
    posRef.current.bananas.splice(index, 1);
    posRef.current.bananaAccel.splice(index, 1);
    setScore((prevScore) => prevScore + AVOID_BANANA_SCORE);
  }, []);

  const catchBanana = useCallback(
    (bananaPos: ItemPos, index: number) => {
      const minionPos = posRef.current.minion;
      if (
        minionPos.x + minionPos.w >= bananaPos.x &&
        minionPos.x <= bananaPos.x + bananaPos.w &&
        minionPos.y + minionPos.h >= bananaPos.y &&
        minionPos.y <= bananaPos.y + bananaPos.h
      ) {
        alert(`점수: ${score}`);
        setState('stop');
      }
    },
    [score]
  );

  const initialGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, W, H);
      const { w, h } = posRef.current.minion;
      posRef.current.bananaAccel = [];
      posRef.current.bananas = [];
      posRef.current.minion = {
        x: W / 2 - w / 2,
        y: H - h,
        w,
        h
      };
      keyRef.current.isLeft = false;
      keyRef.current.isRight = false;
      setScore(0);
    },
    [W, H]
  );

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs?.getContext('2d');
    state === 'stop' && ctx && initialGame(ctx);
    if (!cvs || !ctx || state !== 'play') return;
    !minionRef.current &&
      loadImage(PokemonImage.src).then((img) => {
        (minionRef as any).current = img;
        const w = 50;
        const h = 50;
        posRef.current.minion = {
          x: W / 2 - w / 2,
          y: H - h,
          w,
          h
        };
      });
    !bananaRef.current &&
      loadImage(PokeBallImage.src).then((img) => {
        (bananaRef as any).current = img;
        bananaSizeRef.current.w = 50;
        bananaSizeRef.current.h = 50;
      });
    let timer: number | undefined;
    let rafTimer: number | undefined;
    const pos = posRef.current;
    const animate = () => {
      const minion = minionRef.current;
      const banana = bananaRef.current;
      ctx.clearRect(0, 0, W, H);
      if (minion) {
        updateMinionPos(pos.minion);
        drawImage(ctx, minion, pos.minion);
      }
      if (banana) {
        pos.bananas.forEach((bananaPos, index) => {
          updateBananaPos(bananaPos, index);
          drawImage(ctx, banana, bananaPos);
        });
        pos.bananas.forEach((bananaPos, index) => {
          if (bananaPos.y >= H) {
            deleteBanana(index);
          } else {
            catchBanana(bananaPos, index);
          }
        });
      }
      rafTimer = requestAnimationFrame(animate);
    };
    rafTimer = requestAnimationFrame(animate);
    timer = window.setInterval(createBanana, CREATE_BANANA_TIME);
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keyRef.current.isLeft = key === 'a' || key === 'arrowleft';
      keyRef.current.isRight = key === 'd' || key === 'arrowright';
    };
    const onKeyUp = () => {
      keyRef.current.isLeft = false;
      keyRef.current.isRight = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      timer && window.clearInterval(timer);
      timer = undefined;
      rafTimer && cancelAnimationFrame(rafTimer);
      rafTimer = undefined;
    };
  }, [
    drawImage,
    loadImage,
    updateMinionPos,
    createBanana,
    updateBananaPos,
    deleteBanana,
    catchBanana,
    state,
    initialGame
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-[800px] w-[600px] bg-white p-4">
        <div className="mx-auto my-3 text-center">
          <div className="flex justify-center space-x-5">
            <button type="button" onClick={() => setState('pause')}>
              PAUSE
            </button>
            <button type="button" onClick={() => setState('play')}>
              PLAY
            </button>
            <button type="button" onClick={() => setState('stop')}>
              STOP
            </button>
            <Link className="text-red-500" href="/game-lobby">
              GoLobby
            </Link>
          </div>
          <p className="mt-2">현재 점수: {score}</p>
        </div>
        <canvas className="mx-auto block border border-black" ref={ref} width={W} height={H} />
      </div>
    </div>
  );
}
