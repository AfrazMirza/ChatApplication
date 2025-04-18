import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const SelectLangModal = ({visible, onClose, onSelect, selectedLang}) => {
  const {t} = useTranslation();
  const [languages, setLanguages] = useState([
    {
      title: 'English',
    },
    {
      title: 'हिंदी',
    },
    {
      title: 'اردو',
    },
    {
      title: 'ਪੰਜਾਬੀ',
    },
    {
      title: 'राजस्थानी',
    },
    {
      title: 'தமிழ்',
    },
    {
      title: 'বাংলা',
    },
    {
      title: 'తెలుగు',
    },
    {
      title: 'मराठी',
    },
    {
      title: 'മലയാളം',
    },
    {
      title: 'ગુજરાતી',
    },
    {
      title: 'ಕನ್ನಡ',
    },
    {
      title: 'ଓଡ଼ିଆ',
    },
  ]);
  const getSelected = () => {
    let i = 0;
    languages.map((item, index) => {
      if (item.title == selectedLang) {
        i = index;
      }
    });
    return i;
  };
  const [selectedIndex, setSelectedIndex] = useState(getSelected());

  return (
    <ReactNativeModal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={() => onClose()}
      isVisible={visible}
      style={styles.modalView}>
      <View style={styles.modal}>
       <View style={{flexDirection: 'row',margin: 20, alignItems: 'center'}} > <TouchableOpacity><Image style={{width: 24, height: 24}} source={require('../images/cross.png')}/></TouchableOpacity> <Text style={styles.heading}>
        {t('AppLanguage')}
        </Text></View>
        <ScrollView>
          <FlatList
            data={languages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setSelectedIndex(index);
                    onSelect(languages[index].title);
                  }}>
                  <Image
                    source={
                      selectedIndex == index
                        ? require('../images/radio.png')
                        : require('../images/radio-button.png')
                    }
                    style={styles.icon}
                  />
                  <Text style={styles.itemTxt}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
            // showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default SelectLangModal;
const styles = StyleSheet.create({
  modalView: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  icon: {
    width: 18,
    height: 18,
  },
  modal: {
    width: '100%',
    height: 500,
    paddingBottom: 20,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 20
    
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    height: 50,
    borderWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  itemTxt: {
    marginLeft: 10,
    fontSize: 16,
  },
});
