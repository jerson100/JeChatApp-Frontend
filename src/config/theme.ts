import {DefaultTheme, Theme} from '@react-navigation/native';

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default MyTheme;
