import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {usePokemonListController} from '../../../data/controller';

export default function HomeScreen(): React.JSX.Element {
  const {pokemons} = usePokemonListController({
    offset: 10,
    limit: 20,
  });

  console.log('🚀 ~ HomeScreen ~ pokemons:', pokemons);

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {pokemons?.map((item, index) => (
          <Text key={index}>{item?.base_experience}</Text>
        ))}
      </View>
    </View>
  );
}
