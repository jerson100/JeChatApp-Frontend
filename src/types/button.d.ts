import {BUTTON_SIZE} from 'components/common/Button/button.style';
import {ReactNode} from 'react';
import {TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  leftIcon?: ReactNode;
  size?: keyof typeof BUTTON_SIZE;
}

export {ButtonProps};
