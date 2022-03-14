import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import axios from 'axios';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledText from '../../containers/StyledText';
import StyledTableRow from '../../containers/StyledTableRow';
import { Colors } from '../../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';
import SellUrlDialog from './SellUrlDialog';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '60px'
  },
  {
    text: '이름',
    align: 'center',
    width: '150px'
  },
  {
    text: '메세지',
    align: 'center',
  },
  {
    text: '판매링크',
    align: 'center',
    width: '100px'
  },
];

function CampaignSeller(props) {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState({
    id: 0,
    sellUrl: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const adId = params.id;

  const { type } = location.state || {};
  const limit = 10;

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function getParticipants() {
    if (!type) {
      history.push('/Campaign/List');
      return;
    }
    axios.get('/api/TB_PARTICIPANT/getList', {
      params: {
        adId, type, limit, page, onlySelected: '1'
      }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
      setCount(res.data.count);
    }).catch(err => alert(err.response.data.message));
  }

  function clickSellUrl(item) {
    const { PAR_ID, PAR_SELL_URL } = item;
    setSelected({ id: PAR_ID, sellUrl: PAR_SELL_URL });
    toggleDialog();
  }

  useEffect(() => {
    if (type) getParticipants();
  }, [page]);

  return (
    <Box mb={1} boxSizing="border-box" maxWidth={1276} css={{ margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map(item => (
                <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                  {item.text}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map(row => (
              <StyledTableRow hover key={row.id}>
                <StyledTableCell>
                  <StyledText textAlign="center">
                    {row.rownum}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledText textAlign="center">
                    {row.PAR_NAME}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledText textAlign="left">
                    {row.PAR_MESSAGE}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledButton
                    background={Colors.green}
                    hoverBackground={Colors.greenHover}
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickSellUrl(row)}
                  >
                    { row.PAR_SELL_URL ? '수정' : '등록'}
                  </StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SellUrlDialog
        open={dialogOpen}
        closeDialog={toggleDialog}
        selected={selected}
        getParticipants={getParticipants}
      />
    </Box>
  );
}

export default CampaignSeller;
