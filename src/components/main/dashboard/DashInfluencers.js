import React, { useEffect, useState } from "react";
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { axiosInstance as axios } from "@lib/axiosInstance";
import StyledTableCell from "../../containers/StyledTableCell";
import StyledTableRow from "../../containers/StyledTableRow";
import { useNavigate } from "react-router-dom";

function DashInfluencers(props) {
  const { history } = props;
  const [influencers, setInfluencers] = useState([]);
  const limit = 5;
  const page = 1;
  const navigate = useNavigate();

  function createInfluencers(data) {
    const array = [];

    data.map((item) =>
      array.push({
        id: item.INF_ID,
        rownum: item.rownum,
        name: item.INF_NAME,
        email: item.INF_EMAIL,
        phoneNumber: item.INF_TEL,
        registerDate: item.INF_DT,
        social: item.INF_BLOG_TYPE,
      })
    );

    setInfluencers(array);
  }

  function getInfluencers() {
    axios
      .get("/TB_INFLUENCER/getInfluencers", {
        params: {
          page,
          limit,
        },
      })
      .then((res) => {
        const { data } = res.data;
        createInfluencers(data);
      })
      .catch((err) => alert(err.response.data.message));
  }

  useEffect(() => {
    getInfluencers();
  }, []);

  return (
    <React.Fragment>
      <div className="category-label">
        <div className="flex justify-between">
          <div>신규가입인플루언서</div>
          <div>
            <button onClick={() => navigate("/Influencer")}>전체보기</button>
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
              <StyledTableCell align="right">이메일</StyledTableCell>
              <StyledTableCell align="right">전화번호</StyledTableCell>
              <StyledTableCell align="right">소셜</StyledTableCell>
              <StyledTableCell align="right">가입일차</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map((row) => (
              <StyledTableRow hover key={row.id}>
                <StyledTableCell align="center">{row.rownum}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align="right">{row.social}</StyledTableCell>
                <StyledTableCell align="right">{row.registerDate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default DashInfluencers;
