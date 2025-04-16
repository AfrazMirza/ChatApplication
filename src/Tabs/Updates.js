import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import ElivatedCards from '../Components/ElivatedCards'

const Updates = () => {
  return (
    <View>
      <Header title='Update'/>
      <ScrollView>
        <ElivatedCards/>
      </ScrollView>
    </View>
  )
}

export default Updates

const styles = StyleSheet.create({})