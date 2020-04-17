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
  TableFooter,
  withStyles, Button
} from '@material-ui/core';
import axios from 'axios';

function PaymentDetail(props) {
  const [statistic, setStatistic] = useState({});
  const tableHeader = [
    {
      text: '품목',
      align: 'left'
    },
    {
      text: '수량',
      align: 'right'
    },
    {
      text: '단가',
      align: 'right'
    },
    {
      text: '총금액',
      align: 'right'
    },
    {
      text: '진행상황',
      align: 'right'
    },
  ];

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  const StyledTableFooter = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#b8b9f5',
      },
    },
  }))(TableRow);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    footer: {
      fontSize: 16,
      color: '#ffffff'
    }
  }))(TableCell);

  function MyTableRow({
    title,
    count,
    paymentOne,
    paymentAll,
    foundCount
  }) {
    return (
      <StyledTableRow hover>
        <StyledTableCell component="th" scope="row">
          {title}
        </StyledTableCell>
        <StyledTableCell align="right">{count}</StyledTableCell>
        <StyledTableCell align="right">{`${paymentOne}원`}</StyledTableCell>
        <StyledTableCell align="right">{`${paymentAll}원`}</StyledTableCell>
        <StyledTableCell align="right">{`${parseInt(count, 10) - 1}/${count}명`}</StyledTableCell>
      </StyledTableRow>
    );
  }

  function createStatistic(data) {
    const obj = {
      id: data.AD_ID,
      nano: data.AD_INF_NANO,
      micro: data.AD_INF_MICRO,
      macro: data.AD_INF_MACRO,
      mega: data.AD_INF_MEGA,
      celebrity: data.AD_INF_CELEB,
      productName: data.AD_PROD_NAME,
      productPrice: data.AD_PROD_PRICE,
      isPaid: data.AD_PAID,
      influencerCount: data.INF_SUM,
      nanoSum: parseInt(data.AD_INF_NANO, 10) * 10000,
      microSum: parseInt(data.AD_INF_MICRO, 10) * 30000,
      macroSum: parseInt(data.AD_INF_MACRO, 10) * 50000,
      megaSum: parseInt(data.AD_INF_MEGA, 10) * 100000,
      celebritySum: parseInt(data.AD_INF_CELEB, 10) * 200000,
    };

    obj.influenceSum = obj.nanoSum + obj.microSum + obj.macroSum + obj.megaSum + obj.celebritySum;

    setStatistic({ ...obj });
  }

  function getStatistic() {
    axios.get('/api/TB_AD/detail', {
      params: {
        id: props.match.params.id
      }
    })
      .then((res) => {
        createStatistic(res.data.data);
      });
  }

  function paymentDetail(event, id) {
    console.log(id);
    props.history.push(`${props.match.path}${id}`);
  }

  useEffect(() => {
    getStatistic();
  }, []);


  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {tableHeader.map(item => (
                      <StyledTableCell key={item.text} align={item.align}>{item.text}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <MyTableRow title="나노" count={statistic.nano} paymentOne="10000" paymentAll={statistic.nanoSum} />
                  <MyTableRow title="마이크로" count={statistic.micro} paymentOne="30000" paymentAll={statistic.microSum} />
                  <MyTableRow title="메크로" count={statistic.macro} paymentOne="50000" paymentAll={statistic.macroSum} />
                  <MyTableRow title="메가" count={statistic.mega} paymentOne="100000" paymentAll={statistic.megaSum} />
                  <MyTableRow title="셀럽" count={statistic.celebrity} paymentOne="200000" paymentAll={statistic.celebritySum} />
                </TableBody>
                <TableFooter>
                  <StyledTableFooter>
                    <StyledTableCell component="th" scope="row">TOTAL</StyledTableCell>
                    <StyledTableCell align="right" />
                    <StyledTableCell align="right" />
                    <StyledTableCell align="right">
                      {`${statistic.influenceSum}원`}
                    </StyledTableCell>
                    <StyledTableCell align="right" />
                  </StyledTableFooter>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={12}>
            <Grid container justify="center">
              <Grid item md={2}>
                <Button variant="contained" color="secondary" fullWidth onClick={props.goBack}>이전</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
}

export default PaymentDetail;
