import {useEffect, useState} from 'react';
import {
  useGetPokemonsQuery,
  useLazyGetPokemonByIdQuery,
} from '../../service/pokemon';
import {getPokemonIdByUrl} from '../../utils';
import {Result} from '../types/pokemon-list';
import {Pokemon} from '../types';

const usePokemonListController = () => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  const {
    data: PokemonListData,
    isLoading,
    error,
    refetch,
  } = useGetPokemonsQuery({
    offset: offset || 0,
    limit: limit || 20,
  });

  const results = PokemonListData?.results;

  const [fetchPokemonById] = useLazyGetPokemonByIdQuery();

  const [pokemons, setPokemons] = useState<Pokemon[] | any[]>([]);

  const getPokemonsById = async (results: Result[]) => {
    const responses = await Promise.all(
      results?.map(async result => {
        const pokemonId = getPokemonIdByUrl(result?.url);
        const res = await fetchPokemonById(pokemonId);
        return res;
      }),
    );

    return responses;
  };

  const fetchPokemonData = async () => {
    if (PokemonListData) {
      const results = PokemonListData?.results;
      const pokemonDataArray = await getPokemonsById(results);

      const pokemons = pokemonDataArray?.map(item => item?.data);

      setPokemons(prev => [...prev, ...pokemons]);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [PokemonListData]);

  const loadMore = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  return {
    pokemons,
    loadMore,
    results,
  };
};

export default usePokemonListController;
