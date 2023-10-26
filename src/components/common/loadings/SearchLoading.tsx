import React from 'react';
import {View, StyleSheet} from 'react-native';
import Skeleton from '../Skeleton';

const SearchLoading = () => {
  return (
    <View style={styles.container}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <Skeleton isCircle={false} key={index} height={42} />
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
});

export default SearchLoading;
