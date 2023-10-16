import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ButtonProps} from 'src/types/button';

const Button: FC<ButtonProps> = ({text, style, leftIcon, ...props}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      {leftIcon && leftIcon}
      {text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
