import '@tensorflow/tfjs-react-native'; 
import * as tf from '@tensorflow/tfjs'; 
import ImageResizer from '@bam.tech/react-native-image-resizer'; 
import { Labels } from './labels'; 
import { decodeJpeg } from '@tensorflow/tfjs-react-native'; 
import ReactNativeFS from 'react-native-fs'; 


const modelFilePath = 'file:///android_asset/modelofinal.tflite';


export const processImageWithModel = async (imageUri: string): Promise<string> => {
  try {
   
    await tf.ready();

  
    const model = await tf.loadGraphModel(modelFilePath);

  
    const preprocessedImage = await preprocessImage(imageUri);

    
    const tensor = tf.expandDims(preprocessedImage, 0); 

  
    const predictions = model.predict(tensor) as tf.Tensor;

  
    const predictedIndex = predictions.argMax(-1).dataSync()[0];

    
    return Labels[predictedIndex];
  } catch (error) {
    console.error('Erro ao processar a imagem:', error);
    throw error;
  }
};


const preprocessImage = async (imageUri: string): Promise<tf.Tensor3D> => {
  try {

    const manipResult = await ImageResizer.createResizedImage(
      imageUri,
      224, 
      224, 
      'JPEG', 
      100 
    );

    
    const imageAssetPath = manipResult.uri.replace('file://', '');

    
    const imageData = await ReactNativeFS.readFile(imageAssetPath, 'base64');
    const uint8Array = new Uint8Array(Buffer.from(imageData, 'base64'));

    
    const decodedImage = decodeJpeg(uint8Array);

    
    const normalizedImage = decodedImage.div(tf.scalar(255));

    
    const reshapedImage = normalizedImage.reshape([224, 224, 3]) as tf.Tensor3D;

    return reshapedImage;
  } catch (error) {
    console.error('Erro ao pré-processar a imagem:', error);
    throw error;
  }
};
