import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
// import AllInputs from './AllInputs';
// import {TextInput} from 'react-native-gesture-handler';
// import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
// import firebase from '../../Firebase';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cofirmPass, setConfirmPass] = useState('');
  const navigation = useNavigation();
  console.log('SignUp screen rendered');
  // console.log("dsfakjhdsafk", firebase);


  // useEffect(() => {
  //   firebase.initializeApp()
  //   // firebase
  //   // console.log("dsfd", firebase);

  //   // const usersCollection = firestore().collection('Users');
  // }, []);

  const registerUser = () => {
    const userId = uuid.v4();
    console.log("Registering user:", {name, email, mobile, password});

    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        // console.log('user created');
        console.log('User registered successfully!');
        Alert.alert('Success', 'User registered successfully!');
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setConfirmPass('');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        // console.log(error);
        console.log('Firestore error:', error);
        Alert.alert('Error', 'Something went wrong');
      });

    const validate = () => {
      let isValid = true;
      if (name == '') {
        isValid = false;
      }
      if (email == '') {
        isValid = false;
      }
      if (mobile == '') {
        isValid = false;
      }
      if (password == '') {
        isValid = false;
      }
      if (cofirmPass == '') {
        isValid = false;
      }
      if (cofirmPass !== password) {
        isValid = false;
      }
      return isValid;
    };

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Hello, SignUp!</Text>
  </View>
      // <View style={styles.container}>
      //   <Text style={styles.title}>SignUp</Text>
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Enter Name"
      //     value={name}
      //     maxLength={25}
      //     placeholderTextColor={'#888'}
      //     onChangeText={text => setName(text)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Enter Email"
      //     value={email}
      //     maxLength={25}
      //     placeholderTextColor={'#888'}
      //     onChangeText={text => setEmail(text)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Enter Mobile No"
      //     value={mobile}
      //     maxLength={25}
      //     placeholderTextColor={'#888'}
      //     onChangeText={text => setMobile(text)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Enter Password"
      //     value={password}
      //     maxLength={25}
      //     placeholderTextColor={'#888'}
      //     onChangeText={text => setPassword(text)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Enter Confirm Password"
      //     value={cofirmPass}
      //     maxLength={25}
      //     placeholderTextColor={'#888'}
      //     onChangeText={text => setConfirmPass(text)}
      //   />
      //   {/* <AllInputs title='Enter Name'
      // showError={(text)=> setName(text)}
      // value='name'/> */}
      //   {/* <AllInputs title='Email'/>
      // <AllInputs title='Password'/>
      // <AllInputs title='Confirm Password'/>
      // <AllInputs title='Mobile'/> */}
      //   <TouchableOpacity
      //     onPress={() => {
      //       if (validate()) {
      //         registerUser
      //       } else {
      //         Alert.alert('Please Enter Correct Data');
      //       }
      //     }}
      //     style={styles.AllBtnStyle}>
      //     <Text style={styles.text}>SignUp</Text>
      //   </TouchableOpacity>
      //   <Text style={[styles.text1]}>
      //     Already have an account?
      //     <TouchableOpacity
      //       onPress={() => {
      //         navigation.navigate('SignIn');
      //       }}
      //       style={{alignItems: 'center', justifyContent: 'center'}}>
      //       <Text
      //         style={{color: '#FA4616', fontSize: 12}}
      //         //  style={{color: theme === 'light' ?'#FA4616' : '#FF5722', fontSize: 12}}
      //       >
      //         SIGN IN
      //       </Text>
      //     </TouchableOpacity>
      //   </Text>
      // </View>
    );
  };
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 40,
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
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBD6D6',
    // width: '95%',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6, 
    paddingHorizontal: 12,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
