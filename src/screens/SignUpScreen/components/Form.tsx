import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import {Formik} from 'formik';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SignUpValidationSchema} from '../singUp.validation';

type FormProps = Pick<NativeStackNavigationProp<any>, 'navigate'>;

const Form: FC<FormProps> = ({navigate}) => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={values => {
        console.log(values);
      }}
      validationSchema={SignUpValidationSchema}>
      {({handleChange, values, handleSubmit, errors, touched, handleBlur}) => (
        <>
          <View style={styles.inputContainer}>
            <Input
              title="Nombre de usuario"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={touched.username ? errors.username : ''}
              value={values.username}
              autoComplete="off"
            />
            <Input
              title="Correo Electrónico"
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              error={touched.email ? errors.email : ''}
              value={values.email}
              autoComplete="off"
            />
            <Input
              title="Contraseña"
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              error={touched.password ? errors.password : ''}
              value={values.password}
              autoComplete="off"
            />
            <Input
              title="Confirmar Contraseña"
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
              value={values.confirmPassword}
              autoComplete="off"
            />
          </View>
          <Button text="Registrarme" onPress={() => handleSubmit()} />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
});

export default Form;
