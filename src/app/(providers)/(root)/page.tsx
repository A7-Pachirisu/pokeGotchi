"use client";
import React, { useEffect, useRef, useState } from 'react';
import api from '@/lib/axios';
import Image from 'next/image';
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
  x?: number;
  y?: number;
};

const MOVEMENT_AREA = { width: 600, height: 1100 };

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  const movePokemon = (pokemonId: string, dx: number, dy: number) => {
    const pokemonElement = document.getElementById(pokemonId);
    if (pokemonElement) {
      const transform = pokemonElement.style.transform || 'translate(0px, 0px)';
      const translate = transform.match(/translate\((-?\d+)px,\s*(-?\d+)px\)/);
      let x = 0, y = 0;
      if (translate) {
        x = parseInt(translate[1], 10);
        y = parseInt(translate[2], 10);
      }
      pokemonElement.style.transform = `translate(${x + dx}px, ${y + dy}px)`;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'a':
        pokemonData.forEach((_, idx) => movePokemon(`pokemon-${idx}`, -10, 0));
        break;
      case 'd':
        pokemonData.forEach((_, idx) => movePokemon(`pokemon-${idx}`, 10, 0));
        break;
      case ' ':
        pokemonData.forEach((_, idx) => {
          movePokemon(`pokemon-${idx}`, 0, -50);
          setTimeout(() => movePokemon(`pokemon-${idx}`, 0, 50), 500);
        });
        break;
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get<Pokemon[]>('/api/pokemons');
        const data = response.data;
        if (data.length > 0) {
          const canvasWidth = canvasRef.current?.width || 800;
          const canvasHeight = canvasRef.current?.height || 600;
          const spacing = canvasWidth / (data.length + 1);

          const updatedData = data.map((pokemon, index) => ({
            ...pokemon,
            x: spacing * (index + 1),
            y: canvasHeight,
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
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
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
        <div
          key={idx}
          id={`pokemon-${idx}`}
          className="z-1 transition-transform duration-1000"
          style={{ transform: `translate(${pokemon.x}px, ${pokemon.y}px)` }}
        >
          <Image src={pokemon.sprites.front_default} alt="포켓몬 이미지" width={100} height={100} />
        </div>
      ))}
    </div>
  );
}
