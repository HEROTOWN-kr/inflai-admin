import React, { useEffect, useState } from 'react';
import '../../css/sub.scss';
import { Grid, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MyTextField from '../containers/MyTextField';

function Login({
  changeUser,
  user,
  history
}) {
  const [error, setError] = useState('');

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .required('이메일을 입력해주세요'),
    password: Yup.string()
      .required('비밀번호를 입력해주세요'),
  });

  useEffect(() => {
    user.token ? history.push('/Main') : history.push('/Login');
  }, []);

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
                axios.post('/api/TB_ADMIN/login', values)
                  .then((res) => {
                    if (res.data.code === 200) {
                      changeUser({ token: res.data.token });
                    } else if (res.data.code === 400) {
                      setError(res.data.message);
                    } else {
                      console.log(res);
                    }
                  })
                  .catch(error => (error));
              }}
            >
              {() => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <div className="error-message center">{error}</div>
                    </Grid>
                    <Grid item md={12}>
                      <MyTextField name="email" label="아이디" />
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
