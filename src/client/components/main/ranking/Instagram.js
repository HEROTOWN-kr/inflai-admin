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

function Instagram() {
  const [influencers, setInfluencers] = useState([]);

  const tableRows = {
    title: [
      {
        text: '#',
        align: 'center',
        width: '8px'
      },
      {
        text: '이름',
        align: 'left'
      },
      {
        text: '구독수',
        align: 'right'
      }
    ],
    body: ['rownum', 'INF_NAME', 'INS_FLWR']
  };

  function getInfluencers() {
    axios.get('/api/TB_INSTA/').then(
      (res) => {
        const { list } = res.data.data;
        setInfluencers(list);
      }
    );
  }

  async function getGoogleVisionData(INS_ID) {
    const googleData = await axios.get('/api/TB_INSTA/getGoogleData', { params: { INS_ID } });
    console.log(googleData.data.message);
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
                    width={item.width || null}
                  >
                    {item.text}
                  </StyledTableCell>
                ))
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {influencers.map(row => (
            <StyledTableRow hover key={row.INS_ID} onClick={() => getGoogleVisionData(row.INS_ID)}>
              {
                tableRows.body.map((item, index) => (
                  <StyledTableCell
                    key={item}
                    component={index === 1 ? 'th' : ''}
                    scope={index === 1 ? 'row' : ''}
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

export default Instagram;
