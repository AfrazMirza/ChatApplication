import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Users from '../Tabs/Users';
import Setting from '../Tabs/Setting';
import { Image, Text } from 'react-native';
import Updates from '../Tabs/Updates';
import Community from '../Tabs/Community';
import Calls from '../Tabs/Calls';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {t} = useTranslation();
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
    
      if (route.name === 'Chats') {
        icon = focused
          ? require('../images/comment1.png') // focused icon
          : require('../images/comment.png');       // default icon
      } else if (route.name === 'Update') {
        icon = focused
          ? require('../images/status1.png')
          : require('../images/status.png');
      } else if (route.name === 'Community') {
        icon = focused
          ? require('../images/community2.png')
          : require('../images/community.png');
      } else if (route.name === 'Calls') {
        icon = focused
          ? require('../images/voicecall2.png')
          : require('../images/voicecall.png');
      } else if (route.name === 'Setting') {
        icon = focused
          ? require('../images/settings1.png')
          : require('../images/settings.png');
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
      <Tab.Screen name="Chats" component={Users} options={{
        tabBarLabel: t('chat')
      }} />
      <Tab.Screen name="Update" component={Updates} options={{
        tabBarLabel: t('Update')
      }}/>
      <Tab.Screen name="Community" component={Community} options={{
        tabBarLabel: t('Community')
      }}/>
      <Tab.Screen name="Calls" component={Calls} options={{
        tabBarLabel: t('Calls')
      }}/>
      <Tab.Screen name="Setting" component={Setting} options={{
        tabBarLabel: t('Setting')
      }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
