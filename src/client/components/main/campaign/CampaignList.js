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

function CampaignList(props) {
  const { history, match } = props;

  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const tableHeader = [
    {
      text: '번호',
      align: 'center',
      width: '40px'
    },
    {
      text: '등록번호',
      align: 'center',
      width: '40px'
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
      align: 'center'
    }
  ];

  async function getCampaigns() {
    try {
      const response = await axios.get('/api/TB_AD/getAll', { params: { page } });
      const { campaignsRes, countRes } = response.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const {
          AD_ID, AD_NAME, AD_CTG, AD_CTG2, AD_DT, TB_PHOTO_ADs, rownum
        } = item;
        return {
          id: AD_ID,
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

  function campaignDetail(event, id) {
    history.push(`${props.match.path}/${id}`);
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
                <StyledTableCell align="center">
                  <Grid container spacing={2}>
                    <Grid item>
                      <Box
                        width="100px"
                        height="100px"
                        alt="noFoto"
                        onError={(e) => { e.target.onerror = null; e.target.src = `${defaultAccountImage}`; }}
                        src={row.photo.length > 0 ? row.photo[0].PHO_FILE : defaultAccountImage}
                        component="img"
                      />
                    </Grid>
                    <Grid item>
                      <Box py={1}>
                        <StyledText fontSize="14px" color="#222">
                          {row.campaignName}
                        </StyledText>
                        <StyledText fontSize="14px" color="#222">
                          {`${AdvertiseTypes.mainType[row.category]} > ${AdvertiseTypes.subType[row.category][row.subcategory]}`}
                        </StyledText>
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
                  <IconButton>
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
              perPage={5}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CampaignList;
