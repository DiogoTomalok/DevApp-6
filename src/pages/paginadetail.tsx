import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { buscarDocumentoPorId } from '../services/FirestoreService';

type DadosDetalhados = {
  id: string;
  Nome: string;
  descricao: string;
  algo: string;
  imagemarray: string[];
};

const Paginadetail = ({ route }: { route: any }) => {
  const [dados, setDados] = useState<DadosDetalhados | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Adicionado para feedback visual
  const { id } = route.params; // ID recebido via navegação

  const carregarDadosDetalhados = async () => {
    try {
      setIsLoading(true); // Inicia o carregamento
      const documento = await buscarDocumentoPorId('dados-dataset', id);
      if (documento) {
        setDados(documento as DadosDetalhados);
      }
    } catch (error) {
      console.error('Erro ao carregar dados detalhados: ', error);
    } finally {
      setIsLoading(false); // Conclui o carregamento
    }
  };

  useEffect(() => {
    carregarDadosDetalhados();
  }, [id]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Indicador de carregamento
      ) : dados ? (
        <>
          <Text style={styles.nome}>Nome: {dados.Nome}</Text>
          <Text style={styles.descricao}>Descrição: {dados.descricao}</Text>
          <Text style={styles.algo}>Algo: {dados.algo}</Text>
          <ScrollView horizontal style={styles.scrollContainer}>
            {dados.imagemarray.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.imagem}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <Text style={styles.erro}>Erro ao carregar os dados ou dados não encontrados.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 10,
  },
  algo: {
    fontSize: 16,
  },
  scrollContainer: {
    marginTop: 20,
  },
  erro: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default Paginadetail;
