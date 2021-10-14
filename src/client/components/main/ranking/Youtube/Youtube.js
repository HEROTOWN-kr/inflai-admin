import React, { useEffect, useState } from 'react';
import {
  Box, Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import MyPagination from '../../../containers/MyPagination';

const tableRows = {
  title: [
    {
      text: '#',
      align: 'center',
      width: '60px'
    },
    {
      text: '이름',
      align: 'left'
    },
    {
      text: '구독수',
      align: 'center',
      width: '100px'
    },
    {
      text: '보기수',
      align: 'center',
      width: '100px'
    }
  ],
  body: ['rownum', 'INF_NAME', 'YOU_SUBS', 'YOU_VIEWS']
};

function Youtube(props) {
  const { setTab } = props;
  const [influencers, setInfluencers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setTab(1), []);

  function getInfluencers() {
    axios.get('/api/TB_YOUTUBE/', {
      params: { page }
    }).then(
      (res) => {
        const { list, dbCount } = res.data.data;
        setInfluencers(list);
        setCount(dbCount);
      }
    );
  }

  useEffect(() => {
    getInfluencers();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box maxWidth={1276} m="0 auto">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              { tableRows.title.map(item => (
                <StyledTableCell
                  key={item.text}
                  align={item.align}
                  width={item.width}
                >
                  {item.text}
                </StyledTableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map(row => (
              <StyledTableRow hover key={row.YOU_ID}>
                <StyledTableCell align="center">
                  {row.rownum}
                </StyledTableCell>
                <StyledTableCell>
                  {row.TB_INFLUENCER.INF_NAME}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.YOU_SUBS}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.YOU_VIEWS}
                </StyledTableCell>
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

export default Youtube;
