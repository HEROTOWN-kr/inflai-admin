import React, { useEffect, useState } from 'react';
import '../../css/sub.scss';
import { Grid, Button, Box } from '@material-ui/core';
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
    if (!user.token) {
      history.push('/Login');
    } else {
      history.push('/Dashboard');
    }
  }, [user]);

  return (
    <Grid container className="login" alignItems="center" justify="center">
      <Grid item>
        <Box
          width="320px"
          boxSizing="border-box"
          p={6}
          border="2px solid #f50057"
          borderRadius="3%"
        >
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
            {({
              submitForm
            }) => (
              <Grid container spacing={4}>
                <Grid item xs={12} className="login-text">
                                로그인
                </Grid>
                <Grid item xs={12}>
                  <Form>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <div className="error-message center">{error}</div>
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextField name="email" label="아이디" />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextField
                          name="password"
                          type="password"
                          label="비밀번호"
                          onEnter={submitForm}
                        />
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className="login-button"
                    onClick={submitForm}
                  >
                                    로그인
                  </Button>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
