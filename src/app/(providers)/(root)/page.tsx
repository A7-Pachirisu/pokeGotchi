'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import api from '@/lib/axios';
import Image from 'next/image';
import backgroundImage from '@/assets/background.png';
import _ from 'lodash';

interface Pokemon {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
  x?: number;
  y?: number;
}

const MOVEMENT_AREA = { width: 600, height: 1100 };

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemonPos, setSelectedPokemonPos] = useState({ x: 0, y: 0 });

  const moveSelectedPokemon = (dx: number, dy: number) => {
    if (!selectedPokemon) return;

    setSelectedPokemonPos((prevPos) => ({
      x: prevPos.x + dx,
      y: prevPos.y + dy
    }));
  };

  const throttledMoveSelectedPokemon = useCallback(
    _.throttle((dx: number, dy: number) => {
      moveSelectedPokemon(dx, dy);
    }, 400),
    [selectedPokemon]
  );

  const debouncedMoveSelectedPokemon = useCallback(
    _.debounce((dx: number, dy: number) => {
      moveSelectedPokemon(dx, dy);
    }, 300),
    [selectedPokemon]
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'a':
        throttledMoveSelectedPokemon(-30, 0);
        break;
      case 'd':
        throttledMoveSelectedPokemon(30, 0);
        break;
      case ' ':
        debouncedMoveSelectedPokemon(0, -50);
        setTimeout(() => debouncedMoveSelectedPokemon(0, 50), 500);
        break;
    }
  };

  const handlePokemonClick = (index: number) => {
    if (!selectedPokemon) return;

    const newPokemonData = [...pokemonData];
    const clickedPokemon = newPokemonData[index];

    const tempId = clickedPokemon.id;
    newPokemonData[index].id = selectedPokemon.id;
    setSelectedPokemon({ ...selectedPokemon, id: tempId });

    setPokemonData(newPokemonData);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get<Pokemon[]>('/api/pokemons');
        const data = response.data.slice(0, 6);

        if (data.length > 0) {
          const canvasWidth = canvasRef.current?.width || 800;
          const canvasHeight = canvasRef.current?.height || 600;
          const spacing = canvasWidth / (5 + 1);

          const updatedData = data.map((pokemon, index) => ({
            ...pokemon,
            x: index < 5 ? spacing * (index + 1) - 150 : canvasWidth / 2 - 200,
            y: index < 5 ? 50 : canvasHeight - 50
          }));

          setPokemonData(updatedData);
          setSelectedPokemon(updatedData[5]);
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
      className="w-150 relative h-full"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {pokemonData.slice(0, 5).map((pokemon, idx) => (
        <div
          key={idx}
          id={`pokemon-${idx}`}
          className="z-1 absolute cursor-pointer transition-transform duration-1000"
          style={{ transform: `translate(${pokemon.x}px, ${pokemon.y}px)` }}
          onClick={() => handlePokemonClick(idx)}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
            alt="포켓몬 이미지"
            width={100}
            height={100}
          />
        </div>
      ))}

      {selectedPokemon && (
        <div
          id="selected-pokemon"
          className="z-1 absolute transition-transform duration-1000"
          style={{ transform: `translate(${selectedPokemonPos.x}px, ${selectedPokemonPos.y}px)` }}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${selectedPokemon.id}.gif`}
            alt="선택된 포켓몬 이미지"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
