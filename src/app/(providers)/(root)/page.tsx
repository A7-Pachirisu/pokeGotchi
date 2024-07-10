"use client";
import React, { useEffect, useRef, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';

interface Pokemon {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  x: number; // 포켓몬의 x 좌표
  y: number; // 포켓몬의 y 좌표
}

const pokemonImages: Record<number, HTMLImageElement> = {}; // 이미지 캐시를 위한 객체

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get<Pokemon[]>('/api/pokemons');
        const data = response.data;
        if (data.length > 0) {
          // 포켓몬의 x, y 좌표 설정
          const canvasWidth = canvasRef.current?.width || 800;
          const canvasHeight = canvasRef.current?.height || 600;
          const spacing = canvasWidth / (data.length + 1);

          const updatedData = data.map((pokemon, index) => ({
            ...pokemon,
            x: spacing * (index + 1) - 50,
            y: canvasHeight - 100,
          }));

          setPokemonData(updatedData);
        }
      } catch (error) {
        console.log('데이터 불러오는 도중 오류:', error);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      contextRef.current = context;
    }

    const drawPokemon = () => {
      const ctx = contextRef.current;
      if (ctx) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        pokemonData.forEach(pokemon => {
          const img = pokemonImages[pokemon.id];
          if (img) {
            ctx.drawImage(img, pokemon.x, pokemon.y, 100, 100); // 포켓몬 이미지 크기와 위치 조정
          }
        });
      }
    };

    // 포켓몬 데이터가 업데이트 될 때마다 이미지를 로드하고 위치를 초기화함
    pokemonData.forEach(pokemon => {
      const img = new Image();
      img.src = pokemon.sprites.front_default;
      img.onload = () => {
        pokemonImages[pokemon.id] = img;
        drawPokemon(); // 이미지가 로드된 후에 그림을 그리도록 함
      };
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCode = e.keyCode;
      const stepSize = 10; // 이동 거리 설정

      if (keyCode === 37) {
        // 왼쪽 방향키
        setPokemonData(prevData =>
          prevData.map(pokemon => ({ ...pokemon, x: pokemon.x - stepSize }))
        );
      } else if (keyCode === 39) {
        // 오른쪽 방향키
        setPokemonData(prevData =>
          prevData.map(pokemon => ({ ...pokemon, x: pokemon.x + stepSize }))
        );
      } else if (keyCode === 38) {
        // 위쪽 방향키 (점프)
        setPokemonData(prevData =>
          prevData.map(pokemon => ({ ...pokemon, y: pokemon.y - stepSize }))
        );
      }

      drawPokemon(); // 방향키 이벤트 후 포켓몬 위치 업데이트
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pokemonData]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="border-2 border-gray-400" width={800} height={600}></canvas>
      <Link href="/lobby" className="mt-4 text-blue-600 underline">로비로 이동</Link>
    </div>
  );
}
