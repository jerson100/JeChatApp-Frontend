import React, {FC, ReactNode} from 'react';
import {ButtonProps} from 'src/types/button';
import Button from './Button';
import {StyleSheet} from 'react-native';

type IconButtonProps = Omit<ButtonProps, 'text'> & {
  icon: ReactNode;
};

const IconButton: FC<IconButtonProps> = ({icon, style, ...props}) => {
  return (
    <Button
      style={[styles.container, style]}
      leftIcon={icon}
      text=""
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    paddingHorizontal: 10,
  },
});

export default IconButton;
