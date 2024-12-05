import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';  // Importando para tipagem de navegação
import { adicionarDocumento } from '../services/FirestoreService'; // Função para adicionar no Firestore


type FeedbackScreenNavigationProp = StackNavigationProp<
  { 
    Home: undefined; 
    PaginaTeste1: undefined; 
    Pagina2: undefined;
    Feed: undefined; 
  }, 
  'Feed'
>;

interface FeedbackProps {
  navigation: FeedbackScreenNavigationProp;
}

const Feedback: React.FC<FeedbackProps> = ({ navigation }) => {
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');

  const enviarFeedback = async () => {
    if (!campo1 || !campo2) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    try {
      await adicionarDocumento('feedback', { campo1, campo2, timestamp: new Date() });
      Alert.alert('Agradecemos Seu Feedback!!!');
      setCampo1(''); 
      setCampo2('');
    } catch (error) {
      console.error('Erro ao enviar feedback: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar seu feedback. Tente novamente.');
    }
  };

  return (
    <ImageBackground
      source={require('../img/img.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Deixe seu Feedback</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite algo para o Campo 1"
          value={campo1}
          onChangeText={setCampo1}
        />

        <Text style={styles.label}>Deixe Seu Comentario</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite algo para o Campo 2"
          value={campo2}
          onChangeText={setCampo2}
        />

        <TouchableOpacity style={styles.botao} onPress={enviarFeedback}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
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
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default Feedback;
