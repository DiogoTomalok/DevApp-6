import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { buscarDocumentoPorId } from '../services/FirestoreService';

type DadosDetalhados = {
  id: string;
  Nome: string;
  descricao: string;
  algo: string;
  imagemarray: string[];
  apelidos: string[]; // Novo campo para apelidos
};

const Paginadetail = ({ route, navigation }: { route: any; navigation: any }) => {
  const [dados, setDados] = useState<DadosDetalhados | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;

  const carregarDadosDetalhados = async () => {
    try {
      setIsLoading(true);
      const documento = await buscarDocumentoPorId('dados-dataset', id);
      if (documento) {
        setDados(documento as DadosDetalhados);
      }
    } catch (error) {
      console.error('Erro ao carregar dados detalhados: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosDetalhados();
  }, [id]);

  return (
    <View style={styles.container}>
      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : dados ? (
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Nome</Text>
              <Text style={styles.value}>{dados.Nome}</Text>

              <Text style={styles.title}>Descrição</Text>
              <Text style={styles.value}>{dados.descricao}</Text>

              <Text style={styles.title}>Algo</Text>
              <Text style={styles.value}>{dados.algo}</Text>

              <Text style={styles.title}>apelidos</Text>
              {dados.apelidos && dados.apelidos.length > 0 ? (
                dados.apelidos.map((apelido, index) => (
                  <Text key={index} style={styles.value}>
                    - {apelido}
                  </Text>
                ))
              ) : (
                <Text style={styles.value}>Nenhum apelido disponível</Text>
              )}
            </View>

            <Text style={styles.title}>Imagens</Text>
            {dados.imagemarray.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.imagem}
              />
            ))}
          </>
        ) : (
          <Text style={styles.erro}>Erro ao carregar os dados ou dados não encontrados.</Text>
        )}
      </ScrollView>

      {/* Menu Inferior */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../img/home.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaginaTeste1')}>
          <Image
            source={require('../img/scan.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Teste</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Pagina2')}>
          <Image
            source={require('../img/busca.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  erro: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
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

export default Paginadetail;
