import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import StyledTitle from '../../containers/StyledTitle';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledText from '../../containers/StyledText';
import StyledTableRow from '../../containers/StyledTableRow';
import MyPagination from '../../containers/MyPagination';

const tableRows = [
  {
    id: '',
    text: '#',
    align: 'center',
    width: '60px'
  },
  {
    id: 'ADV_NAME',
    text: '이름',
    align: 'left',
  },
  {
    id: 'ADV_EMAIL',
    text: '이메일',
    align: 'left',
  },
  {
    id: 'ADV_TEL',
    text: '전화번호',
    align: 'left',
  },
  {
    id: 'PAY_AMOUNT',
    text: '금액',
    align: 'left'
  },
  {
    text: '날짜',
    align: 'left',
    width: '120px'
  },
];

function Payment(props) {
  const { setMenuIndicator } = props;
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  useEffect(() => setMenuIndicator(6), []);

  function getPayments() {
    axios.get('/api/TB_PAYMENT/list', {
      params: {
        page, limit
      }
    }).then((res) => {
      const { data, paymentCount } = res.data;
      setPayments(data);
      setCount(paymentCount);
    });
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getPayments();
  }, [page]);

  return (
    <Box width={1200} css={{ margin: '0 auto' }}>
      <StyledTitle title="결제 리스트" />
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            { tableRows.map(item => (
              <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                <StyledText
                  color="#ffffff"
                  textAlign="center"
                >
                  {item.text}
                </StyledText>
              </StyledTableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map(item => (
            <StyledTableRow key={item.PAY_ID}>
              <StyledTableCell align="center">
                {item.rowNum}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.ADV_NAME}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.ADV_EMAIL}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.ADV_TEL}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.PAY_AMOUNT}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.PAY_DT}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
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

export default Payment;
