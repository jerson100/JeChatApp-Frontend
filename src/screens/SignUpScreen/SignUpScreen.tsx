import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Title from 'components/common/Title';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import Form from './components/Form';

const SignUpScreen = () => {
  const {navigate} = useNavigation();

  const bgAnimationRef = useRef(new Animated.Value(0));
  const bgContentRef = useRef(new Animated.Value(0));
  const bgContentXRef = useRef(new Animated.Value(150));

  useEffect(() => {
    const DURATION = 1000;
    Animated.stagger(DURATION / 2, [
      Animated.timing(bgAnimationRef.current, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(bgContentRef.current, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(bgContentXRef.current, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    return () => {
      bgAnimationRef.current.removeAllListeners();
      bgContentRef.current.removeAllListeners();
    };
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={styles.scrollContainer}
      contentInsetAdjustmentBehavior="automatic">
      <Animated.Image
        source={require('../../assets/images/bgForm2.png')}
        style={[
          styles.bg,
          {
            opacity: bgAnimationRef.current,
          },
        ]}
      />
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={{
            opacity: bgContentRef.current,
            transform: [{translateX: bgContentXRef.current}],
          }}>
          <Title text="Registro" style={styles.title} />
          <Form navigate={navigate} />
          <Text style={styles.textSignUpContainer}>
            ¿Ya tienes una cuenta?{'  '}
            <Text
              onPress={() => {
                navigate('SignIn' as never);
              }}
              style={styles.textSignUpText}>
              Iniciar Sesión
            </Text>
          </Text>
        </Animated.View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
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

export default SignUpScreen;
