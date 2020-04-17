import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import axios from 'axios';

function PaymentList(props) {
  const [payments, setPayments] = useState([]);
  const tableHeader = [
    {
      text: '회사명',
      align: 'left'
    },
    {
      text: '제품명',
      align: 'right'
    },
    {
      text: '협찬품 가격을',
      align: 'right'
    },
    {
      text: '인플루언서수',
      align: 'right'
    },
    {
      text: '결제상태',
      align: 'right'
    }
  ];

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  function createPayments(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.AD_ID,
        productName: item.AD_PROD_NAME,
        productPrice: item.AD_PROD_PRICE,
        isPaid: item.AD_PAID,
        influencerCount: item.INF_SUM,
        companyName: item.TB_ADVERTISER.ADV_COM_NAME
      })
    ));

    setPayments(array);
  }

  function getPayments() {
    axios.get('/api/TB_AD/getAll')
      .then((res) => {
        createPayments(res.data.data);
      });
  }

  function paymentDetail(event, id) {
    console.log(id);
    props.history.push(`${props.match.path}${id}`);
  }

  useEffect(() => {
    getPayments();
  }, []);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableHeader.map(item => (
                  <StyledTableCell key={item.text} align={item.align}>{item.text}</StyledTableCell>
                ))}
                {/* <StyledTableCell>회사명</StyledTableCell>
                <StyledTableCell align="right">회사명</StyledTableCell>
                <StyledTableCell align="right">전화번호</StyledTableCell>
                <StyledTableCell align="right">가입일차</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map(row => (
                <StyledTableRow
                  hover
                  key={row.id}
                  onClick={event => paymentDetail(event, row.id)}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.productName}</StyledTableCell>
                  <StyledTableCell align="right">{row.productPrice}</StyledTableCell>
                  <StyledTableCell align="right">{row.influencerCount}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.isPaid === 'Y'
                      ? <span style={{ color: 'green' }}>결제완료</span>
                      : <span style={{ color: 'red' }}>결제안됨</span>
                                        }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default PaymentList;
