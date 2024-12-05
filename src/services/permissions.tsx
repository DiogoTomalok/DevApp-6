// src/services/permissions.tsx
import { PermissionsAndroid, Platform, Alert } from 'react-native';

// Função para solicitar permissões no Android
export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      // Solicita permissão para gravar no armazenamento externo
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão para acessar o armazenamento',
          message: 'O app precisa de permissão para salvar o modelo no armazenamento.',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Ok',
        },
      );
      
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permissão negada', 'O app precisa de permissão para acessar o armazenamento.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
