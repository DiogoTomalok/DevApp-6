import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
// @ts-ignore(Por algum motivo não funciona se eu tirar esse comentario(Porque(Não faço ideia gepeto que me ajudo com essa merda)))
import BottomMenu from './DevApp/BottomMenu';



import PaginaTeste1 from './DevApp/PaginaTeste1'; //página de destino
import Pagina2 from './DevApp/Pagina2';

// Define a lista de parâmetros para as rotas, necessária para o TypeScript
type RootStackParamList = {
  Home: undefined;
  PaginaTeste1: undefined;
  Pagina2: undefined;
};

// Define o tipo de navegação para HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {/* navegação de paginas, atualmente so esta funcionado o buscar que leva ate a pagina de teste 1 */
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
          options={{ title: 'PáginaTeste' }} //
        />
        <Stack.Screen 
          name="Pagina2" 
          component={Pagina2} 
          options={{ title: 'Página2' }} //
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
