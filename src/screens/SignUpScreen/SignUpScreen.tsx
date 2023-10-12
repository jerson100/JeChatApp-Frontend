import {useNavigation} from '@react-navigation/native';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Title from 'components/common/Title';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

const SignUpScreen = () => {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Title text="Sign Up" style={styles.title} />
      <View style={styles.inputContainer}>
        <Input title="Nombre de usuario" />
        <Input title="Correo Electrónico" />
        <Input title="Contraseña" />
        <Input title="Confirmar Contraseña" />
      </View>
      <Button text="Registrarme" />
      <Text style={styles.textSignUpContainer}>
        ¿Ya tengo una cuenta?{'  '}
        <Text
          onPress={() => {
            navigate('SignIn' as never);
          }}
          style={styles.textSignUpText}>
          Iniciar Sesión
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textSignUpContainer: {
    textAlign: 'center',
    marginTop: 20,
  },
  textSignUpText: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
