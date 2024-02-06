import {configureStore} from '@reduxjs/toolkit';

import {setupListeners} from '@reduxjs/toolkit/query';
import {pokemonApi} from '../../service/pokemon';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
