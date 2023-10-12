import React, {FC} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface TitleProps {
  text?: string;
  style?: StyleProp<TextStyle> | undefined;
}

const Title: FC<TitleProps> = ({text, style}) => {
  return <Text style={[styles.default, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 40,
    fontFamily: 'LeckerliOne-Regular',
    color: '#202020',
  },
});

export default Title;
