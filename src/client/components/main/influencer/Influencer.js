import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  TextField, Button
} from '@material-ui/core';
import axios from 'axios';
import {
  Field, Form, Formik, FormikProps, getIn, FieldProps, ErrorMessage, useField
} from 'formik';

function Influencer() {
  const [influencers, setInfluencers] = useState([]);
  const [prices, setPrices] = useState({
    nano: '',
    micro: '',
    macro: '',
    mega: '',
    celebrity: '',
  });

  function getPrices() {
    axios.get('/api/TB_PRICE/').then((res) => {
      console.log(res.data.data);
      const { data } = res.data;
      setPrices({
        nano: data[0].PRC_NANO,
        micro: data[0].PRC_MICRO,
        macro: data[0].PRC_MACRO,
        mega: data[0].PRC_MEGA,
        celebrity: data[0].PRC_CELEBRITY
      });
    });
  }

  useEffect(() => {
    getPrices();
  }, []);

  const category = [
    {
      name: '나노',
      value: 'nano'
    },
    {
      name: '마이크로',
      value: 'micro'
    },
    {
      name: '메크로',
      value: 'macro'
    },
    {
      name: '메가',
      value: 'mega'
    },
    {
      name: '셀럽',
      value: 'celebrity'
    },
  ];

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.INF_ID,
        name: item.INF_NAME,
        email: item.INF_EMAIL,
        phoneNumber: item.INF_TEL,
        registerDate: item.INF_DT,
        social: item.INF_BLOG_TYPE
      })
    ));

    setInfluencers(array);
  }

  function getInfluencers() {
    axios.get('/api/TB_INFLUENCER/getInfluencers').then((res) => {
      createInfluencers(res.data.data);
    });
  }

  useEffect(() => {
    getInfluencers();
  }, []);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>이름</StyledTableCell>
                <StyledTableCell align="right">이메일</StyledTableCell>
                <StyledTableCell align="right">전화번호</StyledTableCell>
                <StyledTableCell align="right">소셜</StyledTableCell>
                <StyledTableCell align="right">가입일차</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influencers.map(row => (
                <StyledTableRow hover key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="right">{row.social}</StyledTableCell>
                  <StyledTableCell align="right">{row.registerDate}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            인플루언서 1인단 서비스비
          </Grid>
          <Grid item xs={4}>
            <Box p={4} className="select-price">
              <Formik
                initialValues={prices}
                enableReinitialize
                // validationSchema={{}}
                onSubmit={((values) => {
                  axios.post('/api/TB_PRICE/', values).then((res) => {
                    if (res.data.code === 200) {
                      console.log(res);
                    } else if (res.data.code === 400) {
                      console.log(res);
                    } else {
                      console.log(res);
                    }
                  }).catch(error => (error));
                })}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldTouched,
                  submitForm
                }) => (
                  <Grid container spacing={2}>
                    {category.map(item => (
                      <Grid key={item.name} item xs={12}>
                        <Grid container justify="space-between" alignItems="center">
                          <Grid item className="influencer-type">
                            {item.name}
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <TextField
                                  name={item.value}
                                  value={values[item.value]}
                                  onChange={handleChange}
                                  className="counter"
                                  placeholder="0"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item className="influencer-type">
                                원
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid container justify="center" item xs={12}>
                      <Grid item>
                        <Button variant="contained" color="secondary" onClick={submitForm}>저장</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Influencer;
