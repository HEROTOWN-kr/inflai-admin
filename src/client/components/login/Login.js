import React from 'react';
import '../../css/sub.scss';
import { Grid, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextField from '../containers/MyTextField';

function Login({
  loginUser
}) {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .required('이메일을 입력해주세요'),
    password: Yup.string()
      .required('이메일을 입력해주세요'),
  });

  return (
    <Grid container alignItems="center" justify="center" className="login">
      <Grid item md={2} className="login-form">
        <Grid container spacing={4}>
          <Grid item md={12} className="login-text">
            로그인
          </Grid>
          <Grid item md={12}>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values);
                loginUser();
              }}
            >
              {({
                values, errors, touched, handleChange, handleBlur, setFieldValue
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <MyTextField name="email" label="이메일" />
                    </Grid>
                    <Grid item md={12}>
                      <MyTextField name="password" label="비밀번호" />
                    </Grid>
                    <Grid item md={12}>
                      <Button fullWidth type="submit" variant="contained" color="secondary" className="login-button">
                            로그인
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
