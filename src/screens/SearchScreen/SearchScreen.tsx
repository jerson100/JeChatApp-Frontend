import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

const SearchScreen = () => {
  useEffect(() => {
    console.log('Render SearchScreen');

    return () => {
      console.log('Unmount SearchScreen');
    };
  }, []);
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
