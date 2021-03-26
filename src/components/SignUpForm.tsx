import React from 'react';
import {Text} from 'react-native';
import {Field} from 'formik';
import * as Yup from 'yup';
import AppFormField from './Form/AppFormField';
import AppFormSubmitButton from './Form/AppFormSubmitButton';
import AppForm from './Form/AppForm';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').label('Name'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required')
    .label('Confirm Password'),
});

const SignUpForm = () => {
  return (
    <>
      <Text>Sign Up</Text>
      <AppForm
        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
        validationSchema={validationSchema}
        onSubmit={(values: any) => console.log(values)}>
        <Field component={AppFormField} name="name" placeholder="Name" />
        <Field
          component={AppFormField}
          name="email"
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Field
          component={AppFormField}
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Field
          component={AppFormField}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <AppFormSubmitButton title="Submit" />
      </AppForm>
    </>
  );
};

export default SignUpForm;
