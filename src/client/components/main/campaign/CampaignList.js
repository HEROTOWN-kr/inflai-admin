import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid, Icon,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons/';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import MyPagination from '../../containers/MyPagination';
import StyledTitle from '../../containers/StyledTitle';
import StyledButton from '../../containers/StyledButton';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledLink from '../../containers/StyledLink';
import ConfirmDialog from '../../containers/ConfirmDialog';
import ParticipantDialog from './ParticipantDialog';
import StyledImage from '../../containers/StyledImage';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '60px'
  },
  {
    text: '아이디',
    align: 'center',
    width: '50px'
  },
  {
    text: '캠페인정보',
    align: 'center'
  },
  {
    text: '등록/옵션기간',
    align: 'center'
  },
  {
    text: '관리자툴',
    align: 'center',
    width: '120px'
  }
];

function CampaignList(props) {
  const { history, match } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [participantDialog, setParticipantDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleParticipantDialog() {
    setParticipantDialog(!participantDialog);
  }


  async function getCampaigns() {
    try {
      const response = await axios.get('/api/TB_AD/getAll', { params: { page, limit } });
      const { campaignsRes, countRes } = response.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const {
          AD_ID, AD_NAME, AD_CTG, AD_CTG2, AD_DT, TB_PHOTO_ADs, AD_TYPE, rownum
        } = item;
        return {
          id: AD_ID,
          type: AD_TYPE,
          campaignName: AD_NAME,
          category: AD_CTG,
          subcategory: AD_CTG2,
          createDate: AD_DT,
          photo: TB_PHOTO_ADs,
          rownum
        };
      });
      setCampaigns(campaignsArray);
      setCount(countRes);
    } catch (err) {
      console.log(err);
    }
  }

  function deleteDbPicture() {
    axios.post('/api/TB_AD/deleteAWS', { id: selectedCampaign }).then((res) => {
      setSelectedCampaign(0);
      getCampaigns();
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function campaignDetail(event, id) {
    history.push(`${props.match.path}/${id}`);
  }

  function campaignParticipant(id, type) {
    if (type === '1') {
      history.push(`/Campaign/ParInsta/${id}`);
    } else if (type === '3') {
      history.push(`/Campaign/ParBlog/${id}`);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box mt={4} width={1200} css={{ margin: '0 auto' }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item><StyledTitle title="캠페인 리스트" /></Grid>
        <Grid item><StyledButton background={Colors.blue2} onClick={() => history.push(`${match.path}/create`)}>캠페인 등록</StyledButton></Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
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
                    {row.id}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell>
                  <Grid container>
                    <Grid item xs="auto">
                      <StyledImage
                        width="80px"
                        height="80px"
                        src={row.photo.length > 0 ? row.photo[0].PHO_FILE_URL : defaultAccountImage}
                        onError={(e) => { e.target.onerror = null; e.target.src = `${defaultAccountImage}`; }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Box ml="14px" height="100%">
                        <Grid container alignContent="space-between" style={{ height: '100%' }}>
                          <Grid item xs={12}>
                            <StyledText fontSize="14px" color="#222">
                              {row.campaignName}
                            </StyledText>
                            <StyledText fontSize="14px" color="#222">
                              {row.type === '1' ? (
                                <span style={{ color: Colors.pink, fontWeight: '600' }}>Instagram</span>
                              ) : null}
                              {row.type === '2' ? (
                                <span style={{ color: Colors.red, fontWeight: '600' }}>Youtube</span>
                              ) : null}
                              {row.type === '3' ? (
                                <span style={{ color: Colors.green, fontWeight: '600' }}>Blog</span>
                              ) : null}
                              {` ${AdvertiseTypes.mainType[row.category]} > ${AdvertiseTypes.subType[row.category][row.subcategory]}`}
                            </StyledText>
                          </Grid>
                          <Grid item xs={12}>
                            <Box width="70px">
                              <StyledButton
                                onClick={() => campaignParticipant(row.id, row.type)}
                                padding="0"
                                height="26px"
                                fontSize="0.790rem"
                              >
                                신청자
                              </StyledButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText fontSize="14px" color="#222" textAlign="center">
                    {row.createDate}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={event => campaignDetail(event, row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => { setSelectedCampaign(row.id); setDialogOpen(true); }}>
                    <Delete />
                  </IconButton>
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
      <ParticipantDialog
        open={participantDialog}
        closeDialog={toggleParticipantDialog}
      />
      <ConfirmDialog
        open={dialogOpen}
        closeDialog={toggleDialog}
        onConfirm={deleteDbPicture}
        dialogText="삭제하시겠습니까?"
      />
    </Box>
  );
}

export default CampaignList;
