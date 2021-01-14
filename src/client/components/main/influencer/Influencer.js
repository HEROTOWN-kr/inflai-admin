import React, { useEffect, useState } from 'react';
import {
  Box,
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
import MyPagination from '../../containers/MyPagination';

function Influencer(props) {
  const [influencers, setInfluencers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const { setMenuIndicator } = props;
  const limit = 10;
  useEffect(() => setMenuIndicator(2), []);

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.INF_ID,
        rownum: item.rownum,
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
    axios.get('/api/TB_INFLUENCER/getInfluencers', {
      params: {
        page, limit
      }
    }).then((res) => {
      const { data, InfluencerCount } = res.data;
      createInfluencers(data);
      setCount(InfluencerCount);
    });
  }

  useEffect(() => {
    getInfluencers();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box width={1200} css={{ margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width="40px">번호</StyledTableCell>
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
                <StyledTableCell align="center">{row.rownum}</StyledTableCell>
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
      <Box py={4}>
        <Grid container justify="center">
          <Grid item>
            <MyPagination
              itemCount={count}
              page={page}
              changePage={changePage}
              perPage={10}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Influencer;
