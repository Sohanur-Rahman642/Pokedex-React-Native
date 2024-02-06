import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useGetPokemonByNameQuery} from '../../service/pokemon';

const PokemonView = () => {
  const {data, error, isLoading} = useGetPokemonByNameQuery('bulbasaur');
  console.log('🚀 ~ PokemonView ~ data:', data);

  return <></>;
};

export default PokemonView;
