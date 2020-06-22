import React, { useEffect, useState } from 'react';
import { Button, Grid, Divider } from '@material-ui/core';
import axios from 'axios';

function RequestDetail(props) {
  const [requestData, setRequestData] = useState({});

  function getStatistic() {
    axios.get('/api/TB_REQ_AD/detail', {
      params: {
        id: props.match.params.id
      }
    }).then((res) => {
      const { data } = res.data;
      setRequestData(data);
    });
  }


  useEffect(() => {
    getStatistic();
  }, []);

  return (
    <div className="request-detail">
      <Grid container spacing={5}>
        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <div className="label-holder">
                <label htmlFor="companyName">업체명</label>
              </div>
              <div className="text-holer">
                {requestData.REQ_COMP_NAME}
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="label-holder">
                <label htmlFor="companyName">담당자명</label>
              </div>
              <div className="text-holer">
                {requestData.REQ_NAME}
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="label-holder">
                <label htmlFor="companyName">이메일</label>
              </div>
              <div className="text-holer">
                {requestData.REQ_EMAIL}
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="label-holder">
                <label htmlFor="companyName">연락처</label>
              </div>
              <div className="text-holer">
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
          <div className="text-holer">
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
          <div className="text-holer">
            {requestData.REQ_AIM}
          </div>
        </Grid>
        <Grid item md={12}>
          <Divider />
        </Grid>
        <Grid item md={12}>
          <div className="label-holder">
            <label htmlFor="companyName">집행 가능 예산</label>
          </div>
          <div className="text-holer">
            {requestData.REQ_BUDJET}만원
          </div>
        </Grid>
        <Grid item md={12}>
          <Divider />
        </Grid>
        <Grid item md={12}>
          <div className="label-holder">
            <label htmlFor="companyName">추가로 원하는 상담분야</label>
          </div>
          <div className="text-holer">
            {requestData.REQ_CONSULT}
          </div>
        </Grid>
        <Grid item md={12}>
          <Divider />
        </Grid>
        <Grid item md={12}>
          <div className="label-holder">
            <label htmlFor="companyName">기타사항</label>
          </div>
          <div className="text-holer">
            {requestData.REQ_OTHER}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default RequestDetail;
