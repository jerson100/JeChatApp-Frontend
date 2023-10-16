import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {SinInValidationSchema} from '../singIn.validation.schema';
import BottomDescription from './BottomDescription';
// import useAuthContext from 'src/hooks/useAuthContext';
import useAuthStore from 'src/stores/AuthStore';
// import ResponseAxiosError from 'src/lib/ResponseAxiosError';

type FormProps = Pick<StackNavigationProp<any>, 'navigate'>;

const Form: FC<FormProps> = ({navigate}) => {
  //   const {login, auth} = useAuthContext();
  const login = useAuthStore(state => state.login);
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async values => {
        // console.log(values);
        try {
          await login(values.username, values.password);
        } catch (e) {
          console.log(e);
        }
        // navigate('MessageScreen');
      }}
      validationSchema={SinInValidationSchema}>
      {({
        handleChange,
        values,
        handleSubmit,
        errors,
        handleBlur,
        touched,
        resetForm,
      }) => (
        <>
          <View style={styles.inputGroup}>
            <Input
              title="Username"
              value={values.username}
              onBlur={handleBlur('username')}
              error={touched.username ? errors.username : ''}
              onChangeText={handleChange('username')}
              autoComplete="off"
            />
            <Input
              title="Password"
              value={values.password}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : ''}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
              autoComplete="off"
            />
          </View>
          <Button
            text="Acceder"
            onPress={() => {
              handleSubmit();
            }}
          />
          <BottomDescription navigate={navigate} resetForm={resetForm} />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
});

export default Form;
