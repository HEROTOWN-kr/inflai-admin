import React, { useEffect, useState } from 'react';
import {
  Box, Button, Grid, TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import axios from 'axios';
import MyTextField from '../../containers/MyTextField';

function Settings() {
  const [prices, setPrices] = useState({
    nano: '',
    micro: '',
    macro: '',
    mega: '',
    celebrity: '',
  });

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

  return (
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
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <MyTextField
                              name={item.value}
                              label={item.name}
                              ph="0"
                              eA="원"
                            />
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
  );
}

export default Settings;
