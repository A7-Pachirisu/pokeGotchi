"use client";
import React, { useEffect, useRef, useState } from 'react';
import api from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '@/assets/background.png';

interface Pokemon {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const MOVEMENT_AREA = { width: 600, height: 1100 };

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  const getPosition = () => {
    const x = MOVEMENT_AREA.width - 350;
    const y = MOVEMENT_AREA.height - 150;
    return { x, y };
  };

  const movePokemon = (pokemonId: string) => {
    const pokemonElement = document.getElementById(pokemonId);
    if (pokemonElement) {
      const { x, y } = getPosition();
      pokemonElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

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
    const intervalId = setInterval(() => {
      pokemonData.forEach((pokemon, idx) => {
        movePokemon(`pokemon-${idx}`);
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [pokemonData]);

  return (
    <div
      className="relative h-full w-full"
      style={{
        width: MOVEMENT_AREA.width,
        height: MOVEMENT_AREA.height,
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {pokemonData.map((pokemon, idx) => (
        <div key={idx} id={`pokemon-${idx}`} className="z-1 absolute transition-transform duration-1000">
          <Image src={pokemon.sprites.front_default} alt="포켓몬 이미지" width={100} height={100} />
        </div>
      ))}
    </div>
  );
}
