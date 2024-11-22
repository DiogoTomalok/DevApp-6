import firestore from '@react-native-firebase/firestore';

export const buscarTodosDados = async (collection: string) => {
  try {
    const snapshot = await firestore().collection(collection).get();
    if (snapshot.empty) {
      console.log(`Nenhum documento encontrado na coleção ${collection}`);
      return [];
    }
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Erro ao buscar dados da coleção ${collection}:`, error);
    throw error;
  }
};

export const buscarDocumentoPorId = async (collection: string, id: string) => {
  try {
    const doc = await firestore().collection(collection).doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    } else {
      console.log(`Documento com ID ${id} não encontrado na coleção ${collection}`);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar documento por ID na coleção ${collection}:`, error);
    throw error;
  }
};
