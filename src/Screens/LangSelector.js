import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';
import SelectLangModal from '../Components/SelectLangModal';
import { useTranslation } from 'react-i18next';
const LangSelector = () => {
   const {t} = useTranslation();
    const navigation = useNavigation();
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{width: 250, height: 250, borderRadius: 130,}} source={require('../images/langChange.jpg')}/>
      <Text style={{fontSize: 20, fontWeight: '500', lineHeight: 60}}>
        {t('title')}
      </Text>
      <Text>{t('readOut')}<Text style={{color: '#FA4616'}}> {t('privacyPolicy')}</Text>
      {t('Tab')}
      </Text>
      <Text>{t('accept')}<Text style={{color: '#FA4616'}}> {t('T&S')}</Text> .</Text>
         <TouchableOpacity
              style={styles.langView}
              onPress={() => {
                setShowModal(true);
              }}>
              <Text style={styles.lang}>{selectLanguage}</Text>
              <Image source={require('../images/dropdown.png')} style={styles.icon} />
            </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('SignIn')} style={{backgroundColor: '#FA4616', paddingHorizontal: 100, paddingVertical: 10, borderRadius: 20}}><Text style={{color: '#FFF'}}>{t('Btn')}</Text></TouchableOpacity>
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
  )
}

export default LangSelector

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    marginLeft: 10,
    tintColor: '#9e9e9e',
  },
  langView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#9e9e9e',
    margin: 20,
    // position: 'absolute',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  lang: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
})