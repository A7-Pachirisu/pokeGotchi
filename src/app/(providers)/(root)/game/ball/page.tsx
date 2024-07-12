'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PokeBallImage from '@/assets/default ball.png';
import PokemonImage from '@/assets/pokemon2.png';
import supabase from '@/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const gameSwal = withReactContent(Swal);

type ItemPos = {
  x: number;
  y: number;
  w: number;
  h: number;
};

const fetchUser = async () => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const updateScore = async (score: number, userId: string, userEmail: string) => {
  const { data, error } = await supabase.from('users').select('gameScore_ball, coins').eq('id', userId).single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  const currentScore = data?.gameScore_ball ?? 0;
  const currentCoins = data?.coins ?? 0;

  const additionalCoins = Math.floor(score / 10);
  const newCoins = currentCoins + additionalCoins;

  const { error: updateError } = await supabase
    .from('users')
    .upsert(
      { id: userId, gameScore_ball: score > currentScore ? score : currentScore, coins: newCoins, email: userEmail },
      { onConflict: 'id' }
    );

  if (updateError) throw updateError;
};

export default function PokeBallGamePage() {
  const queryClient = useQueryClient();
  const {
    data: user,
    error,
    isLoading
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  });

  const mutation = useMutation({
    mutationFn: (score: number) => updateScore(score, user.id, user.email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  const [state, setState] = useState<'play' | 'pause' | 'stop'>('stop');
  const [score, setScore] = useState(0);
  const [createPokeBallTime, setCreatePokeBallTime] = useState(700);
  const [pokeBallAccel, setPokeBallAccel] = useState(0.02);
  const [scoreUpdated, setScoreUpdated] = useState(false);

  const ref = useRef<HTMLCanvasElement>(null);
  const pokemonRef = useRef<HTMLImageElement>(null);
  const pokeBallRef = useRef<HTMLImageElement>(null);
  const pokeBallSizeRef = useRef({ w: 50, h: 50 });
  const posRef = useRef<{
    pokeBalls: ItemPos[];
    pokeBallAccel: number[];
    pokemon: ItemPos;
  }>({
    pokeBalls: [],
    pokeBallAccel: [],
    pokemon: { x: 0, y: 0, w: 0, h: 0 }
  });
  const keyRef = useRef({
    isLeft: false,
    isRight: false
  });

  const W = 500;
  const H = 600;
  const VELOCITY = {
    pokemon: {
      left: 6,
      right: 6
    }
  };
  const AVOID_POKEBALL_SCORE = 10;

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

  const updatePokemonPos = useCallback(
    (pokemonPos: ItemPos) => {
      const key = keyRef.current;
      if (key.isLeft) pokemonPos.x -= VELOCITY.pokemon.left;
      if (key.isRight) pokemonPos.x += VELOCITY.pokemon.right;
      blockOverflowPos(pokemonPos);
    },
    [blockOverflowPos]
  );

  const createPokeBall = useCallback(() => {
    if (!pokeBallRef.current) return;
    const size = pokeBallSizeRef.current;
    posRef.current.pokeBalls.push({
      x: Math.random() * (W - size.w),
      y: -size.h,
      ...size
    });
    posRef.current.pokeBallAccel.push(1);
  }, [W]);

  const updatePokeBallPos = useCallback(
    (pokeBallPos: ItemPos, index: number) => {
      const y = pokeBallPos.y;
      const accel = posRef.current.pokeBallAccel[index];
      posRef.current.pokeBallAccel[index] = accel + accel * pokeBallAccel;
      pokeBallPos.y = y + accel;
    },
    [pokeBallAccel]
  );

  const deletePokeBall = useCallback(
    (index: number) => {
      posRef.current.pokeBalls.splice(index, 1);
      posRef.current.pokeBallAccel.splice(index, 1);
      setScore((prevScore) => prevScore + AVOID_POKEBALL_SCORE);
      createPokeBall();
    },
    [createPokeBall]
  );

  const catchPokeBall = useCallback(
    (pokeBallPos: ItemPos, index: number) => {
      const pokemonPos = posRef.current.pokemon;
      if (
        pokemonPos.x + pokemonPos.w >= pokeBallPos.x &&
        pokemonPos.x <= pokeBallPos.x + pokeBallPos.w &&
        pokemonPos.y + pokemonPos.h >= pokeBallPos.y &&
        pokemonPos.y <= pokeBallPos.y + pokeBallPos.h
      ) {
        if (!scoreUpdated) {
          mutation.mutate(score);
          setScoreUpdated(true);
          setState('pause');
          gameSwal
            .fire({
              title: `점수: ${score}`,
              icon: 'success',
              confirmButtonText: '게임 종료'
            })
            .then(() => {
              setState('stop');
            });
        }
      }
    },
    [score, mutation, scoreUpdated]
  );

  const initialGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, W, H);
      const { w, h } = posRef.current.pokemon;
      posRef.current.pokeBallAccel = [];
      posRef.current.pokeBalls = [];
      posRef.current.pokemon = {
        x: W / 2 - w / 2,
        y: H - h,
        w,
        h
      };
      keyRef.current.isLeft = false;
      keyRef.current.isRight = false;
      setScore(0);
      setScoreUpdated(false);
      setCreatePokeBallTime(700);
      setPokeBallAccel(0.02);
    },
    [W, H]
  );

  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs?.getContext('2d');
    state === 'stop' && ctx && initialGame(ctx);
    if (!cvs || !ctx || state !== 'play') return;
    !pokemonRef.current &&
      loadImage(PokemonImage.src).then((img) => {
        (pokemonRef as any).current = img;
        const w = 50;
        const h = 50;
        posRef.current.pokemon = {
          x: W / 2 - w / 2,
          y: H - h,
          w,
          h
        };
      });
    !pokeBallRef.current &&
      loadImage(PokeBallImage.src).then((img) => {
        (pokeBallRef as any).current = img;
        pokeBallSizeRef.current.w = 50;
        pokeBallSizeRef.current.h = 50;
      });
    let timer: number | undefined;
    let rafTimer: number | undefined;
    const pos = posRef.current;
    const animate = () => {
      const pokemon = pokemonRef.current;
      const pokeBall = pokeBallRef.current;
      ctx.clearRect(0, 0, W, H);
      if (pokemon) {
        updatePokemonPos(pos.pokemon);
        drawImage(ctx, pokemon, pos.pokemon);
      }
      if (pokeBall) {
        pos.pokeBalls.forEach((pokeBallPos, index) => {
          updatePokeBallPos(pokeBallPos, index);
          drawImage(ctx, pokeBall, pokeBallPos);
        });
        pos.pokeBalls.forEach((pokeBallPos, index) => {
          if (pokeBallPos.y >= H) {
            deletePokeBall(index);
          } else {
            catchPokeBall(pokeBallPos, index);
          }
        });
      }
      rafTimer = requestAnimationFrame(animate);
    };
    rafTimer = requestAnimationFrame(animate);
    timer = window.setInterval(createPokeBall, createPokeBallTime);
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
    updatePokeBallPos,
    createPokeBall,
    deletePokeBall,
    catchPokeBall,
    state,
    initialGame,
    createPokeBallTime,
    pokeBallAccel
  ]);

  useEffect(() => {
    if (score % 200 === 0 && score !== 0) {
      setCreatePokeBallTime((prevTime) => Math.max(prevTime - 50, 100));
    }
    if (score % 100 === 0 && score !== 0) {
      setPokeBallAccel((prevAccel) => prevAccel + 0.002);
    }
  }, [score]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex max-h-screen items-center justify-center">
      <div className="bg-white">
        <div className="mx-auto my-4 text-center">
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
            <Link className="text-red-500" href="/game">
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
