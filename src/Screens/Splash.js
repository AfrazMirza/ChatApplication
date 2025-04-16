import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {

        setTimeout(()=> {
           checkLogin();
        }, 2000);
    },[]);

// if user is login previously then we can navigate the user on Main.js screen and if user not login then we can navigate the user on SignIn.js screen when the app is started so the checkLogin() method is doing that task 

    const checkLogin = async() => {
      const id = await AsyncStorage.getItem('USERID');
      if(id !== null){
        navigation.navigate('Main');
      }else{
        navigation.navigate('SignIn');
      }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Firebase Chat App</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FA4616',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
        fontWeight: '700',
        color: '#fff',
    },
});