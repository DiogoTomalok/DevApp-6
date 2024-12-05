import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
import { buscarTodosDados } from '../services/FirestoreService'; 

export default function BottomMenuWithList({ navigation }) {
  const [dados, setDados] = useState([]);

  const carregarDados = async () => {
    try {
      const listaDeDados = await buscarTodosDados('dados-dataset');
      setDados(listaDeDados);
    } catch (error) {
      console.error('Erro ao carregar dados: ', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <ImageBackground
      source={require('../img/img.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Lista de Dados */}
      <View style={styles.listContainer}>
        {dados.length > 0 ? (
          <FlatList
            data={dados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Paginadetail', { id: item.id })}
                style={styles.itemContainer}
              >
                {item.Imagem && (
                  <Image
                    source={{ uri: item.Imagem }}
                    style={styles.itemImage}
                  />
                )}
                <Text style={styles.itemText}>Nome: {item.Nome}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.loadingText}>Carregando dados...</Text>
        )}
      </View>

      {/* Menu Inferior */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../img/home.png')} // Imagem para o botão Home
            style={styles.menuIcon}
          />
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaginaTeste1')}>
          <Image
            source={require('../img/scan.png')} // Imagem para o botão Scan
            style={styles.menuIcon}
          />
         
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Pagina2')}>
          <Image
            source={require('../img/busca.png')} // Imagem para o botão Busca
            style={styles.menuIcon}
          />
         
        </TouchableOpacity>

        {/* Novo botão Feedback */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Feed')}>
          <Image
            source={require('../img/feed.png')} // Imagem para o botão Feedback
            style={styles.menuIcon}
          />
         
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(173, 216, 230, 0.8)', // Azul claro com transparência
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#2E8B57',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 139, 34, 0.9)',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#000000',
    fontSize: 12,
    marginTop: 4,
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
