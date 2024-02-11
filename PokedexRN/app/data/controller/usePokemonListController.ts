import {useEffect, useState} from 'react';
import {
  useGetPokemonsQuery,
  useLazyGetPokemonByIdQuery,
} from '../../service/pokemon';
import {getPokemonIdByUrl} from '../../utils';
import {Result} from '../types/pokemon-list';
import {Pokemon} from '../types';

interface Payload {
  offset: number;
  limit: number;
}

const usePokemonListController = (props: Payload) => {
  const {offset, limit} = props;
  const {
    data: PokemonListData,
    isLoading,
    error,
  } = useGetPokemonsQuery({
    offset: offset || 0,
    limit: limit || 18,
  });

  const [fetchPokemonById] = useLazyGetPokemonByIdQuery();

  const [pokemons, setPokemons] = useState<Pokemon[] | any[]>([]);

  const getPokemonsById = async (results: Result[]) => {
    const pokemons = results?.map(pokemon => {
      const pokemonId = getPokemonIdByUrl(pokemon?.url);

      const pokemonData = fetchPokemonById(pokemonId);

      return pokemonData;
    });

    return await Promise.all(pokemons);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (PokemonListData) {
        const results = PokemonListData?.results;
        const pokemonDataArray = await getPokemonsById(results);

        const pokemons = pokemonDataArray?.map(item => item?.data);

        setPokemons(pokemons);
      }
    };

    fetchPokemonData();
  }, [PokemonListData]);

  return {
    pokemons,
  };
};

export default usePokemonListController;
