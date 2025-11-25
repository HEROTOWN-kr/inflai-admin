import React, { useEffect, useState } from 'react';
import {
  Box, IconButton, Table, TableBody, TableHead, TableRow, Typography, Grid
} from '@material-ui/core';
import axios from 'axios';
import { Delete, Edit } from '@material-ui/icons';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledText from '../../../containers/StyledText';
import StyledTableRow from '../../../containers/StyledTableRow';
import { Colors } from '../../../../lib/Сonstants';
import MyPagination from '../../../containers/MyPagination';

const tableRows = [
  {
    text: '#',
    align: 'center',
    width: '60px'
  },
  {
    text: '코드',
    align: 'left',
    width: '200px'
  },
  {
    text: '사용여부',
    align: 'left',
    width: '100px'
  },
  {
    text: '플랜',
    align: 'left',
  },
  {
    text: '사용여부',
    align: 'left',
    width: '100px'
  },
];

function Coupon(props) {
  const [coupons, setCoupons] = useState([]);
  const [couponsCount, setCouponsCount] = useState(0);
  const [page, setPage] = useState(1);

  function getCoupons() {
    axios.get('/api/TB_COUPON/list', {
      params: { page }
    }).then((res) => {
      const { data, count } = res.data;
      setCoupons(data);
      setCouponsCount(count);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    getCoupons();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box ml="50px">
      <Typography variant="h5" paragraph>쿠폰 리스트</Typography>
      <Box width={600}>
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
            {coupons.map(item => (
              <StyledTableRow key={item.COU_ID}>
                <StyledTableCell align="center">
                  {item.rowNum}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.COU_CODE}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center" color={item.COU_USED === 'N' ? Colors.green : Colors.red}>
                    {item.COU_USED === 'N' ? '가능' : '불가능'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.PLN_NAME}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.COU_DT}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Box pt={4}>
          <Grid container justify="center">
            <Grid item>
              <MyPagination
                itemCount={couponsCount}
                page={page}
                changePage={changePage}
                perPage={10}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Coupon;
