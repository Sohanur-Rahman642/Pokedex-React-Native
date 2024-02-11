import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {usePokemonListController} from '../../../data/controller';
import {FlatList} from 'react-native-gesture-handler';
import theme from '../../styles/theme';

export default function HomeScreen(): React.JSX.Element {
  const {pokemons, loadMore, results} = usePokemonListController();
  // console.log('🚀 ~ HomeScreen ~ results:', results);

  //console.log('🚀 ~ HomeScreen ~ pokemons:', pokemons);

  const renderFooter = () => {
    // If there are no more results to fetch, or loading is false, return null.
    if (!pokemons || !pokemons.length) return null;

    // If loading more, show a loading indicator at the bottom of the list.
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" color={theme.colors.red} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={pokemons}
          contentContainerStyle={{
            paddingBottom: 24,
            paddingHorizontal: 24,
          }}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.1}
          keyExtractor={pokemon => String(pokemon.id)}
          renderItem={({item: pokemon, index}) => {
            return (
              <Text style={{height: 200}} key={index}>
                {pokemon?.base_experience}
              </Text>
            );
          }}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
}
