import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import MyPagination from '../../containers/MyPagination';

function RequestList(props) {
  const {
    influencers, setInfluencers, count, setCount, page, setPage, history, match
  } = props;

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.REQ_ID,
        name: item.REQ_NAME,
        brand: item.REQ_BRAND,
        phoneNumber: item.REQ_TEL,
        registerDate: item.REQ_DT,
        companyName: item.REQ_COMP_NAME,
        advertiserName: item.TB_ADVERTISER.ADV_NAME
      })
    ));

    setInfluencers(array);
  }

  function getInfluencers() {
    axios.get('/api/TB_REQ_AD/', {
      params: {
        page
      }
    }).then((res) => {
      const { rows, count } = res.data.data;
      createInfluencers(rows);
      setCount(count);
    });
  }

  useEffect(() => {
    getInfluencers();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  function requestDetail(event, id) {
    history.push(`${match.path}${id}`);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>브랜드명(제품명)</StyledTableCell>
              <StyledTableCell align="right">업체명</StyledTableCell>
              <StyledTableCell align="right">담당자명</StyledTableCell>
              <StyledTableCell align="right">전화번호</StyledTableCell>
              <StyledTableCell align="right">가입일차</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map(row => (
              <StyledTableRow
                hover
                key={row.id}
                onClick={event => requestDetail(event, row.id)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.brand}
                </StyledTableCell>
                <StyledTableCell align="right">{row.companyName}</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
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
    </>
  );
}

export default RequestList;
