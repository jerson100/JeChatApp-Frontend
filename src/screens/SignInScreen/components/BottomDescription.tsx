import React, {FC, memo} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';

interface BottomDescriptionProps extends Pick<NavigationProp<any>, 'navigate'> {
  resetForm: () => void;
}

const BottomDescription: FC<BottomDescriptionProps> = ({
  navigate,
  resetForm,
}) => {
  return (
    <Text style={styles.textSignUpContainer}>
      ¿No tienes una cuenta?{'  '}
      <Text
        onPress={() => {
          navigate('SignUp' as never);
          setTimeout(() => {
            resetForm();
          }, 1000);
        }}
        style={styles.textSignUpText}>
        Registrarme
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  textSignUpContainer: {
    textAlign: 'center',
    marginTop: 20,
  },
  textSignUpText: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
});

export default memo(BottomDescription);
