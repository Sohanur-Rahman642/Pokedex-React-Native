import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {BASE_URL} from '../data/api/ApiEndPoints';
import {Pokemon, PokemonList, PokemonListParams} from '../data/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => ({
        url: `pokemon/${name}`,
      }),
    }),

    getPokemons: builder.query<PokemonList, PokemonListParams>({
      query: (params: PokemonListParams) => ({
        url: 'pokemon',
        params: params,
      }),
    }),

    getPokemonById: builder.query<Pokemon, string>({
      query: (id: string) => ({
        url: `pokemon/${id}`,
      }),
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useLazyGetPokemonByIdQuery,
} = pokemonApi;
