import React from 'react';
import {Image, StatusBar, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../ProfileScreen';
import FriendsScreen from '../FriendsScreen';
import RequestsScreen from '../RequestsScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          headerLeft: () => (
            <View style={{marginLeft: 16}}>
              <Image
                source={require('../../assets/images/logo-user.png')}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: '#c0c0c0',
                }}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <FontAwesomeIcon
                style={{marginRight: 16}}
                icon="magnifying-glass"
                size={22}
                color="#404040"
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused, color, size}) => {
            const icons = {
              Requests: 'bell',
              Friends: 'inbox',
              Profile: 'user',
            };
            const iconName = icons[
              route.name as keyof typeof icons
            ] as IconProp;
            return <FontAwesomeIcon icon={iconName} size={28} color={color} />;
          },
          tabBarActiveTintColor: '#202020',
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Requests" component={RequestsScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export default HomeScreen;
