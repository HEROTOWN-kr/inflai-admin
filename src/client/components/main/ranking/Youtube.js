import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function Youtube() {
  const [influencers, setInfluencers] = useState([]);

  const tableRows = {
    title: [
      {
        text: '#',
        align: 'center',
        isRank: true
      },
      {
        text: '이름',
        align: 'left'
      },
      {
        text: '구독수',
        align: 'right'
      },
      {
        text: '보기수',
        align: 'right'
      }
    ],
    body: ['rownum', 'INF_NAME', 'YOU_SUBS', 'YOU_VIEWS']
  };

  function getInfluencers() {
    axios.get('/api/TB_YOUTUBE/').then(
      (res) => {
        const { list } = res.data.data;
        setInfluencers(list);
      }
    );
  }

  useEffect(() => {
    getInfluencers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              tableRows.title.map(item => (
                <StyledTableCell
                  key={item.text}
                  align={item.align}
                  width={item.isRank || null}
                >
                  {item.text}
                </StyledTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {influencers.map(row => (
            <StyledTableRow hover key={row.YOU_ID}>
              {
                tableRows.body.map((item, index) => (
                  <StyledTableCell
                    key={item}
                    /* component={index === 1 ? 'th' : ''}
                    scope={index === 1 ? 'row' : ''} */
                    align={index === 1 ? 'left' : 'right'}
                  >
                    {row[item] >= 0 ? row[item] : row.TB_INFLUENCER[item]}
                  </StyledTableCell>
                ))
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Youtube;
