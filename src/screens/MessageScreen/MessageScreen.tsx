import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

const MessageScreen = () => {
  useEffect(() => {
    console.log('Render MessageScreen');

    return () => {
      console.log('Unmount MessageScreen');
    };
  }, []);
  return (
    <SafeAreaView>
      <Text>Message</Text>
    </SafeAreaView>
  );
};

export default MessageScreen;
