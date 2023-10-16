import {ReactNode} from 'react';
import {TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  leftIcon?: ReactNode;
}

export {ButtonProps};
