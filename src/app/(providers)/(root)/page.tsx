'use client';
import api from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import backgroundImage from '@/assets/background.png';

type Pokemon = {
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
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * (MOVEMENT_AREA.width - 100));
    const y = Math.floor(Math.random() * (MOVEMENT_AREA.height - 100));
    return { x, y };
  };

  const movePokemon = (pokemonId: string) => {
    const pokemonElement = document.getElementById(pokemonId);
    if (pokemonElement) {
      const { x, y } = getRandomPosition();
      pokemonElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await api.get('/api/pokemons');
        const data = response.data;
        setPokemonData(data);
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
      <Link className="absolute bottom-0 right-0 rounded bg-blue-500 p-4 text-white" href="/lobby">
        Go Lobby
      </Link>
    </div>
  );
}
