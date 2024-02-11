export type Result = {
  name: string;
  url: string;
};

export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  results: Result[];
};

export default PokemonList;
