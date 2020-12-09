import React, { useEffect, useState } from 'react';
import {
  Button, Grid, Divider, CircularProgress, Box, Paper
} from '@material-ui/core';
import axios from 'axios';
import nameArray from '../../../lib/nameArray';

function RequestDetail(props) {
  const { history, match } = props;
  const [requestData, setRequestData] = useState({});
  const [process, setProcess] = useState(true);
  const aimArray = nameArray.aim();
  const consultArray = nameArray.consult();

  function getStatistic() {
    axios.get('/api/TB_REQ_AD/detail', {
      params: {
        id: match.params.id
      }
    }).then((res) => {
      const { data } = res.data;
      setRequestData(data);
      setProcess(false);
    });
  }

  useEffect(() => {
    getStatistic();
  }, []);

  function getText(array, value) {
    let text = '';
    array.map((item) => {
      if (item.value === value) {
        text = item.text;
      }
    });
    return text;
  }

  return (
    <Box mt={4} p={4} component={Paper} width={780} css={{ margin: '0 auto', boxSizing: 'border-box' }}>
      <div className="request-detail data-form">
        {process ? (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={5}>
            <Grid item md={12}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <div className="label-holder">
                    <label htmlFor="companyName">업체명</label>
                  </div>
                  <div className="text-holder">
                    {requestData.REQ_COMP_NAME}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="label-holder">
                    <label htmlFor="companyName">담당자명</label>
                  </div>
                  <div className="text-holder">
                    {requestData.REQ_NAME}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="label-holder">
                    <label htmlFor="companyName">이메일</label>
                  </div>
                  <div className="text-holder">
                    {requestData.REQ_EMAIL}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="label-holder">
                    <label htmlFor="companyName">연락처</label>
                  </div>
                  <div className="text-holder">
                    {requestData.REQ_TEL}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <div className="label-holder">
                <label htmlFor="companyName">브랜드명(제품명)</label>
              </div>
              <div className="text-holder">
                {requestData.REQ_BRAND}
              </div>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <div className="label-holder">
                <label htmlFor="companyName">캠페인 목적</label>
              </div>
              <div className="text-holder">
                <ul>
                  {requestData.REQ_AIM.map(item => (
                    <li key={item}>{getText(aimArray, item)}</li>
                  ))}
                </ul>
              </div>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <div className="label-holder">
                <label htmlFor="companyName">집행 가능 예산</label>
              </div>
              <div className="text-holder">
                {requestData.REQ_BUDJET}
                만원
              </div>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <div className="label-holder">
                <label htmlFor="companyName">추가로 원하는 상담분야</label>
              </div>
              <div className="text-holder">
                <ul>
                  {requestData.REQ_CONSULT.map(item => (
                    <li key={item}>{getText(consultArray, item)}</li>
                  ))}
                </ul>
              </div>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <div className="label-holder">
                <label htmlFor="companyName">기타사항</label>
              </div>
              <div className="text-holder">
                {requestData.REQ_OTHER}
              </div>
            </Grid>
            <Grid container justify="center" item md={12}>
              <Grid item md={3}>
                <Button
                  fullWidth
                  className="button-create"
                  variant="contained"
                  onClick={event => console.log(match.params.id)}
                >
                  등록
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </Box>

  );
}

export default RequestDetail;
