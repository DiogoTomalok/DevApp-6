import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function BottomMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="#fff" />
        <Text style={styles.menuText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaginaTeste1')}>
        <Icon name="search" size={24} color="#fff" />
        <Text style={styles.menuText}>Teste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}onPress={() => navigation.navigate('Pagina2')}>
        <Icon name="Pagina2" size={24} color="#fff" /> //pagina dois ainda não ta funcionado como deveria
        <Text style={styles.menuText}>Pagina2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
