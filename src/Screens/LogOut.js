import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
// import firebase from '@react-native-firebase/app';
import {testFirestoreConnection} from '../utils/firebaseTest'; // optional
import { useTranslation } from 'react-i18next';

const LogOut = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cofirmPass, setConfirmPass] = useState('');
  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    testFirestoreConnection(); // optional for testing connection
  }, []);

  const validate = () => {
    if (!name || !email || !mobile || !password || !cofirmPass) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }
    if (password !== cofirmPass) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    console.log('User Data:', {name, email, password, mobile});

    try {
      const userId = uuid.v4();
      console.log('YUYY', userId);
      const test = await firestore().collection('users').doc(userId).set({
        name,
        email,
        password,
        mobile,
        userId,
      });

      console.log('Test', test);

      Alert.alert('Success', 'User registered successfully!');
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setConfirmPass('');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Firestore Error:', error.code, error.message);
      Alert.alert('Error', 'Failed to register user' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.wish}>{t('signupBtn')}</Text>
      <Text style={styles.title2}>{t('signUpTitle')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('name')}
        value={name}
        maxLength={25}
        placeholderTextColor={'#888'}
        onChangeText={text => setName(text)}
      />
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
        placeholder={t('mobileNo')}
        value={mobile}
        maxLength={10}
        keyboardType="phone-pad"
        placeholderTextColor={'#888'}
        onChangeText={text => setMobile(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        value={password}
        secureTextEntry
        maxLength={25}
        placeholderTextColor={'#888'}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('confirmPass')}
        value={cofirmPass}
        secureTextEntry
        maxLength={25}
        placeholderTextColor={'#888'}
        onChangeText={text => setConfirmPass(text)}
      />

      <TouchableOpacity
        onPress={() => {
          if (validate()) {
            registerUser();
          }
        }}
        style={styles.AllBtnStyle}>
        <Text style={styles.text}>{t('signupBtn')}</Text>
      </TouchableOpacity>

      <Text style={styles.text1}>
        {t('signUpNewUser')}
        {/* <TouchableOpacity onPress={() => navigation.goBack()}> */}
          <Text onPress={() => navigation.goBack()} style={styles.txt}>{t('signinBtn')}</Text>
        {/* </TouchableOpacity> */}
      </Text>
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 40,
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
  title: {
    fontSize: 30,
    color: '#FA4616',
    alignSelf: 'center',
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBD6D6',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  txt: {
    color: '#FA4616',
    fontSize: 12,
  },
});
