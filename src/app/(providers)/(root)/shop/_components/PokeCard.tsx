import Button from '@/components/Button';
import { Pokemon } from '@/types/pokemonType';
import Image from 'next/image';
import Link from 'next/link';
import { BiCoinStack } from 'react-icons/bi';

interface PokeCarProps {
  pokemon: Pokemon;
}

function PokeCard({ pokemon }: PokeCarProps) {
  return (
    <div key={pokemon.id} className="my-1 flex flex-col rounded-md border border-gray-300 p-3 shadow-lg">
      <Link href={`/shopDetail/${pokemon.id}`}>
        <div className="align-center flex justify-end text-xl">
          <BiCoinStack className="my-auto text-yellow-400" />
          50
        </div>
        <div className="align-center mx-auto flex h-[100px] w-[100px] justify-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
            alt={'pokemon_img'}
            unoptimized
            width={100}
            height={100}
          />
        </div>

        <p className="m-2 text-xl">{pokemon.korean_name}</p>

        <Button intent="green" size="sm" className="mx-auto">
          Get
        </Button>
      </Link>
    </div>
  );
}

export default PokeCard;
