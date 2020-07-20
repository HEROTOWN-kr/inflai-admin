import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import { Formik } from 'formik';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function Influencer() {
  const [influencers, setInfluencers] = useState([]);

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

  return (
    <Grid container justify="center">
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
  );
}

export default Influencer;
