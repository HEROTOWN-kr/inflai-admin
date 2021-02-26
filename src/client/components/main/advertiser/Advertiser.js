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
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../../img/default_account_image.png';


function Advertiser(props) {
  const [advertisers, setAdvertisers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const { setMenuIndicator } = props;
  const limit = 10;

  function createAdvertisers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.ADV_ID,
        rownum: item.rownum,
        name: item.ADV_NAME,
        photo: item.ADV_PHOTO,
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
      params: { page, limit }
    }).then((res) => {
      const { data, AdvertiserCount } = res.data;
      createAdvertisers(data);
      setCount(AdvertiserCount);
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
              <StyledTableCell align="center" width="40px">번호</StyledTableCell>
              <StyledTableCell>정보</StyledTableCell>
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
                <StyledTableCell align="center">{row.rownum}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <StyledImage
                        width="40px"
                        height="40px"
                        borderRadius="100%"
                        src={row.photo || defaultAccountImage}
                      />
                    </Grid>
                    <Grid item>{row.name}</Grid>
                  </Grid>
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
              perPage={limit}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Advertiser;
