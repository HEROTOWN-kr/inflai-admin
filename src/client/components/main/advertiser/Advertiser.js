import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Grid,
  Box
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import MyPagination from '../../containers/MyPagination';


function Advertiser(props) {
  const [advertisers, setAdvertisers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(1);
  const { setMenuIndicator } = props;

  function createAdvertisers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.ADV_ID,
        name: item.ADV_NAME,
        email: item.ADV_EMAIL,
        phoneNumber: item.ADV_TEL,
        companyName: item.ADV_COM_NAME,
        companyType: item.ADV_TYPE,
        registerDate: item.ADV_DT,
      })
    ));

    setAdvertisers(array);
  }

  function getAdvertisers() {
    axios.get('/api/TB_ADVERTISER/getAdvertisers', {
      params: {
        page
      }
    }).then((res) => {
      const { rows, count } = res.data.data;
      createAdvertisers(rows);
      setCount(count);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getAdvertisers();
  }, [page]);

  useEffect(() => setMenuIndicator(1), []);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box width={1200} css={{ margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>이름</StyledTableCell>
              <StyledTableCell align="right">이메일</StyledTableCell>
              <StyledTableCell align="right">전화번호</StyledTableCell>
              <StyledTableCell align="right">회사&nbsp;명</StyledTableCell>
              <StyledTableCell align="right">기업구분</StyledTableCell>
              <StyledTableCell align="right">가입일차</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advertisers.map(row => (
              <StyledTableRow hover key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align="right">{row.companyName}</StyledTableCell>
                <StyledTableCell align="right">{row.companyType}</StyledTableCell>
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

export default Advertiser;
