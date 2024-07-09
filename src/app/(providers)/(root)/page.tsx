"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        const data = response.data;
        setPokemonData(data);
      } catch (error) {
        console.log("데이터 불러오는 도중 오류:", error);
      }
    };
    fetchPokemon();
  }, []);

  return ( 
  <div className="h-full w-full">
    {pokemonData.map((pokemon,idx) => (
      <div key={idx}>
        <Image src={pokemon.sprites.front_default} alt="포켓몬 이미지" width={100} height={100} />
      </div>
    ))}
  </div>
  )
}
