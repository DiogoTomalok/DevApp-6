import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { buscarTodosDados } from '../services/FirestoreService';

type Dados = {
  id: string;
  Nome: string;
  Imagem: string;
};

const Pagina2 = ({ navigation }: { navigation: any }) => {
  const [dados, setDados] = useState<Dados[]>([]);

  const carregarDados = async () => {
    try {
      const listaDeDados = await buscarTodosDados('dados-dataset');
      setDados(listaDeDados as Dados[]);
    } catch (error) {
      console.error('Erro ao carregar dados: ', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {dados.length > 0 ? (
        <FlatList
          data={dados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => navigation.navigate('Paginadetail', { id: item.id })}

            >
              <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                {item.Imagem && (
                  <Image
                    source={{ uri: item.Imagem }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                  />
                )}
                <Text>Nome: {item.Nome}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Carregando dados...</Text>
      )}
    </View>
  );
};

export default Pagina2;
