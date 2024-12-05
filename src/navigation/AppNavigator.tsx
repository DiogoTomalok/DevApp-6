import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// @ts-ignore
import BottomMenu from '../components/BottomMenu';
import PaginaTeste1 from '../pages/PaginaTeste1';
import Pagina2 from '../pages/Pagina2';
import Paginadetail from '../pages/paginadetail'; // Nome corrigido para refletir "Paginadetail"
import Feed from '../pages/feed';

// Define a lista de parâmetros para as rotas
type RootStackParamList = {
  Home: undefined;
  PaginaTeste1: undefined;
  Pagina2: undefined;
  Paginadetail: { id: string }; // Adicionando o parâmetro esperado
  Feed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
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
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Pagina2" 
          component={Pagina2} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Paginadetail" 
          component={Paginadetail} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Feed" 
          component={Feed} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Define a tela inicial com o menu de navegação
function HomeScreen({ navigation }: { navigation: any }) {
  return <BottomMenu navigation={navigation} />;
}
