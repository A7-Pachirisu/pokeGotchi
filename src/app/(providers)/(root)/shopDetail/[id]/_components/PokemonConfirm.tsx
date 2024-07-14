'use client';
import Button from '@/components/Button';
import { notify } from '@/utils/toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { insertType } from '@/types/insertType';
import { BiCoinStack } from 'react-icons/bi';
import GetPokemon from './getPokemon';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const PokemonConfirm = ({ pokemonNumber, gifUrl, pokemonName }: insertType) => {
  const { fetchOwnedPokemons, ownedPokemons } = useUserStore();

  useEffect(() => {
    fetchOwnedPokemons();
  }, [fetchOwnedPokemons]);

  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="mx-auto my-16 max-w-md rounded-lg bg-gray-100 p-8 font-dunggeunmo shadow-lg">
          <h1 className="flex justify-center text-2xl">
            50
            <BiCoinStack className="my-auto text-yellow-400" />에
          </h1>
          <h1 className="mb-4 mt-2 text-2xl">이 포켓몬을 데려옵니다</h1>
          <div className="mt-2 flex justify-around">
            <Button
              className="mr-2 w-20 rounded bg-custom-green px-4 py-2 text-2xl text-white hover:brightness-95"
              onClick={async () => {
                const success = await GetPokemon(pokemonNumber, gifUrl, pokemonName);
                if (success) {
                  notify('선택한 포켓몬을 데려왔습니다');
                }
                onClose();
              }}
            >
              Yes
            </Button>
            <Button
              className="w-20 rounded bg-red-500 px-4 py-2 text-2xl text-white hover:brightness-95"
              onClick={() => {
                onClose();
              }}
            >
              No
            </Button>
          </div>
        </div>
      )
    });
  };
  const isOwned = ownedPokemons?.includes(pokemonNumber);

  return (
    <div className="flex justify-center gap-10">
      {!isOwned && (
        <button
          className="mt-4 w-32 rounded-md bg-custom-yellow p-3 text-lg font-bold hover:brightness-95"
          onClick={submit}
        >
          데려오기
        </button>
      )}
    </div>
  );
};

export default PokemonConfirm;
