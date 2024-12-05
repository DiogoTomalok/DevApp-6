import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { buscarTodosDados } from '../services/FirestoreService'; 

type Dados = {
  id: string;
  Nome: string;
  Imagem: string;
  apelido: string[]; 
};

const Pagina2 = ({ navigation }: { navigation: any }) => {
  const [dados, setDados] = useState<Dados[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<Dados[]>([]); 
  const [searchQuery, setSearchQuery] = useState(''); 

  const carregarDados = async () => {
    try {
      const listaDeDados = await buscarTodosDados('dados-dataset');
      setDados(listaDeDados as Dados[]);
      setDadosFiltrados(listaDeDados as Dados[]); 
    } catch (error) {
      console.error('Erro ao carregar dados: ', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query); 
    if (query === '') {
      setDadosFiltrados(dados); 
    } else {
     
      const filteredData = dados.filter(
        (item) =>
          item.Nome.toLowerCase().includes(query.toLowerCase()) || 
          item.id.toLowerCase().includes(query.toLowerCase()) || 
          item.apelido?.some((apelido) => apelido.toLowerCase().includes(query.toLowerCase())) 
      );
      setDadosFiltrados(filteredData); 
    }
  };

  return (
    <ImageBackground
      source={require('../img/img.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Busca"
          value={searchQuery}
          onChangeText={handleSearch} 
        />
      </View>

      {/* Lista de Dados */}
      <View style={styles.listContainer}>
        {dadosFiltrados.length > 0 ? (
          <FlatList
            data={dadosFiltrados} 
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
                <View>
                  <Text style={styles.itemText}>Nome: {item.Nome}</Text>
                  {item.apelido && (
                    <Text style={styles.itemSubText}>apelidos: {item.apelido.join(', ')}</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.loadingText}>Nenhum resultado encontrado...</Text>
        )}
      </View>

      {/* Menu Inferior */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../img/home.png')} 
            style={styles.menuIcon}
          />
        
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaginaTeste1')}>
          <Image
            source={require('../img/scan.png')} 
            style={styles.menuIcon}
          />
         
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Pagina2')}>
          <Image
            source={require('../img/busca.png')} 
            style={styles.menuIcon}
          />
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Feed')}>
          <Image
            source={require('../img/feed.png')} 
            style={styles.menuIcon}
          />
          
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'rgba(173, 216, 230, 0.8)', 
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
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
    backgroundColor: 'rgba(173, 216, 230, 0.8)', 
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
  itemSubText: {
    fontSize: 14,
    color: '#555', 
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
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  menuIcon: {
    width: 24, 
    height: 24, 
    resizeMode: 'contain', 
  },
});

export default Pagina2;
