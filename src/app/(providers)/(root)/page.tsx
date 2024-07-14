'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import _ from 'lodash';
import backgroundImage from '@/assets/background.png';
import supabase from '@/supabase/client';
import { useAuth } from '@/contexts/auth.context/auth.context';

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  pokemonNumber: number;
  x?: number;
  y?: number;
};

type SupabasePokemon = {
  createdAt: string;
  gifUrl: string | null;
  id: string;
  pokemonName: string | null;
  pokemonNumber: number | null;
  userId: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { me } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemonPos, setSelectedPokemonPos] = useState({ x: 0, y: 0 });
  const [userPokemons, setUserPokemons] = useState<any[]>([]);

  const fetchUserPokemons = async (userId: string) => {
    const { data, error } = await supabase.from('user_pokemons').select('*').eq('userId', userId);

    if (error) throw new Error(error.message);

    setUserPokemons(data || []);
    setIsLoading(false);
  };

  const updatePokemons = () => {
    if (userPokemons.length > 0) {
      const canvasWidth = canvasRef.current?.width || 800;
      const canvasHeight = canvasRef.current?.height || 600;
      const spacing = canvasWidth / (5 + 2);

      const displayedPokemons = userPokemons
        .slice(0, 6)
        .filter((pokemon) => pokemon.pokemonNumber !== selectedPokemon?.pokemonNumber)
        .map((pokemon, index) => ({
          ...pokemon,
          x: index < 5 ? spacing * (index + 1) - 90 : canvasWidth / 2 - 200,
          y: index < 5 ? 50 : canvasHeight - 80
        }));

      setPokemonList(displayedPokemons);

      if (!selectedPokemon && displayedPokemons.length > 0) {
        const lastIndex = displayedPokemons.length - 1;
        setSelectedPokemon(displayedPokemons[lastIndex]);
        setSelectedPokemonPos({ x: displayedPokemons[lastIndex].x!, y: canvasHeight - 80 });
      }
    }
  };

  const handlePokemonClick = (index: number) => {
    if (!selectedPokemon) return;

    const newPokemonList = [...pokemonList];
    const clickedPokemon = newPokemonList[index];

    const tempId = clickedPokemon.pokemonNumber;
    newPokemonList[index].pokemonNumber = selectedPokemon.pokemonNumber;
    setSelectedPokemon({ ...selectedPokemon, pokemonNumber: tempId });

    setPokemonList(newPokemonList);
  };

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

  useEffect(() => {
    if (me?.id) {
      fetchUserPokemons(me.id);
    }
  }, [me]);

  useEffect(() => {
    updatePokemons();
  }, [userPokemons]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPokemon]);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="text-center text-3xl">로딩중. . .</div>
      </div>
    );
  }

  return (
    <div
      className="w-150 relative h-full overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {pokemonList.map((pokemon, idx) => (
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
