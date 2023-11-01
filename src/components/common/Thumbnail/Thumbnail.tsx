import React, {FC} from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  Text,
} from 'react-native';

interface ThumbnailProps {
  uri?: string;
  width?: number;
  style?: Omit<StyleProp<ImageStyle>, 'height'>;
  isNew?: boolean;
}

const Thumbnail: FC<ThumbnailProps> = ({
  uri,
  width = 180,
  style,
  isNew = false,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.image,
          {width: width, height: width},
          {borderRadius: width / 2},
          style,
        ]}
        source={
          uri ? {uri: uri} : require('../../../assets/images/logo-user.png')
        }
      />
      {isNew && (
        <View style={styles.isNewContainer}>
          <Text style={styles.isNewText}>NUEVO</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: '#c0c0c0',
  },
  isNewContainer: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    width: 50,
    paddingVertical: 1,
    transform: [{translateX: -25}],
    backgroundColor: '#318CE7',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isNewText: {color: '#fff', fontSize: 11},
});

export default Thumbnail;
