import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';


const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {t} = useTranslation();


 

  const loginUser = () => {
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        // if(res.docs !== []) {
        if (res.docs.length > 0) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('User Not Found');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('User Not Found');
      });
  };

  // save the data to local storage so we can make this function goToNext()

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Main');
  };

  // useEffect(() => {
  //   let config = {
  //     apiKey: 'AIzaSyDmtNLghiRj-kVIr0PiDdy1XhxIaN-w7y4',
  //     authDomain: 'chatapplication-bb91f.firebaseapp.com',
  //     databaseURL: 'https://chatapplication-bb91f-default-rtdb.firebaseio.com',
  //     projectId: 'chatapplication-bb91f',
  //     storageBucket: 'chatapplication-bb91f.firebasestorage.app',
  //     messagingSenderId: '267651864862',
  //     appId: '1:267651864862:web:abc0df9e6b584eac80510f',
  //   };

  //   firebase.initializeApp(config);

  //   const addDummyUser = async () => {
  //     try {
  //       const docRef = await firestore().collection('users').add({
  //         name: 'Afraz Mirza',
  //         email: 'john@example.com',
  //         age: 24,
  //         createdAt: firestore.FieldValue.serverTimestamp(),
  //       });

  //       console.log('Document added with ID:', docRef.id);
  //     } catch (error) {
  //       console.error('Error adding document:', error);
  //     }
  //   };

  //   addDummyUser();
  // }, []);

  return (
    <View style={styles.container}>
   
      <Text style={styles.wish}>{t('welcome')}</Text>
      <Text style={styles.title2}>{t('signInHeadline')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        value={email}
        maxLength={25}
        placeholderTextColor={'#888'}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        value={password}
        maxLength={25}
        placeholderTextColor={'#888'}
        onChangeText={text => setPassword(text)}
      />

      <Text style={styles.forgotPass}>{t('forgotPassword')}</Text>

      <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate('vjh');
        // }}
        onPress={() => {
          loginUser();
        }}
        style={styles.AllBtnStyle}>
        <Text style={styles.text}>{t('signinBtn')}</Text>
      </TouchableOpacity>
      <Text style={[styles.text1]}>
        {t('createNewUser')}
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogOut');
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}> */}
        <Text
          onPress={() => {
            navigation.navigate('LogOut');
          }}
          style={{color: '#FA4616', fontSize: 12}}
          //  style={{color: theme === 'light' ?'#FA4616' : '#FF5722', fontSize: 12}}
        >
          {t('signupBtn')}
        </Text>
        {/* </TouchableOpacity> */}
      </Text>
     
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#FA4616',
    alignSelf: 'center',
  },
  wish: {
    color: '#FA4616',
    fontSize: 40,
    fontWeight: '600',
    paddingLeft: 10,
  },
  title2: {
    color: '#FA4616',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 40,
    paddingLeft: 10,
  },
  forgotPass: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#FA4616',
    fontWeight: '500',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  AllBtnStyle: {
    borderRadius: 10,
    width: '95%',
    backgroundColor: '#FA4616',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  text1: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  input: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBD6D6',
    // width: '95%',
    // justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginVertical: 10,
  },
 
});
