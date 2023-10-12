import Button from 'components/common/Button';
import Input from 'components/common/Input';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
} from 'react-native';
import TitleLogin from './components/TitleLogin';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const {navigate} = useNavigation();
  const topBgY = new Animated.Value(-100);
  const bottomBgY = new Animated.Value(100);
  const opacityBg = new Animated.Value(0);

  const formContentOpacity = new Animated.Value(0);

  useEffect(() => {
    const DURATION = 2000;
    Animated.stagger(DURATION, [
      Animated.parallel([
        Animated.timing(topBgY, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(bottomBgY, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacityBg, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(formContentOpacity, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#202020" />
      <Animated.Image
        style={[
          styles.topForm,
          {
            opacity: opacityBg,
            transform: [{translateY: topBgY}, {rotate: '180deg'}],
          },
        ]}
        source={require('../../assets/images/form.png')}
      />
      <Animated.Image
        style={[
          styles.bottomForm,
          {
            opacity: opacityBg,
            transform: [{translateY: bottomBgY}],
          },
        ]}
        source={require('../../assets/images/form.png')}
      />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: formContentOpacity,
            scaleX: formContentOpacity,
            scaleY: formContentOpacity,
          },
        ]}>
        <TitleLogin />
        <View style={styles.inputGroup}>
          <Input title="Username" />
          <Input title="Password" />
        </View>
        <Button text="Acceder" />
        <Text style={styles.textSignUpContainer}>
          ¿No tienes una cuenta?{'  '}
          <Text
            onPress={() => {
              navigate('SignUp' as never);
            }}
            style={styles.textSignUpText}>
            Registrarme
          </Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
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
  inputGroup: {
    marginBottom: 20,
  },
  textSignUpContainer: {
    textAlign: 'center',
    marginTop: 20,
  },
  textSignUpText: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
});

export default SignInScreen;
