import React, {FC} from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';

interface ThumbnailProps {
  uri?: string;
  width?: number;
  style?: Omit<StyleProp<ImageStyle>, 'height'>;
}

const Thumbnail: FC<ThumbnailProps> = ({uri, width = 180, style}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#c0c0c0',
  },
});

export default Thumbnail;
