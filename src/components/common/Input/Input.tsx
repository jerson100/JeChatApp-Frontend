import React, {FC} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  title?: string;
}

const Input: FC<InputProps> = ({title}) => {
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInput style={styles.input} />
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
});

export default Input;
