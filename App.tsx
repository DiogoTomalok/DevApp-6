// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
// @ts-ignore
import BottomMenu from './DevApp/BottomMenu';

import PaginaTeste1 from './DevApp/PaginaTeste1'; // Importa a página de destino

// Define a lista de parâmetros para as rotas, necessária para o TypeScript
type RootStackParamList = {
  Home: undefined;
  PaginaTeste1: undefined;
};

// Define o tipo de navegação para HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PaginaTeste1" 
          component={PaginaTeste1} 
          options={{ title: 'Página de Teste 1' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Define a tela inicial com o menu de navegação
function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  return (
    <>
      {/* Conteúdo da sua tela inicial */}
      <BottomMenu navigation={navigation} /> {/* Passa a navegação para o menu */}
    </>
  );
}
