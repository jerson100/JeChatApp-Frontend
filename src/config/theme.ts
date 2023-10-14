import {DefaultTheme, Theme} from '@react-navigation/native';

const MyTheme: Theme & {
  colors: {
    black: string;
    danger: string;
  };
} = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    black: '#202020',
    danger: '#ff5555',
  },
};

export default MyTheme;
