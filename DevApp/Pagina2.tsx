import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaginaApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alguma coisa2!</Text>
    </View>
  );
};
/*  pagina em branco caso queira usar para fazer alguma coisa pode ir desenvolvendo, vou arrumar mais uma pagina pelo menos de busca e depois arruma 
a home(App.tsx) */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default PaginaApp;
