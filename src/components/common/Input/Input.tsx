import React, {FC, memo, useMemo, useState} from 'react';
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
}

const Input: FC<InputProps> = ({
  title,
  error,
  focusColor = MyTheme.colors.black,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textInputStyleMemo = useMemo(() => {
    const _styles: StyleProp<TextStyle> = [styles.input];
    if (error) {
      _styles.push({borderColor: MyTheme.colors.danger, borderWidth: 2});
    } else if (isFocused) {
      _styles.push({borderColor: focusColor, borderWidth: 2});
    }
    return _styles;
  }, [error, isFocused, focusColor]);
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        style={textInputStyleMemo}
        {...props}
      />
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#70747a',
    marginVertical: 6,
    paddingLeft: 16,
  },
  input: {
    backgroundColor: '#e1e2e4',
    borderRadius: 26,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textError: {
    color: 'red',
    marginTop: 6,
    paddingHorizontal: 16,
    fontSize: 13,
  },
});

export default memo(Input);
