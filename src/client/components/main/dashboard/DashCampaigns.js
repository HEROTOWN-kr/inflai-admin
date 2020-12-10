import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import { AdvertiseTypes } from '../../../lib/Сonstants';

function DashCampaigns(props) {
  const { history } = props;
  const [campaigns, setCampaigns] = useState([]);
  const limit = 5;
  const page = 1;

  async function getCampaigns() {
    try {
      const response = await axios.get('/api/TB_AD/getAll', { params: { page, limit } });
      const { campaignsRes } = response.data.data;
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <React.Fragment>
      <Box className="category-label">
        <Grid container justify="space-between">
          <Grid item>최근캠페인</Grid>
          <Grid item>
            <button onClick={() => history.push('/Campaign')}>
                전체보기
            </button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width="40px">번호</StyledTableCell>
              <StyledTableCell>이름</StyledTableCell>
              <StyledTableCell align="right">카테고리</StyledTableCell>
              <StyledTableCell align="right">등록일차</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map(row => (
              <StyledTableRow hover key={row.id}>
                <StyledTableCell align="center">{row.rownum}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.campaignName}
                </StyledTableCell>
                <StyledTableCell align="right">{AdvertiseTypes.mainType[row.category]}</StyledTableCell>
                <StyledTableCell align="right">{row.createDate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default DashCampaigns;
