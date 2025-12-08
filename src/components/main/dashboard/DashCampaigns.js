import React, { useEffect, useState } from "react";
import { axiosInstance as axios } from "@lib/axiosInstance";
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import StyledTableCell from "../../containers/StyledTableCell";
import StyledTableRow from "../../containers/StyledTableRow";
import { AdvertiseTypes } from "../../../lib/Сonstants";
import { useNavigate } from "react-router-dom";

function DashCampaigns(props) {
  const [campaigns, setCampaigns] = useState([]);
  const limit = 5;
  const page = 1;
  const navigate = useNavigate();

  async function getCampaigns() {
    try {
      const response = await axios.get("/TB_AD/getAll", { params: { page, limit } });
      const { campaignsRes } = response.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const { AD_ID, AD_NAME, AD_CTG, AD_CTG2, AD_DT, TB_PHOTO_ADs, rownum } = item;
        return {
          id: AD_ID,
          campaignName: AD_NAME,
          category: AD_CTG,
          subcategory: AD_CTG2,
          createDate: AD_DT,
          photo: TB_PHOTO_ADs,
          rownum,
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
      <div className="category-label">
        <div className="flex justify-between">
          <div>최근캠페인</div>
          <div>
            <button onClick={() => navigate("/Campaign")}>전체보기</button>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width="60px">
                번호
              </StyledTableCell>
              <StyledTableCell>이름</StyledTableCell>
              <StyledTableCell align="right">카테고리</StyledTableCell>
              <StyledTableCell align="right">등록일차</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((row) => (
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
