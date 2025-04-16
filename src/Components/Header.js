import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Header = ({title}) => {
  return (
    <View style={styles.header}>
            <Text style={styles.heading}>{title}</Text>
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
          </View>
  )
}

export default Header

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
})