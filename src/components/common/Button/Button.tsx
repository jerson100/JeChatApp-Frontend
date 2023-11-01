import React, {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {ButtonProps} from 'src/types/button';
import {BUTTON_SIZE} from './button.style';

const Button: FC<ButtonProps> = ({
  text,
  style,
  leftIcon,
  loading = false,
  loadingColor = '#fff',
  size = 'medium',
  disabled = false,
  ...props
}) => {
  const {width, fontSize, ...propsSize} = BUTTON_SIZE[size];
  const opacityText = {opacity: loading ? 0 : 1};
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[propsSize, styles.container, style]}
      {...props}>
      {loading && (
        <View style={styles.indicator}>
          <ActivityIndicator color={loadingColor} />
        </View>
      )}
      <View style={[opacityText, styles.buttonContent]}>
        {leftIcon && leftIcon}
        {text && <Text style={[styles.text, {fontSize}]}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
  },
});

export default Button;
