import {FC, memo, useMemo, useState, ReactNode} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import MyTheme from 'src/config/theme';

interface InputProps extends TextInputProps {
  title?: string;
  error?: string;
  focusColor?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input: FC<InputProps> = ({
  title,
  error,
  focusColor = MyTheme.colors.black,
  onBlur,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textInputStyleMemo = useMemo(() => {
    const _styles: StyleProp<TextStyle> = [styles.inputContainer];
    if (error) {
      _styles.push({borderColor: MyTheme.colors.danger, borderWidth: 2});
    } else if (isFocused) {
      _styles.push({borderColor: focusColor, borderWidth: 2});
    }
    return _styles;
  }, [error, isFocused, focusColor]);
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={textInputStyleMemo}>
        {leftIcon && <View style={{marginRight: 8}}>{leftIcon}</View>}
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          style={styles.inputText}
          {...props}
        />
        {rightIcon && <View style={{marginLeft: 8}}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: '#70747a',
    marginVertical: 6,
    paddingLeft: 16,
  },
  inputContainer: {
    backgroundColor: '#e1e2e4',
    borderRadius: 26,
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    flexGrow: 1,
  },
  textError: {
    color: 'red',
    marginTop: 6,
    paddingHorizontal: 16,
    fontSize: 13,
  },
});

export default memo(Input);
