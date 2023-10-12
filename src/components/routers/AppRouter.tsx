import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from 'screens/SignInScreen';
import {RouteParamList} from 'src/types/router';
import HomeScreen from 'screens/HomeScreen';
import MessageScreen from 'screens/MessageScreen';
import SignUpScreen from 'screens/SignUpScreen';
import SearchScreen from 'screens/SearchScreen';
import SplashScreen from 'src/screens/SplashScreen';
import MyTheme from 'src/config/theme';

const Stack = createNativeStackNavigator<RouteParamList>();

const optionsHiddenHeader = {
  headerShown: false,
};

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(true);
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        {!initialized ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={optionsHiddenHeader}
          />
        ) : !isAuthenticated ? (
          <Stack.Group screenOptions={optionsHiddenHeader}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
