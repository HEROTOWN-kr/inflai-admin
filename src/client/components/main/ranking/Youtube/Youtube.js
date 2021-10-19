import React, { useEffect, useState } from 'react';
import {
  Box, Grid, IconButton, MuiThemeProvider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { AssessmentRounded } from '@material-ui/icons/';
import { createMuiTheme } from '@material-ui/core/styles';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import MyPagination from '../../../containers/MyPagination';
import AnalysisDialog from './AnalysisDialog';
import StyledIconButton from '../../../containers/StyledIconButton';

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
      text: '채널 이름',
      align: 'left',
      width: '250px'
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
    },
    {
      text: '분석결과',
      align: 'center',
      width: '100px'
    }
  ],
  body: ['rownum', 'INF_NAME', 'YOU_SUBS', 'YOU_VIEWS']
};

function Youtube(props) {
  const { setTab } = props;
  const [youtubeId, setYoutubeId] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const changePage = (event, value) => {
    setPage(value);
  };

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function getAnalysis(id) {
    setYoutubeId(id);
    toggleDialog();
  }


  function getInfluencers() {
    axios.get('/api/TB_YOUTUBE/', {
      params: { page }
    }).then((res) => {
      const { list, dbCount } = res.data.data;
      setInfluencers(list);
      setCount(dbCount);
    });
  }

  useEffect(() => setTab(1), []);

  useEffect(() => {
    getInfluencers();
  }, [page]);


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
                  {row.INF_NAME}
                </StyledTableCell>
                <StyledTableCell>
                  {row.YOU_NAME}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.YOU_SUBS}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.YOU_VIEWS}
                </StyledTableCell>
                <StyledTableCell padding="2px" align="center">
                  <StyledIconButton onClick={() => getAnalysis(row.YOU_ID)}>
                    <AssessmentRounded />
                  </StyledIconButton>
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
      <AnalysisDialog
        open={dialogOpen}
        closeDialog={toggleDialog}
        id={youtubeId}
      />
    </Box>
  );
}

export default Youtube;
