import React, {useEffect} from 'react';
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
import useAuthStore from 'src/stores/AuthStore';

const Stack = createNativeStackNavigator<RouteParamList>();

const optionsHiddenHeader = {
  headerShown: false,
};

const AppRouter = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const initialized = useAuthStore(state => state.initialized);
  const init = useAuthStore(state => state.init);
  useEffect(() => {
    (async () => {
      console.log('verificando usuario');
      await init();
      console.log('Se terminó de verificar el usuario');
    })();
  }, [init]);
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
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                // animation: 'slide_from_bottom',
                animation: 'fade',
                presentation: 'transparentModal',
                headerShown: false,
                // contentStyle: {
                //   //   flex: 1,
                //   backgroundColor: 'red',
                // },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
