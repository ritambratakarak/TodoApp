import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import {AuthContext} from '../components/AuthContext';

const LoginSchema = Yup.object().shape({
  emailId: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Min 4 characters')
    .required('Password is required'),
});

export default function LoginScreen() {
  const {login} = useContext(AuthContext);

  const handleSubmit = async values => {
    try {
      await login(values);
      Alert.alert('Success', 'You are now logged in');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>LOGO</Text>
      </View>

      <Formik
        initialValues={{emailId: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <InputField
              label="Email ID"
              value={values.emailId}
              onChangeText={handleChange('emailId')}
              onBlur={handleBlur('emailId')}
            />
            {touched.emailId && errors.emailId && (
              <Text style={styles.errorText}>{errors.emailId}</Text>
            )}

            <InputField
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {alignItems: 'center', marginBottom: 40},
  logoText: {fontSize: 32, fontWeight: 'bold', color: '#6200ee'},
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {color: '#fff', fontSize: 16},
  errorText: {color: 'red', marginBottom: 8, marginTop: -8, marginLeft: 4},
});
