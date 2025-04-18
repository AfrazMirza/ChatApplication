import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';
import SelectLangModal from '../Components/SelectLangModal';

const Setting = ({navigation}) => {
  const {t} = useTranslation();
  const [selectLanguage, setSelectLanguage] = useState('English');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    checkLng();
  }, []);
  const checkLng = async () => {
    const x = await AsyncStorage.getItem('LANG');
    if (x != null) {
      i18n.changeLanguage(x);
      let lng =
        x == 'en'
          ? 'English'
          : x == 'hi'
          ? 'हिंदी'
          : x ==  'ur'
          ? 'اردو'
          : x == 'ਪੰਜਾਬੀ'
          ? 'pa'
          : x == 'தமிழ்'
          ? 'ta'
          : x == 'বাংলা'
          ? 'bn'
          : x == 'मराठी'
          ? 'mr'
          : x == 'ગુજરાતી'
          ? 'gu'
          : x == 'ಕನ್ನಡ'
          ? 'kn'
          : x == 'മലയാളം'
          ? 'ml'
          : x == 'राजस्थानी'
          ? 'rj'
          : x == 'తెలుగు'
          ? 'te'
          : 'or';
      setSelectLanguage(lng);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.heading}>{t('Setting')}</Text>
      </View>
      <View>
        <TouchableOpacity
         onPress={()=>navigation.navigate('SignIn')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: '#ddd',
          }}>
            <Image style={{ width: 27,
    height: 27,
    resizeMode: 'contain',}} source={require('../images/logout.png')}/>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 27,
              // color: '#333',
            }}>
            LogOut
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: '#ddd',
          }}>
            <Image style={{ width: 24,
    height: 24,
    resizeMode: 'contain',}} source={require('../images/globe.png')}/>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 27,
              // color: '#333',
            }}>
            App Language
          </Text>
        </TouchableOpacity>
      </View>
      <SelectLangModal
              visible={showModal}
              selectedLang={selectLanguage}
              onClose={() => {
                setShowModal(false);
              }}
              onSelect={async lang => {
                let lng =
                  lang == 'English'
                    ? 'en'
                    : lang == 'हिंदी'
                    ? 'hi'
                    : lang == 'اردو'
                    ? 'ur'
                    : lang == 'ਪੰਜਾਬੀ'
                    ? 'pa'
                    : lang == 'தமிழ்'
                    ? 'ta'
                    : lang == 'বাংলা'
                    ? 'bn'
                    : lang == 'मराठी'
                    ? 'mr'
                    : lang == 'ગુજરાતી'
                    ? 'gu'
                    : lang == 'ಕನ್ನಡ'
                    ? 'kn'
                    : lang == 'മലയാളം'
                    ? 'ml'
                    : lang == 'राजस्थानी'
                    ? 'rj'
                    : lang == 'తెలుగు'
                    ? 'te'
                    : 'or';
                await AsyncStorage.setItem('LANG', lng);
                i18n.changeLanguage(lng);
                setSelectLanguage(lang);
                setShowModal(false);
              }}
            />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: '#FA4616',
    paddingHorizontal: 10,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  heading: {
    fontSize: 25,
    fontWeight: '500',
    color: '#FFF',
  },
});
