import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import TitleLogin from './components/TitleLogin';
import {useNavigation} from '@react-navigation/native';
import Form from './components/Form';

const SignInScreen = () => {
  const {navigate} = useNavigation();
  const topBgY = useRef(new Animated.Value(-100));
  const bottomBgY = useRef(new Animated.Value(100));
  const opacityBg = useRef(new Animated.Value(0));
  const formContentOpacity = useRef(new Animated.Value(0));

  useEffect(() => {
    const DURATION = 1000;
    Animated.stagger(DURATION / 2, [
      Animated.parallel([
        Animated.timing(topBgY.current, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(bottomBgY.current, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacityBg.current, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(formContentOpacity.current, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
    ]).start();
    return () => {
      formContentOpacity.current.removeAllListeners();
      topBgY.current.removeAllListeners();
      bottomBgY.current.removeAllListeners();
      opacityBg.current.removeAllListeners();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <Animated.Image
        style={[
          styles.topForm,
          {
            opacity: opacityBg.current,
            transform: [{translateY: topBgY.current}, {rotate: '180deg'}],
          },
        ]}
        source={require('../../assets/images/form.png')}
      />
      <Animated.Image
        style={[
          styles.bottomForm,
          {
            opacity: opacityBg.current,
            transform: [{translateY: bottomBgY.current}],
          },
        ]}
        source={require('../../assets/images/form.png')}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#202020" />
        <Animated.View
          style={[
            styles.content,
            {
              opacity: formContentOpacity.current,
              scaleX: formContentOpacity.current,
              scaleY: formContentOpacity.current,
            },
          ]}>
          <TitleLogin />
          <Form navigate={navigate} />
        </Animated.View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 120,
  },
  topForm: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '112%',
    height: 100,
    zIndex: 10,
  },
  bottomForm: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '112%',
    height: 100,
    zIndex: 10,
  },
  content: {
    width: '100%',
  },
});

export default SignInScreen;
