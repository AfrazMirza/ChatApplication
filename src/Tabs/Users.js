import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Header from '../Components/Header';


let id = '';
const Users = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    console.log(users);
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
        // console.log(JSON.stringify(res.docs[0].data()));
      });
  };

  const renderUserItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', {data: item, id: id})}
        style={styles.userItem}>
        <Image source={require('../images/user.png')} style={styles.img} />
        <View style={{flexDirection: 'row', width: Dimensions.get('window').width* 0.83, justifyContent: 'space-between'}}>
        <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.name, {fontSize: 13}]}>hello</Text>
        </View>
        <View>
          <Text style={{fontSize: 13}}>12:45 am</Text>
          <Text style={{alignSelf: 'flex-end', backgroundColor: '#25D366', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 30}}>1</Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.heading}>WhatsApp</Text>
        <View style={styles.headerIcons}>
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../images/scanner.png')} style={styles.iconRight} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../images/camera.png')} style={styles.iconRight} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../images/more.png')} style={styles.iconRight} />
                  </TouchableOpacity>
                </View>
      </View> */}
      <Header title='Whatsapp'/>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    // <View>
    // </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    backgroundColor: '#FA4616',
    paddingHorizontal: 10,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  userItem: {
    width: Dimensions.get('window').width,
    // alignItems: 'center',
    // alignSelf: 'center',
    // flex: 1,
    marginTop: 1,
    flexDirection: 'row',
    height: 60,
    // borderWidth: 0.5,
    // borderRadius: 10,
    // backgroundColor: 'lime',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  img: {
    width: 40,
    height: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: '500',
    color: '#FFF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 10,
  },
  iconRight: {
    width: 22,
    height: 22,
    marginHorizontal: 10,
  },
});
