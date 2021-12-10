import React, { useEffect, useState } from 'react';
import {
  Box, Checkbox, FormControlLabel, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import StyledText from '../../containers/StyledText';
import MyPagination from '../../containers/MyPagination';
import StyledLink from '../../containers/StyledLink';
import StyledTableSortLabel from '../../containers/StyledTableSortLabel';
import StyledButton from '../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import InsightDialog from './InsightDialog';
import ConfirmDialog from '../../containers/ConfirmDialog';
import AnalysisDialog from '../ranking/Youtube/AnalysisDialog';

const tableHeader = [
  {
    text: '번호',
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
    width: '300px'
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
    text: '분석',
    align: 'center',
    width: '60px',
  },
  {
    text: '선정',
    align: 'center',
    width: '60px',
  },
  {
    text: '리뷰',
    align: 'center',
    width: '60px',
  }
];

const useStyles = makeStyles({
  checkboxLabel: {
    marginRight: 0
  }
});

function CampaignParInsta() {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: 'YOU_SUBS', direction: 'desc' });
  const classes = useStyles();
  const params = useParams();
  const adId = params.id;
  const limit = 10;

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    const resParams = {
      ...order, adId, limit, page
    };
    if (selected) resParams.selected = '1';

    axios.get('/api/TB_PARTICIPANT/getListYoutube', {
      params: resParams
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
    });
  }

  useEffect(() => {
    getParticipants();
  }, [order, page, selected]);

  const changePage = (event, value) => {
    setPage(value);
  };

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }

  function selectParticipant() {
    axios.post('/api/TB_PARTICIPANT/change', { adId, participantId: selectedId }).then((res) => {
      if (res.status === 201) {
        alert(res.data.message);
      } else {
        getParticipants();
      }
    }).catch(err => alert(err.response.data.message));
  }

  function getAnalysis(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  return (
    <Box mb={1} boxSizing="border-box" maxWidth={1276} css={{ margin: '0 auto' }}>
      <Box mb={1}>
        <Grid container justify="flex-end">
          <Grid item>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={selected}
                  onChange={() => setSelected(!selected)}
                  name="checkedB"
                  color="secondary"
                />
                            )}
              label="선정자"
              classes={{ root: classes.checkboxLabel }}
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map(item => (
                <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                  {item.colName ? (
                    <StyledTableSortLabel
                      color="#66f8ff"
                      active={order.orderBy === item.colName}
                      direction={order.orderBy === item.colName ? order.direction : 'desc'}
                      onClick={() => sortTable(item.colName)}
                    >
                      {item.text}
                    </StyledTableSortLabel>
                  ) : item.text}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map(row => (
              <StyledTableRow hover key={row.id}>
                <StyledTableCell align="center">
                  {row.rownum}
                </StyledTableCell>
                <StyledTableCell>
                  {row.PAR_NAME || '-'}
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
                <StyledTableCell align="center">
                  <StyledButton
                    height="25px"
                    padding="0px 5px"
                    onClick={() => getAnalysis(row.YOU_ID)}
                  >
                    분석
                  </StyledButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.PAR_STATUS === '1' ? (
                    <StyledButton
                      background={Colors.green}
                      hoverBackground={Colors.greenHover}
                      height="25px"
                      padding="0px 5px"
                      onClick={() => clickSelect(row.PAR_ID)}
                    >
                                            선정
                    </StyledButton>
                  ) : (
                    <StyledText color={Colors.green}>선정됨</StyledText>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.PAR_REVIEW ? (
                    <StyledButton
                      background={Colors.green}
                      hoverBackground={Colors.greenHover}
                      height="25px"
                      padding="0px 5px"
                      onClick={() => window.open(row.PAR_REVIEW, '_blank')}
                    >
                                            링크
                    </StyledButton>
                  ) : null}
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
              perPage={limit}
            />
          </Grid>
        </Grid>
      </Box>
      <AnalysisDialog open={dialogOpen} closeDialog={toggleDialog} id={selectedId} />
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={toggleConfirmDialog}
        dialogText="선정하시겠습니까?"
        onConfirm={selectParticipant}
      />
    </Box>
  );
}

export default CampaignParInsta;
