import {DefaultTheme, Theme} from '@react-navigation/native';

const MyTheme: Theme & {
  colors: {
    black: string;
    danger: string;
    border: string;
  };
} = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    black: '#202020',
    danger: '#ff5555',
    border: '#f0f0f0',
  },
};

export default MyTheme;
