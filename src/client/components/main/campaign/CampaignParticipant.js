import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import StyledText from '../../containers/StyledText';
import MyPagination from '../../containers/MyPagination';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '40px'
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
    align: 'center'
  },
  {
    text: '평균좋아요수',
    align: 'center'
  },
  {
    text: '평균댓글수',
    align: 'center'
  },
  {
    text: '점수',
    align: 'center'
  },
  {
    text: '순위',
    align: 'center',
    width: '100px'
  }
];

function CampaignParticipant() {
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const params = useParams();
  const history = useHistory();
  const adId = params.id;
  const limit = 10;

  function getCampaigns() {
    axios.get('/api/TB_PARTICIPANT/getListInsta', {
      params: {
        adId, limit, page
      }
    }).then((res) => {
      setCampaigns(res.data.data);
      setCount(res.data.count);
    });
  }

  useEffect(() => {
    getCampaigns();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box my={{ xs: 0, sm: 4 }} boxSizing="border-box" maxWidth={1200} css={{ margin: '0 auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map(item => (
              <StyledTableCell key={item.text} align={item.align} width={item.width || null}>{item.text}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map(row => (
            <StyledTableRow
              hover
              key={row.id}
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
                  {row.INS_USERNAME || '-'}
                </StyledText>
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
              perPage={limit}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CampaignParticipant;
