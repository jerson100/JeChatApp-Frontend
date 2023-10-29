import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ButtonProps} from 'src/types/button';
import {BUTTON_SIZE} from './button.style';

const Button: FC<ButtonProps> = ({
  text,
  style,
  leftIcon,
  size = 'medium',
  ...props
}) => {
  const {width, ...propsSize} = BUTTON_SIZE[size];
  return (
    <TouchableOpacity style={[propsSize, styles.container, style]} {...props}>
      {leftIcon && leftIcon}
      {text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
