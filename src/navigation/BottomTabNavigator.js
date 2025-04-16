import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Users from '../Tabs/Users';
import Setting from '../Tabs/Setting';
import { Image, Text } from 'react-native';
import Updates from '../Tabs/Updates';
import Community from '../Tabs/Community';
import Calls from '../Tabs/Calls';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FA4616',
          height: 70,
        },
    //     tabBarIcon: ({ focused }) => {
    //       let icon;
    //       if (route.name === 'Users') {
    //         icon = require('../images/chat.png');
    //       } else if (route.name === 'Updates') {
    //         icon = require('../images/social-media.png');
    //       }else if (route.name === 'Community') {
    //         icon = require('../images/community.png');
    //       }else if (route.name === 'Calls') {
    //         icon = require('../images/voicecall.png');
    //       }
    //       //  else if (route.name === 'Setting') {
    //       //   icon = require('../images/setting.png');
    //       // }
    //       return (
    //         <Image
    //           source={icon}
    //           style={{
    //             width: 24,
    //             height: 24,
    //             tintColor: focused ? '#000' : '#fff',
    //             marginBottom: 4,
    //           }}
    //         />
    //       );
    //     },
    tabBarIcon: ({ focused }) => {
      let icon;
    
      if (route.name === 'Users') {
        icon = focused
          ? require('../images/chat2.png') // focused icon
          : require('../images/chat.png');       // default icon
      } else if (route.name === 'Updates') {
        icon = focused
          ? require('../images/social-media.png')
          : require('../images/social-media.png');
      } else if (route.name === 'Community') {
        icon = focused
          ? require('../images/community2.png')
          : require('../images/community.png');
      } else if (route.name === 'Calls') {
        icon = focused
          ? require('../images/voicecall2.png')
          : require('../images/voicecall.png');
      }
      // Add similar logic for other tabs if needed
    
      return (
        <Image
          source={icon}
          style={{
            width: 24,
            height: 24,
            marginBottom: 4,
          }}
        />
      );
    },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{ color: focused ? '#000' : '#000', fontSize: 13, fontWeight: focused ? '700' : '500', }}>
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Updates" component={Updates}/>
      <Tab.Screen name="Community" component={Community}/>
      <Tab.Screen name="Calls" component={Calls}/>
      {/* <Tab.Screen name="Setting" component={Setting} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
