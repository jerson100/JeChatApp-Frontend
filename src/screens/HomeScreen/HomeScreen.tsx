import React from 'react';
import {Image, StatusBar, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../ProfileScreen';
import FriendsScreen from '../FriendsScreen';
import RequestsScreen from '../RequestsScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import useAuthStore from 'src/stores/AuthStore';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const user = useAuthStore(state => state.auth?.user);
  //   console.log(user);
  //   useEffect(() => {
  //     console.log('Render HomeScreen');
  //     return () => {
  //       console.log('Unmount HomeScreen');
  //     };
  //   }, []);

  const toSearchScreen = () => {
    navigate('Search' as never);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          headerLeft: () => (
            <View style={{marginLeft: 16}}>
              <Image
                source={
                  user && user.urlImageProfile
                    ? {
                        uri: user.urlImageProfile,
                      }
                    : require('../../assets/images/logo-user.png')
                }
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: '#c0c0c0',
                  objectFit: 'cover',
                }}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toSearchScreen}>
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
