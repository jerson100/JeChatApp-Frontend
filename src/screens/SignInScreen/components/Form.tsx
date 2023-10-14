import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {SinInValidationSchema} from '../singIn.validation.schema';
import BottomDescription from './BottomDescription';

type FormProps = Pick<StackNavigationProp<any>, 'navigate'>;

const Form: FC<FormProps> = ({navigate}) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => {
        console.log(values);
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
