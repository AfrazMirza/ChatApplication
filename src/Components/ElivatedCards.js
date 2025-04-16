import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const ElivatedCards = () => {
  return (
    <View>
      <Text style={styles.headingText}>Status</Text>
      <ScrollView horizontal={true} style={styles.container}>
        {/* for making the multiple boxes we can create a one cmponent and call it multiple time  */}

        <Status title="Add status" />
        <Status title="Akram Bhai" />
        <Status title="Zia Bhai" />
        <Status title="Shoiab Bhai" />
        <Status title="Razeb" />
        <Status title="Abrar" />
        <Status title="Amil" />
        <Status title="Ravikiran" />
        <Status title="Manish" />

        {/* this is the simple way for creating the boxes  */}
      </ScrollView>
    </View>
  )
}

export default ElivatedCards

const Status = (props) => {
    return (
      <TouchableOpacity>
      <View style={[styles.card, styles.cardElivated]}>
        <View style={styles.story} />
        <Text style={styles.text}>{props.title}</Text>
      </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    // styling of ElivatedCards
    headingText: {
        fontSize: 24,
        marginHorizontal: 10,
        // paddingHorizontal: 8,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      container: {
        // backgroundColor: 'white',
        padding: 8,
      },
    // Styling of status card
    card: {
        flex: 1,
        margin: 3,
        padding: 8,
        width: 85,
        height: 140,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: 18,
      },
      cardElivated: {
        backgroundColor: '#CAD5E2',
      },
      story: {
        width: 35,
        height: 35,
        alignSelf: 'flex-start',
        backgroundColor: 'grey',
        borderRadius: 30,
        padding: 3,
        borderWidth: 1.5,
        borderColor: 'greenyellow'
      },
      text: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold'
      }
})