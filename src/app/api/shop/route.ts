import { NextResponse } from 'next/server';
import axios from 'axios';

const LIMIT_POKEMON = 10; // 한 페이지당 보여줄 포켓몬 수

export const GET = async (request: Request) => {
  try {
    const urlParams = new URL(request.url);
    const page = parseInt(urlParams.searchParams.get('page') || '1', 10);
    const offset = (page - 1) * LIMIT_POKEMON;

    const allPokemonPromises = Array.from({ length: LIMIT_POKEMON }, (_, index) => {
      const id = offset + index + 1; // offset을 적용
      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ]);
    });

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const firstStagePokemons = allPokemonResponses
      .filter(([pokemonResponse, speciesResponse]) => speciesResponse.data.evolves_from_species === null)
      .map(([pokemonResponse, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find((name: any) => name.language.name === 'ko');
        return {
          ...pokemonResponse.data,
          korean_name: koreanName?.name || null
        };
      });

    const nextPage = page + 1;

    return NextResponse.json({
      result: firstStagePokemons,
      nextPage,
      isLast: firstStagePokemons.length < LIMIT_POKEMON
    });
  } catch (error) {
    console.error('Error fetching first stage pokemons:', error);
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
};
