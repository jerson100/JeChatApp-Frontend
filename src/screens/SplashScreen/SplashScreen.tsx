import Title from 'components/common/Title';
import React, {useEffect} from 'react';
import {Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const SplashScreen = () => {
  const translateY = new Animated.Value(0);
  const duration = 800;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    return () => {};
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={{transform: [{translateY}]}}>
        <Title text="JeChatApp" style={{color: 'white'}} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'LeckerliOne-Regular',
  },
});

export default SplashScreen;
