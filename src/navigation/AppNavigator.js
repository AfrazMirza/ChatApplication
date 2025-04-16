import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';
import LogOut from '../Screens/LogOut';
import Chat from '../Screens/Chat';
import Screens from '../Screens/Screens';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={Splash}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='LogOut'component={LogOut}/>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name='Screens' component={Screens}/>
            <Stack.Screen name='Chat' component={Chat} options={{headerShown: true}}/>

            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})