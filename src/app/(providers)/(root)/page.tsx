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
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemonPos, setSelectedPokemonPos] = useState({ x: 0, y: 0 });

  const moveSelectedPokemon = (dx: number, dy: number) => {
    if (!selectedPokemon) return;

    setSelectedPokemonPos(prevPos => ({
      x: prevPos.x + dx,
      y: prevPos.y + dy
    }));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'a':
        moveSelectedPokemon(-20, 0);
        break;
      case 'd':
        moveSelectedPokemon(20, 0);
        break;
      case ' ':
        moveSelectedPokemon(0, -50);
        setTimeout(() => moveSelectedPokemon(0, 50), 500);
        break;
    }
  };

  const handlePokemonClick = (index: number) => {
    if (!selectedPokemon) return;

    const newPokemonData = [...pokemonData];
    const clickedPokemon = newPokemonData[index];

    // 이미지 교체
    const tempSprite = clickedPokemon.sprites.front_default;
    newPokemonData[index].sprites.front_default = selectedPokemon.sprites.front_default;
    setSelectedPokemon({ ...selectedPokemon, sprites: { ...selectedPokemon.sprites, front_default: tempSprite } });

    setPokemonData(newPokemonData);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get<Pokemon[]>('/api/pokemons');
        const data = response.data.slice(0, 6); // 상단에 5마리, 아래 1마리만 필요

        if (data.length > 0) {
          const canvasWidth = canvasRef.current?.width || 800;
          const canvasHeight = canvasRef.current?.height || 600;
          const spacing = canvasWidth / (5 + 1);

          const updatedData = data.map((pokemon, index) => ({
            ...pokemon,
            x: index < 5 ? spacing * (index + 1) - 150 : canvasWidth / 2 - 200,
            y: index < 5 ? 50 : canvasHeight + 280,
          }));

          setPokemonData(updatedData);
          setSelectedPokemon(updatedData[5]); // 6번째 포켓몬을 선택
          setSelectedPokemonPos({ x: updatedData[5].x!, y: updatedData[5].y! });
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
  }, [selectedPokemon]);

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
      {pokemonData.slice(0, 5).map((pokemon, idx) => (
        <div
          key={idx}
          id={`pokemon-${idx}`}
          className="absolute z-1 transition-transform duration-1000 cursor-pointer"
          style={{ transform: `translate(${pokemon.x}px, ${pokemon.y}px)` }}
          onClick={() => handlePokemonClick(idx)}
        >
          <Image src={pokemon.sprites.front_default} alt="포켓몬 이미지" width={100} height={100} />
        </div>
      ))}

      {selectedPokemon && (
        <div
          id="selected-pokemon"
          className="absolute z-1 transition-transform duration-1000"
          style={{ transform: `translate(${selectedPokemonPos.x}px, ${selectedPokemonPos.y}px)` }}
        >
          <Image src={selectedPokemon.sprites.front_default} alt="선택된 포켓몬 이미지" width={200} height={200} />
        </div>
      )}
    </div>
  );
}
