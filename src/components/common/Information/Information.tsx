import React, {FC, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MyTheme from 'src/config/theme';

type InformationProps = {
  icon?: React.ReactNode;
  text?: string;
  centered?: boolean;
};

const Information: FC<InformationProps> = ({icon, text, centered = true}) => {
  const _stylesContainer = useMemo(() => {
    return [styles.container, centered && styles.centered];
  }, []);
  return (
    <View style={_stylesContainer}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // borderWidth: 2,
    // borderColor: MyTheme.colors.black,
    borderRadius: 16,
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: MyTheme.colors.black,
  },
});

export default Information;
