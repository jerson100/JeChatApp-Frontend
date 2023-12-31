/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppRouter from 'components/routers/AppRouter';
import React from 'react';
import 'src/config/fontawesome';
import {StyleSheet} from 'react-native';
import {AuthProvider} from 'src/contexts/AuthContext';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    // <AuthProvider>

    <AppRouter />

    // </AuthProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
