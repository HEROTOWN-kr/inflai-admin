import React, { useEffect, useState } from 'react';
import {
  Grid,
  MenuItem,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import StyledSelect from '../../containers/StyledSelect';
import StyledTitle from '../../containers/StyledTitle';
import Instagram from './Instagram';
import Youtube from './Youtube';
import FormikContainer from '../../containers/FormikContainer';
import MyTextField from '../../containers/MyTextField';

function Ranking(props) {
  const [blogType, setBlogType] = useState('1');
  const [searchWord, setSearchWord] = useState('');

  const { setMenuIndicator } = props;
  useEffect(() => setMenuIndicator(4), []);

  function searchFunc(data) {
    setSearchWord(data);
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <StyledTitle title="인플루언서 랭킹" />
      </Grid>
      <Grid item xs={7} xl={8}>
        <Grid container justify="space-between">
          <Grid item>
            <StyledSelect
              value={blogType}
              variant="outlined"
              onChange={(event => setBlogType(event.target.value))}
            >
              <MenuItem value="1">Instagram</MenuItem>
              <MenuItem value="2">Youtube</MenuItem>
            </StyledSelect>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{ search: '' }}
              enableReinitialize
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Form>
                  <MyTextField
                    name="search"
                    label=""
                    eA={SearchIcon}
                    clickFunc={searchFunc}
                    onEnter={searchFunc}
                    ph="검색"
                  />
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        {
          blogType === '1' ? <Instagram searchWord={searchWord} /> : <Youtube />
        }
      </Grid>
    </Grid>
  );
}

export default Ranking;
