'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import backgroundImage from '@/assets/background.png';
import supabase from '@/supabase/client';
import { useAuth } from '@/contexts/auth.context/auth.context';

interface Pokemon {
  id: number;
  name: string;
  korean_name: string;
  pokemonNumber: number;
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

export default function Home() {
  const { me } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemonPos, setSelectedPokemonPos] = useState({ x: 0, y: 0 });
  const [pokemons, setPokemons] = useState<any[]>([]);

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
    }, 200),
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
    const newPokemonData = [...pokemonData];
    const clickedPokemon = newPokemonData[index];

    const tempId = clickedPokemon.id;
    newPokemonData[index].id = selectedPokemon?.id!;
    setSelectedPokemon({ ...selectedPokemon!, id: tempId });

    setPokemonData(newPokemonData);
  };

  const fetchUserPokemons = async (userId: string) => {
    const { data, error } = await supabase.from('user_pokemons').select('*').eq('userId', userId);

    if (error) {
      console.error('Error fetching user pokemons:', error);
    } else {
      setPokemons(data || []);
    }
  };

  useEffect(() => {
    if (me?.id) {
      fetchUserPokemons(me.id);
    }
  }, [me]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPokemon]);

  useEffect(() => {
    if (pokemons.length > 0) {
      const canvasWidth = canvasRef.current?.width || 800;
      const canvasHeight = canvasRef.current?.height || 600;
      const spacing = canvasWidth / (5 + 1);

      const updatedData = pokemons.map((pokemon, index) => ({
        ...pokemon,
        x: index < 5 ? spacing * (index + 1) - 120 : canvasWidth / 2 - 200,
        y: index < 5 ? 50 : canvasHeight - 20
      }));

      setPokemonData(updatedData);

      const lastIndex = updatedData.length - 1;
      setSelectedPokemon(updatedData[lastIndex]);
      setSelectedPokemonPos({ x: updatedData[lastIndex].x!, y: updatedData[lastIndex].y! });
    }
  }, [pokemons]);

  return (
    <div
      className="w-150 relative h-full overflow-hidden"
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
          className="z-1 absolute cursor-pointer transition-transform duration-1000 hover:drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]"
          style={{ transform: `translate(${pokemon.x}px, ${pokemon.y}px)` }}
          onClick={() => handlePokemonClick(idx)}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.pokemonNumber}.gif`}
            alt={`포켓몬 이미지 ${pokemon.korean_name}`}
            width={100}
            height={100}
            onError={(e) => console.error('이미지를 불러올 수 없습니다:', e)}
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
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${selectedPokemon.pokemonNumber}.gif`}
            alt={`선택된 포켓몬 이미지 ${selectedPokemon.korean_name}`}
            width={200}
            height={200}
            onError={(e) => console.error('선택된 이미지를 불러올 수 없습니다:', e)}
          />
        </div>
      )}
    </div>
  );
}
