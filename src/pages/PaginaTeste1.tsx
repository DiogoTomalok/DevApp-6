import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { processImageWithModel } from '../services/processImage'; // Serviço de processamento de imagem
import '@tensorflow/tfjs-react-native'; // Inicializa o TensorFlow.js para React Native
import * as tf from '@tensorflow/tfjs'; // Importa o TensorFlow.js corretamente
import { StackNavigationProp } from '@react-navigation/stack'; // Tipagem para navegação

type RootStackParamList = {
  Home: undefined;
  PaginaTeste1: undefined;
  Pagina2: undefined;
  Feed: undefined; // Página de Feedback
  // Adicione outros parâmetros de navegação, se necessário
};

type PaginaTeste1NavigationProp = StackNavigationProp<RootStackParamList, 'PaginaTeste1'>;

interface PaginaTeste1Props {
  navigation: PaginaTeste1NavigationProp;
}

const PaginaTeste1: React.FC<PaginaTeste1Props> = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isTfReady, setIsTfReady] = useState<boolean>(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string>('Teste'); // Estado para indicar qual item do menu está ativo

  // Verifica permissões de acesso a imagens
  useEffect(() => {
    const checkPermissions = async () => {
      console.log('Verificando permissões...');
      const permission = await request(
        Platform.OS === 'android' && Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
      if (permission !== RESULTS.GRANTED) {
        Alert.alert('Permissão negada', 'A permissão para acessar o armazenamento foi negada.');
      } else {
        console.log('Permissão concedida');
      }
    };

    checkPermissions();
  }, []);

  // Inicializa o TensorFlow.js ao montar o componente
  useEffect(() => {
    const initializeTensorFlow = async () => {
      console.log('Inicializando TensorFlow...');
      try {
        await tf.ready(); // Aguarda o TensorFlow.js estar pronto
        console.log('TensorFlow pronto');
        setIsTfReady(true); // Atualiza o estado para indicar que o TensorFlow está pronto
      } catch (error) {
        console.error('Erro ao inicializar TensorFlow:', error);
      }
    };
    initializeTensorFlow();
  }, []);

  const selectImage = () => {
    console.log('Abrindo biblioteca de imagens...');
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada.');
      } else if (response.errorMessage) {
        console.error('Erro ao selecionar a imagem:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log('Imagem selecionada:', imageUri);
        if (imageUri) {
          setSelectedImage(imageUri);
          setPrediction(null);
        } else {
          console.warn('URI da imagem está indefinida.');
        }
      }
    });
  };

  const processImage = async () => {
    if (!selectedImage) {
      Alert.alert('Erro', 'Por favor, selecione uma imagem!');
      return;
    }

    if (!isTfReady) {
      Alert.alert('Erro', 'TensorFlow não foi inicializado!');
      return;
    }

    try {
      console.log('Processando a imagem...');
      const predictedLabel = await processImageWithModel(selectedImage);
      console.log('Predição da imagem:', predictedLabel);
      setPrediction(predictedLabel);
    } catch (error) {
      console.error('Erro ao processar a imagem:', error);
      Alert.alert('Erro', 'Houve um problema ao processar a imagem.');
    }
  };

  // Função para alterar o item do menu ativo
  const handleMenuItemPress = (item: string) => {
    setActiveMenuItem(item);
    if (item === 'Home') {
      navigation.navigate('Home');
    } else if (item === 'PaginaTeste1') {
      navigation.navigate('PaginaTeste1');
    } else if (item === 'Pagina2') {
      navigation.navigate('Pagina2');
    } else if (item === 'Feed') {
      navigation.navigate('Feed'); // Navega para a página de Feedback
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Exibição da imagem carregada */}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.loadedImage} />
        )}

        {/* Imagem de carregamento enquanto a imagem não é processada */}
        {!selectedImage && (
          <Image source={require('../img/carregar.png')} style={styles.loadingImage} />
        )}

        {/* Resultado da predição */}
        {prediction && <Text style={styles.result}>Predição: {prediction}</Text>}
      </ScrollView>

      {/* Botões empilhados */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={selectImage} style={styles.button}>
          <Image source={require('../img/add.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Adicionar Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={processImage} disabled={!selectedImage || !isTfReady} style={styles.button}>
          <Image source={require('../img/scanner.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Scannear</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Inferior */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuItem, activeMenuItem === 'Home' && styles.activeMenuItem]}
          onPress={() => handleMenuItemPress('Home')}>
          <Image source={require('../img/home.png')} style={styles.menuIcon} />
         
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenuItem === 'PaginaTeste1' && styles.activeMenuItem]}
          onPress={() => handleMenuItemPress('PaginaTeste1')}>
          <Image source={require('../img/scan.png')} style={styles.menuIcon} />
          
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenuItem === 'Pagina2' && styles.activeMenuItem]}
          onPress={() => handleMenuItemPress('Pagina2')}>
          <Image source={require('../img/busca.png')} style={styles.menuIcon} />
          
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenuItem === 'Feed' && styles.activeMenuItem]} // Adiciona o item Feed
          onPress={() => handleMenuItemPress('Feed')}>
          <Image source={require('../img/feed.png')} style={styles.menuIcon} />
         
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Removido o fundo de imagem
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(34, 139, 34, 0.9)', // Verde floresta com transparência
    top: 0,
    bottom: 100, // Deixa espaço para o menu inferior
    left: 0,
    right: 0,
  },
  loadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // A imagem carregada ocupa toda a tela
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Garante que a imagem carregada fique acima do fundo
  },
  loadingImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50, // Centraliza horizontalmente
    marginTop: -50, // Centraliza verticalmente
    zIndex: 2, // Fica acima da imagem de fundo
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 150, // Distância do menu inferior
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(34, 139, 34, 0.9)', // Verde floresta com transparência
  },
  menuItem: {
    alignItems: 'center',
  },
  activeMenuItem: {
    backgroundColor: '#ffcc00', // Cor de destaque para o item ativo
    borderRadius: 5,
    padding: 5,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 12,
    color: '#000',
  },
});

export default PaginaTeste1;
