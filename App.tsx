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

const App = () => {
  return <AppRouter />;
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
