import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import StyledTitle from '../../containers/StyledTitle';
import StyledText from '../../containers/StyledText';
import StyledTableCell from '../../containers/StyledTableCell';
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
    id: 'PLN_NAME',
    text: '플랜',
    align: 'left'
  },
  {
    id: 'PLN_START_DATE',
    text: '시작 날짜',
    align: 'left'
  },
  {
    id: 'PLN_FINISH_DATE',
    text: '마감 날짜',
    align: 'left'
  },
  {
    id: 'PLN_STATE',
    text: '상태',
    align: 'left'
  },
];

function SubscriptionList(props) {
  const [subscribeData, setSubscribeData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);


  function getSubscribtions() {
    axios.get('/api/TB_SUBSCRIPTION/list', {
      params: { page }
    }).then((res) => {
      const { data, countRes } = res.data;
      const subscribeArray = data.map((item) => {
        const {
          SUB_ID, SUB_START_DT, SUB_END_DT, SUB_STATUS, TB_PLAN, TB_ADVERTISER, rowNum
        } = item;
        const { PLN_NAME } = TB_PLAN;
        const { ADV_NAME } = TB_ADVERTISER;
        return {
          id: SUB_ID,
          advertiserName: ADV_NAME,
          planName: PLN_NAME,
          startDate: SUB_START_DT,
          finishDate: SUB_END_DT,
          status: SUB_STATUS,
          rowNum
        };
      });
      setSubscribeData(subscribeArray);
      setCount(countRes);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    getSubscribtions();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box width={1200} css={{ margin: '0 auto' }}>
      <StyledTitle title="서브스크립션 리스트" />
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              tableRows.map(item => (
                <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                  <StyledText
                    color="#ffffff"
                    textAlign="center"
                  >
                    {item.text}
                  </StyledText>
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribeData.map(item => (
            <StyledTableRow>
              <StyledTableCell align="center">
                {item.rowNum}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.advertiserName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.planName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.startDate}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.finishDate}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.status}
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
              perPage={5}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SubscriptionList;
