import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import firebase from '@react-native-firebase/app';
import './i18n';
const App = () => {
  useEffect(() => {
    let config = {
      apiKey: 'AIzaSyBZ1-kZoqNcr72qSnIg7wpH9ZHo8uxEssg',
      authDomain: 'spasalon-43e2b.firebaseapp.com',
      projectId: 'spasalon-43e2b',
       databaseURL: 'https://spasalon-43e2b-default-rtdb.firebaseio.com',
      storageBucket: 'spasalon-43e2b.appspot.com',
      messagingSenderId: '808970198544',
      appId: '1:808970198544:web:fd0b3da61479d226cb7495',
      measurementId: 'G-Q6C9GD4EGW',

      // apiKey: 'AIzaSyDmtNLghiRj-kVIr0PiDdy1XhxIaN-w7y4',
      // authDomain: 'chatapplication-bb91f.firebaseapp.com',
      // databaseURL: 'https://chatapplication-bb91f-default-rtdb.firebaseio.com',
      // projectId: 'chatapplication-bb91f',
      // storageBucket: 'chatapplication-bb91f.firebasestorage.app',
      // messagingSenderId: '267651864862',
      // appId: '1:267651864862:web:abc0df9e6b584eac80510f',
    };

    firebase.initializeApp(config);
  }, []);

  return <AppNavigator />;
};

export default App;

// const styles = StyleSheet.create({})

// const firebaseConfig = {
//   apiKey: 'AIzaSyBZ1-kZoqNcr72qSnIg7wpH9ZHo8uxEssg',
//   authDomain: 'spasalon-43e2b.firebaseapp.com',
//   projectId: 'spasalon-43e2b',
//   storageBucket: 'spasalon-43e2b.appspot.com',
//   messagingSenderId: '808970198544',
//   appId: '1:808970198544:web:fd0b3da61479d226cb7495',
//   measurementId: 'G-Q6C9GD4EGW',
// };
