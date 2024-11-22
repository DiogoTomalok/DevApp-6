import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Reducers from '../reducers';

const persistConfig = {
  key: 'DevApp-6',
  storage: AsyncStorage,
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, Reducers);

export const Store = createStore(persistedReducer);
export const Persistor = persistStore(Store);
