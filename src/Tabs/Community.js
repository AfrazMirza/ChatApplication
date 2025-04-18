import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { useTranslation } from 'react-i18next';

const Community = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Header title={t('Community')} />
    </View>
  )
}

export default Community

const styles = StyleSheet.create({})