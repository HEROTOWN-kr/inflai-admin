import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import axios from 'axios';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { Description, GetApp, Publish } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledText from '../../containers/StyledText';
import StyledTableRow from '../../containers/StyledTableRow';
import { Colors } from '../../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';
import SellUrlDialog from './SellUrlDialog';
import MyPagination from '../../containers/MyPagination';

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
  const { enqueueSnackbar } = useSnackbar();
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
    axios.get('/api/TB_PARTICIPANT/getListSeller', {
      params: { adId, limit, page }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
      setCount(res.data.count);
    }).catch(err => alert(err.response.data.message));
  }

  function downloadExcel(item) {
    axios.get('/api/TB_PARTICIPANT/downloadExcel', {
      params: { adId }
    }).then((res) => {
      console.log(res);
      const { url } = res.data;
      window.open(window.location.origin + url, '_blank');
    }).catch(err => alert(err.response.data.message));
  }

  function uploadExcel(e) {
    const { files } = e.target || {};
    const formData = new FormData();
    formData.append('file', files[0]);
    e.target.value = null;

    axios.post('/api/TB_PARTICIPANT/uploadExcel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      enqueueSnackbar('업로드되었습니다', { variant: 'success' });
    }).catch((error) => {
      enqueueSnackbar('에러가 발생났습니다', { variant: 'error' });
    });
  }

  function clickSellUrl(item) {
    const { PAR_ID, PAR_SELL_URL } = item;
    setSelected({ id: PAR_ID, sellUrl: PAR_SELL_URL });
    toggleDialog();
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (type) getParticipants();
  }, [page]);

  return (
    <Box mb={1} boxSizing="border-box" maxWidth={1276} css={{ margin: '0 auto' }}>
      <Box mb={1}>
        <Grid container spacing={1} justify="flex-end">
          <Grid item>
            <StyledButton
              height={40}
              padding="0 20px"
              background="#0fb359"
              hoverBackground="#107C41"
              startIcon={<GetApp />}
              onClick={downloadExcel}
            >
              Download
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              height={40}
              padding="0 20px"
              background="#0fb359"
              hoverBackground="#107C41"
              startIcon={<Publish />}
              component="label"
            >
              Upload
              <input
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                hidden
                onChange={uploadExcel}
              />
            </StyledButton>
          </Grid>
        </Grid>
      </Box>

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
