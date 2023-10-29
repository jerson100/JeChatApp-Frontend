import React, {FC, ReactNode} from 'react';
import {ButtonProps} from 'src/types/button';
import Button from './Button';
import {StyleSheet} from 'react-native';
import {BUTTON_SIZE} from './button.style';

type IconButtonProps = Omit<ButtonProps, 'text'> & {
  icon: ReactNode;
  rounded?: boolean;
};

const IconButton: FC<IconButtonProps> = ({
  icon,
  style,
  size = 'medium',
  rounded = false,
  ...props
}) => {
  const sizeStyles = BUTTON_SIZE[size];
  const roundedStyles = rounded ? {borderRadius: sizeStyles.width / 2} : {};
  return (
    <Button
      style={[styles.container, sizeStyles, style, roundedStyles]}
      leftIcon={icon}
      text=""
      size={size}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default IconButton;
