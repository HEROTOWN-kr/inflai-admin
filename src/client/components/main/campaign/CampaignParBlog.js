import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Grid, Paper, Table, TableContainer, TableBody, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableSortLabel from '../../containers/StyledTableSortLabel';
import StyledTableRow from '../../containers/StyledTableRow';
import StyledText from '../../containers/StyledText';
import StyledLink from '../../containers/StyledLink';
import MyPagination from '../../containers/MyPagination';
import { Colors } from '../../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';
import ConfirmDialog from '../../containers/ConfirmDialog';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '40px'
  },
  {
    text: '이름',
    align: 'center',
    width: '100px'
  },
  {
    text: '방문자(평균)',
    align: 'center',
    width: '80px',
    colName: 'NAV_GUEST_AVG'
  },
  {
    text: '이웃',
    align: 'center',
    width: '80px',
    colName: 'NAV_FLWR'
  },
  {
    text: '게시물',
    align: 'center',
    width: '80px',
    colName: 'NAV_CONT'
  },
  {
    text: '블로그',
    align: 'center',
    width: '50px',
  },
  {
    text: '선정',
    align: 'center',
    width: '50px',
  },
  {
    text: '리뷰',
    align: 'center',
    width: '50px',
  }
];

function CampaignParBlog() {
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [order, setOrder] = useState({ orderBy: 'NAV_FLWR', direction: 'desc' });
  const params = useParams();
  const adId = params.id;
  const limit = 10;

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getListBlog', {
      params: {
        ...order, adId, limit, page
      }
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
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

  useEffect(() => {
    getParticipants();
  }, [order, page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setPage(1);
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  return (
    <Box my={{ xs: 0, sm: 4 }} boxSizing="border-box" maxWidth={1200} css={{ margin: '0 auto' }}>
      {participants.length > 0 ? (
        <React.Fragment>
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
                  <StyledTableRow
                    hover
                    key={row.PAR_ID}
                    onClick={(event) => {}}
                  >
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
                      <StyledText textAlign="center">
                        {row.NAV_GUEST_AVG || '-'}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StyledText textAlign="center">
                        {row.NAV_FLWR || '-'}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StyledText textAlign="center">
                        {row.NAV_CONT || '-'}
                      </StyledText>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.NAV_BLOG_ID ? (
                        <StyledButton
                          background={Colors.green}
                          hoverBackground={Colors.greenHover}
                          height="25px"
                          padding="0px 5px"
                          onClick={() => window.open(`https://blog.naver.com/${row.NAV_BLOG_ID}`, '_blank')}
                        >
                              링크
                        </StyledButton>
                      ) : (
                        <StyledText textAlign="center">-</StyledText>
                      )}
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
        </React.Fragment>
      ) : (
        <StyledText textAlign="center">신청한 인플루언서가 없습니다</StyledText>
      )}
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={toggleConfirmDialog}
        dialogText="선정하시겠습니까?"
        onConfirm={selectParticipant}
      />
    </Box>
  );
}

export default CampaignParBlog;
