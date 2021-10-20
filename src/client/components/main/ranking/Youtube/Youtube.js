import React, { useEffect, useState } from 'react';
import {
  Box, Grid, IconButton, MuiThemeProvider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment, Icon
} from '@material-ui/core';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { AssessmentRounded } from '@material-ui/icons/';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@material-ui/icons/Search';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import MyPagination from '../../../containers/MyPagination';
import AnalysisDialog from './AnalysisDialog';
import StyledIconButton from '../../../containers/StyledIconButton';
import StyledTableSortLabel from '../../../containers/StyledTableSortLabel';
import ReactFormText from '../../../containers/ReactFormText';

const useStyles = makeStyles({
  root: {
    background: '#ffffff'
  },
  endAdornment: {
    padding: '0'
  },
});

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
      id: 'YOU_SUBS',
      text: '구독수',
      align: 'center',
      width: '100px'
    },
    {
      id: 'YOU_VIEWS',
      text: '조회수',
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
  const [searchWord, setSearchWord] = useState('');
  const [order, setOrder] = useState({ orderBy: 'YOU_SUBS', direction: 'desc' });
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { searchValue: '' }
  });

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

  function searchFunc(data) {
    const { searchValue } = data;
    setPage(1);
    setSearchWord(searchValue);
  }


  function getInfluencers() {
    axios.get('/api/TB_YOUTUBE/', {
      params: {
        ...order, searchWord, page
      }
    }).then((res) => {
      const { list, dbCount } = res.data.data;
      setInfluencers(list);
      setCount(dbCount);
    });
  }

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }


  useEffect(() => setTab(1), []);

  useEffect(() => {
    getInfluencers();
  }, [order, searchWord, page]);


  return (
    <Box maxWidth={1276} m="0 auto">
      <Box width={280} mb={1}>
        <ReactFormText
          register={register}
          errors={errors}
          name="searchValue"
          placeholder="검색"
          InputProps={{
            classes: { root: classes.root, adornedEnd: classes.endAdornment },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit(searchFunc)}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              handleSubmit(searchFunc)();
            }
          }}
        />
      </Box>
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
                  { item.id ? (
                    <Grid container justify="center">
                      <Grid item>
                        <StyledTableSortLabel
                          id={item.id}
                          color="#66f8ff"
                          active={order.orderBy === item.id}
                          direction={order.orderBy === item.id ? order.direction : 'desc'}
                          onClick={() => sortTable(item.id)}
                        >
                          {item.text}
                        </StyledTableSortLabel>
                      </Grid>
                    </Grid>
                  ) : item.text }
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
