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
import InstaInsightDialog from './InstaInsightDialog';
import HistoryDialog from './HistoryDialog';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '60px'
  },
  {
    text: '이름',
    align: 'center'
  },
  {
    text: '인스타계정',
    align: 'center'
  },
  {
    text: '팔로워수',
    align: 'center',
    colName: 'INS_FLWR'
  },
  {
    text: '평균좋아요수',
    align: 'center',
    colName: 'INS_LIKES',
  },
  {
    text: '평균댓글수',
    align: 'center',
    colName: 'INS_CMNT',
  },
  {
    text: 'AI 종합 점수',
    align: 'center',
    colName: 'INS_SCORE',
  },
  {
    text: '순위',
    align: 'center',
    width: '100px',
    colName: 'INS_RANK',
  },
  {
    text: '소통지수',
    align: 'center',
    width: '50px',
  },
  {
    text: '히스토리',
    align: 'center',
    width: '50px',
  },
  {
    text: '요약',
    align: 'center',
    width: '50px',
  },
  {
    text: '분석',
    align: 'center',
    width: '50px',
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

function RoundLikeComment(likeCount, commentsCount) {
  const likeToComment = (commentsCount / likeCount) * 100;
  return likeToComment.toFixed(1);
}

function CampaignParInsta() {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });
  const classes = useStyles();
  const params = useParams();
  const adId = params.id;
  const limit = 10;

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleInstaDialog() {
    setInstaDialogOpen(!instaDialogOpen);
  }

  function toggleHistoryDialog() {
    setHistoryDialogOpen(!historyDialogOpen);
  }

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    const resParams = {
      ...order, adId, limit, page
    };
    if (selected) resParams.selected = '1';

    axios.get('/api/TB_PARTICIPANT/getListInsta', {
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
    let isDesc = order.orderBy === id && order.direction === 'desc';
    if (order.orderBy !== 'INS_RANK' && id === 'INS_RANK') isDesc = true;
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

  function clickInfo(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  function clickInstaInfo(id) {
    setSelectedId(id);
    toggleInstaDialog();
  }

  function clickHistory(id) {
    setSelectedId(id);
    toggleHistoryDialog();
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
                  <StyledText textAlign="center">
                    {row.rownum}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.PAR_NAME || '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.INS_USERNAME ? (
                    <StyledLink
                      href={`https://www.instagram.com/${row.INS_USERNAME}/`}
                      target="_blank"
                    >
                      {`@${row.INS_USERNAME}`}
                    </StyledLink>
                  ) : (
                    <StyledText textAlign="center">-</StyledText>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_FLWR || '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_LIKES || '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_CMNT || '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_SCORE || '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_RANK || '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {RoundLikeComment(row.INS_LIKES, row.INS_CMNT)}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickHistory(row.INF_ID)}
                  >
                    체크
                  </StyledButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickInfo(row.INF_ID)}
                  >
                     요약
                  </StyledButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickInstaInfo(row.INF_ID)}
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
      <InsightDialog open={dialogOpen} closeDialog={toggleDialog} selectedId={selectedId} />
      <InstaInsightDialog open={instaDialogOpen} handleClose={toggleInstaDialog} INS_ID={selectedId} />
      <HistoryDialog open={historyDialogOpen} closeDialog={toggleHistoryDialog} INF_ID={selectedId} />
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
