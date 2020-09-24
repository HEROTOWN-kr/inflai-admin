import React, { useEffect, useState } from 'react';
import {
  Grid,
  MenuItem,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import StyledSelect from '../../containers/StyledSelect';
import StyledTitle from '../../containers/StyledTitle';
import Instagram from './Instagram';
import Youtube from './Youtube';
import FormikContainer from '../../containers/FormikContainer';
import MyTextField from '../../containers/MyTextField';
import StyledText from '../../containers/StyledText';

function Ranking(props) {
  const [blogType, setBlogType] = useState('1');
  const [searchWord, setSearchWord] = useState('');
  const [updateTime, setUpdateTime] = useState('');

  const { setMenuIndicator } = props;
  useEffect(() => setMenuIndicator(4), []);

  async function getUpdateData() {
    const InstaData = await axios.get('/api/TB_ADMIN/getUpdateDate');
    const { ADM_UPDATE_DT } = InstaData.data.data;
    const updateDate = new Date(ADM_UPDATE_DT);

    const Year = updateDate.getFullYear();
    const Month = (`0${updateDate.getMonth() + 1}`).slice(-2);
    const Day = (`0${updateDate.getDate()}`).slice(-2);
    const Hours = (`0${updateDate.getHours()}`).slice(-2);
    const Minutes = (`0${updateDate.getMinutes()}`).slice(-2);
    const Seconds = (`0${updateDate.getSeconds()}`).slice(-2);

    const myDate = [Year, Month, Day].join('-');
    const Time = [Hours, Minutes, Seconds].join(':');
    const fullDate = `${myDate} ${Time}`;

    setUpdateTime(fullDate);
  }

  useEffect(() => {
    getUpdateData();
  }, []);

  function searchFunc(data) {
    setSearchWord(data);
  }


  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <StyledTitle title="인플루언서 랭킹" />
      </Grid>
      <Grid item xs={7} xl={8}>
        <Grid container justify="space-between" alignItems="flex-end">
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
                // console.log(values);
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
          <Grid item>
            <StyledText
              color="#b9b9b9"
              fontSize="14px"
            >
              {`최근 업데이트: ${updateTime}`}
            </StyledText>
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
