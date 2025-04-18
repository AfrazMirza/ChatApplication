import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { useTranslation } from 'react-i18next';

const Calls = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Header title={t('Calls')}/>
    </View>
  )
}

export default Calls

const styles = StyleSheet.create({})