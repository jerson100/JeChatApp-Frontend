import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Skeleton from '../Skeleton';

type Props = {
  count?: number;
};

const RequestItemLoading: FC<Props> = ({count = 10}) => {
  return (
    <View style={styles.container}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} height={42} />
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 16,
  },
});

export default RequestItemLoading;
