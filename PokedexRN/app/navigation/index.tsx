import React from 'react';
import {Route} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {routeMap} from './routes';
import HomeScreen from '../view/screen/Home';
const Stack = createSharedElementStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name={routeMap.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
