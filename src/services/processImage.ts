import '@tensorflow/tfjs-react-native'; // Inicializa o TensorFlow.js para React Native
import * as tf from '@tensorflow/tfjs'; // Importa o TensorFlow.js corretamente
import ImageResizer from '@bam.tech/react-native-image-resizer'; // Redimensionador de imagem
import { Labels } from './labels'; // Labels com os nomes das classes
import { decodeJpeg } from '@tensorflow/tfjs-react-native'; // Decodificador de imagens
import ReactNativeFS from 'react-native-fs'; // Para ler arquivos locais

// Caminho para o modelo TFLite local
const modelFilePath = 'file:///android_asset/modelofinal.tflite';

// Função principal para processar a imagem com o modelo
export const processImageWithModel = async (imageUri: string): Promise<string> => {
  try {
    // Inicializa o TensorFlow.js para React Native
    await tf.ready();

    // Carrega o modelo TFLite local
    const model = await tf.loadGraphModel(modelFilePath);

    // Pré-processa a imagem
    const preprocessedImage = await preprocessImage(imageUri);

    // Expande a dimensão da imagem para um batch de tamanho 1
    const tensor = tf.expandDims(preprocessedImage, 0); // Adiciona dimensão de batch (1, 224, 224, 3)

    // Executa a inferência
    const predictions = model.predict(tensor) as tf.Tensor;

    // Extrai o índice da classe com maior probabilidade
    const predictedIndex = predictions.argMax(-1).dataSync()[0];

    // Retorna o rótulo correspondente à classe predita
    return Labels[predictedIndex];
  } catch (error) {
    console.error('Erro ao processar a imagem:', error);
    throw error;
  }
};

// Função para pré-processar a imagem
const preprocessImage = async (imageUri: string): Promise<tf.Tensor3D> => {
  try {
    // Redimensiona a imagem para o tamanho esperado pelo modelo (ex: 224x224)
    const manipResult = await ImageResizer.createResizedImage(
      imageUri,
      224, // largura
      224, // altura
      'JPEG', // Formato JPEG
      100 // Qualidade
    );

    // Converte a imagem redimensionada em um tensor
    const imageAssetPath = manipResult.uri.replace('file://', '');

    // Usa o react-native-fs para ler o arquivo da imagem como um ArrayBuffer
    const imageData = await ReactNativeFS.readFile(imageAssetPath, 'base64');
    const uint8Array = new Uint8Array(Buffer.from(imageData, 'base64'));

    // Decodifica a imagem JPEG para um tensor (3 canais RGB)
    const decodedImage = decodeJpeg(uint8Array);

    // Normaliza a imagem dividindo pelo valor 255 (normalização para intervalo [0, 1])
    const normalizedImage = decodedImage.div(tf.scalar(255));

    // Garante que a imagem seja um Tensor3D (com 3 dimensões)
    const reshapedImage = normalizedImage.reshape([224, 224, 3]) as tf.Tensor3D;

    return reshapedImage;
  } catch (error) {
    console.error('Erro ao pré-processar a imagem:', error);
    throw error;
  }
};
