import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from "./pages/login";
import {useSelector} from 'react-redux';
import {UserService} from './services';
import Home from './pages/home';
import Configuracoes from './pages/configuracoes';
import {Store} from './store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{title: 'Configurações'}}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          Store.getState()[UserService.reducerKey]?.token
            ? 'BottomTabNavigator'
            : 'Login'
        }>
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen
          component={BottomTabNavigator}
          name="BottomTabNavigator"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );}
