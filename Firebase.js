import * as firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


export const testFirestoreConnection = async () => {
    try {
      await firestore().collection('test').get();
      console.log('✅ Firestore connection is working!');
    } catch (error) {
      console.error('❌ Firestore connection failed:', error);
    }
  };



export default firebase;