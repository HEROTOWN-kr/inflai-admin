import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid, Icon,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow, Tooltip,
  IconButton, InputAdornment, CircularProgress
} from '@material-ui/core';
import {
  Edit, Delete, Description, Create, FileCopy
} from '@material-ui/icons';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
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
import ReactFormText from '../../containers/ReactFormText';
import StyledSelect from '../../containers/StyledSelect';
import CopyDialog from './CopyDialog';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '60px'
  },
  {
    text: 'id',
    align: 'center',
    width: '50px'
  },
  {
    text: '캠페인정보',
    align: 'center'
  },
  {
    text: '신청/선정/후기',
  },
  {
    text: '등록/옵션기간',
    align: 'center'
  },
  {
    text: '관리자툴',
    align: 'center',
    width: '150px'
  }
];

const snsTypes = {
  1: {
    text: 'Instagram',
    color: Colors.pink
  },
  2: {
    text: 'Youtube',
    color: Colors.red
  },
  3: {
    text: 'Blog',
    color: Colors.green
  }
};


const useStyles = makeStyles({
  root: {
    background: '#ffffff'
  },
  endAdornment: {
    padding: '0'
  },
  iconButton: {
    padding: '8px'
  },
  tableRowRoot: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#9199b6'
    }
  }
});

function CampaignList(props) {
  const { history, match, setTab } = props;
  const [type, setType] = useState('0');
  const [limit, setLimit] = useState(5);
  const [searchWord, setSearchWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyDialog, setCopyDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  // const limit = 5;

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { searchValue: '' }
  });

  function searchFunc(data) {
    const { searchValue } = data;
    setPage(1);
    setSearchWord(searchValue);
  }

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleCopyDialog() {
    setCopyDialog(!copyDialog);
  }

  async function getCampaigns() {
    setLoading(true);
    try {
      const params = { page, limit };
      if (type !== '0') params.type = type;
      if (searchWord.length > 0) params.searchWord = searchWord;

      const response = await axios.get('/api/TB_AD/getAll', { params });
      const { campaignsRes, countRes } = response.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const {
          AD_ID, AD_NAME, AD_CTG, AD_CTG2, AD_DT, AD_INF_CNT, AD_CAM_TYPE,
          TB_PHOTO_ADs, AD_TYPE, AD_REPORT, PAR_SEL_CNT, PAR_REVIEW_CNT,
          TB_PARTICIPANTs, rownum
        } = item;

        const returnObj = {
          id: AD_ID,
          type: AD_TYPE,
          campaignName: AD_NAME,
          campaignType: AD_CAM_TYPE,
          category: AD_CTG,
          subcategory: AD_CTG2,
          createDate: AD_DT,
          photo: TB_PHOTO_ADs,
          infCnt: AD_INF_CNT,
          regCnt: TB_PARTICIPANTs.length,
          reviewCnt: PAR_REVIEW_CNT,
          selCnt: PAR_SEL_CNT,
          rownum
        };
        if (AD_REPORT === '1') returnObj.report = true;

        return returnObj;
      });
      setCampaigns(campaignsArray);
      setCount(countRes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

  function copyCampaign(id) {
    setSelectedCampaign(id);
    toggleCopyDialog();
  }

  function campaignDetail(event, id) {
    history.push(`${props.match.path}/${id}`);
  }

  function campaignParticipant(id, type) {
    if (type === '1') {
      history.push(`/Campaign/ParInsta/${id}`);
    } else if (type === '2') {
      history.push(`/Campaign/ParYoutube/${id}`);
    } else if (type === '3') {
      history.push(`/Campaign/ParBlog/${id}`);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, [page, type, searchWord, limit]);

  useEffect(() => setTab(0), []);

  const changePage = (event, value) => {
    setPage(value);
  };

  const changeType = (event) => {
    setType(event.target.value);
  };

  const changeLimit = (event) => {
    setLimit(event.target.value);
  };


  return (
    <Box m="0 auto" maxWidth={1276}>
      <Box mb={1}>
        <Grid container justify="space-between" alignItems="center" spacing={1}>
          <Grid item>
            <StyledSelect
              classes={{ root: classes.root }}
              native
              variant="outlined"
              fullWidth
              value={type}
              onChange={changeType}
            >
              <option value="0">전체</option>
              <option value="1">인스타</option>
              <option value="2">유튜브</option>
              <option value="3">블로그</option>
            </StyledSelect>
          </Grid>
          <Grid item>
            <Box width={300}>
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
          </Grid>

          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <StyledSelect
                  classes={{ root: classes.root }}
                  native
                  variant="outlined"
                  fullWidth
                  value={limit}
                  onChange={changeLimit}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={30}>30</option>
                  <option value={100}>100</option>
                </StyledSelect>
              </Grid>
              <Grid item>
                <StyledButton
                  height={40}
                  padding="0 20px"
                  background="#0fb359"
                  hoverBackground="#107C41"
                  startIcon={<Create />}
                  onClick={() => history.push(`${match.path}/create`)}
                >
                  캠페인 등록
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      { loading ? (
        <Box minHeight={500}>
          <Grid container justify="center" alignItems="center" style={{ minHeight: 'inherit' }}>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      ) : (
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
                                <Grid container spacing={1}>
                                  { row.report ? (
                                    <Grid item>
                                      <Box color="#0027ff" fontWeight={600}>(기자단)</Box>
                                    </Grid>
                                  ) : null}
                                  { row.campaignType === '2' ? (
                                    <Grid item>
                                      <Box color="#00b605" fontWeight={600}>[공동구매]</Box>
                                    </Grid>
                                  ) : null}
                                  <Grid item>
                                    <Box style={{ color: snsTypes[row.type].color, fontWeight: '600' }}>{snsTypes[row.type].text}</Box>
                                  </Grid>
                                  <Grid item>
                                    <Box>
                                      {` ${AdvertiseTypes.mainType[row.category]} > ${AdvertiseTypes.subType[row.category][row.subcategory]}`}
                                    </Box>
                                  </Grid>
                                </Grid>
                              </StyledText>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={1}>
                                <Grid item>
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
                                <Grid item>
                                  <Box width="70px">
                                    <StyledButton
                                      onClick={() => history.push(`${match.path}/Question/${row.id}`)}
                                      background="#0fb359"
                                      hoverBackground="#107C41"
                                      padding="0"
                                      height="26px"
                                      fontSize="0.790rem"
                                    >
                                      문의
                                    </StyledButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledText fontSize="14px" color="#222">
                      {`신청자 ${row.regCnt} / ${row.infCnt}`}
                    </StyledText>
                    <StyledText fontSize="14px" color="#222">
                      {`선정자 ${row.selCnt} / ${row.infCnt}`}
                    </StyledText>
                    <StyledText fontSize="14px" color="#222">
                      {`후기수 ${row.reviewCnt} / ${row.selCnt}`}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StyledText fontSize="14px" color="#222" textAlign="center">
                      {row.createDate}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="수정" placement="top">
                      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={event => campaignDetail(event, row.id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="복사" placement="top">
                      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={() => copyCampaign(row.id)}>
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="삭제" placement="top">
                      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={() => { setSelectedCampaign(row.id); setDialogOpen(true); }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) }

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
      <CopyDialog
        open={copyDialog}
        campaignId={selectedCampaign}
        closeDialog={toggleCopyDialog}
        getCampaigns={getCampaigns}
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
