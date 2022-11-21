import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box, Button,
  Grid, makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow, Typography,
} from '@material-ui/core';
import axios from 'axios';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Description, Instagram, YouTube } from '@material-ui/icons';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import MyPagination from '../../containers/MyPagination';
import InstaIcon from '../../../img/instagram-icon.png';
import YoutubeIcon from '../../../img/icon_youtube_url.png';
import BlogIcon from '../../../img/icon_blog_url.png';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledTabs from '../../containers/StyledTabs';
import StyledTab from '../../containers/StyledTab';
import StyledButton from '../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import AuthContext from '../../../context/AuthContext';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 700,
    marginTop: '96px',
    marginBottom: '48px'
  },
  tabs: {
    root: {},
    indicator: {}
  }
});

const snsTypes = [
  {
    id: 1,
    icon: InstaIcon,
    name: 'insta'
  },
  {
    id: 2,
    icon: YoutubeIcon,
    name: 'youtube'
  },
  {
    id: 3,
    icon: BlogIcon,
    name: 'naver'
  }
];

function Influencer(props) {
  const [influencers, setInfluencers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ instagram: '0', youtube: '0', blog: '0' });
  const { setMenuIndicator } = props;
  const limit = 10;
  const classes = useStyles();
  const { setLoading } = useContext(AuthContext);

  useEffect(() => setMenuIndicator(2), []);

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.INF_ID,
        rownum: item.rownum,
        name: item.INF_NAME,
        email: item.INF_EMAIL,
        phoneNumber: item.INF_TEL,
        registerDate: item.INF_DT,
        social: item.INF_BLOG_TYPE,
        insta: item.INS_ID || null,
        youtube: item.YOU_ID || null,
        naver: item.NAV_ID || null,
        photo: item.INF_PHOTO_URL || item.INF_PHOTO
      })
    ));

    setInfluencers(array);
  }

  function getInfluencers() {
    axios.get('/api/TB_INFLUENCER/getInfluencers', {
      params: {
        page, limit
      }
    }).then((res) => {
      const { data, InfluencerCount } = res.data;
      createInfluencers(data);
      setCount(InfluencerCount);
    });
  }

  function getExcel() {
    setLoading(true);
    axios.get('/api/TB_INFLUENCER/downExcel').then((res) => {
      const { url } = res.data;
      setLoading(false);
      window.open(window.location.origin + url, '_blank');
    }).catch((error) => {
      setLoading(false);
      alert(error.response.data);
    });
  }

  useEffect(() => {
    getInfluencers();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Fragment>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>인플루언서 관리</Typography>
        </Box>
      </Box>
      <Box bgcolor="#f4f4f4" minHeight={800}>
        <Box py={6} maxWidth={1276} m="0 auto">
          <Box pb={2}>
            <Grid container justify="space-between">
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <StyledButton
                      height={40}
                      padding="0 20px"
                      background={filters.instagram === '1' ? '#0fb359' : '#fff'}
                      color={filters.instagram === '1' ? '#fff' : '#222'}
                      hoverBackground={filters.instagram === '1' ? '#fff' : '#107C41'}
                      startIcon={<Instagram />}
                      onClick={() => {}}
                    >
                      인스타그램
                    </StyledButton>
                  </Grid>
                  <Grid item>
                    <StyledButton
                      height={40}
                      padding="0 20px"
                      background="#0fb359"
                      hoverBackground="#107C41"
                      startIcon={<YouTube />}
                      onClick={() => {}}
                    >
                      유튜브
                    </StyledButton>
                  </Grid>
                  <Grid item>
                    <StyledButton
                      height={40}
                      padding="0 20px"
                      background="#0fb359"
                      hoverBackground="#107C41"
                      startIcon={<Description />}
                      onClick={() => {}}
                    >
                      블로그
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <StyledButton
                  height={40}
                  padding="0 20px"
                  background="#0fb359"
                  hoverBackground="#107C41"
                  startIcon={<Description />}
                  onClick={getExcel}
                >
            블로그
                </StyledButton>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" width="90px">번호</StyledTableCell>
                  <StyledTableCell>이름</StyledTableCell>
                  <StyledTableCell align="center">이메일</StyledTableCell>
                  <StyledTableCell align="center">전화번호</StyledTableCell>
                  <StyledTableCell align="center">가입방식</StyledTableCell>
                  <StyledTableCell align="center">SNS</StyledTableCell>
                  <StyledTableCell align="right">가입일차</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {influencers.map(row => (
                  <StyledTableRow hover key={row.id}>
                    <StyledTableCell align="center">{row.rownum}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Grid container spacing={1} alignItems="center">
                        {/* <Grid item>
                      <StyledImage
                        width="100px"
                        height="100px"
                        borderRadius="100%"
                        src={row.photo || defaultAccountImage}
                      />
                    </Grid> */}
                        <Grid item>{row.name}</Grid>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                    <StyledTableCell align="center">{row.social}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid container spacing={1} justify="center">
                        {snsTypes.map(item => (
                          row[item.name] ? (
                            <Grid key={item.id} item>
                              <StyledImage
                                cursor="pointer"
                                width="20px"
                                height="20px"
                                src={item.icon}
                              />
                            </Grid>
                          ) : null))}
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.registerDate}</StyledTableCell>
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
        </Box>
      </Box>
    </Fragment>
  );
}

export default Influencer;
