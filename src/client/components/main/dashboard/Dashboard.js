import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles
} from '@material-ui/core';
import { setIn } from 'formik';
import index from 'async';

function Dashboard() {
  const tableRows = {
    influencers: {
      title: ['이름', '이메일', '전화번호', '소셜', '가입일차'],
      body: ['INF_NAME', 'INF_EMAIL', 'INF_TEL', 'INF_BLOG_TYPE', 'INF_DT']
    },
    advertisers: {
      title: ['이름', '이메일', '전화번호', '회사 명', '기업구분', '가입일차'],
      body: ['ADV_NAME', 'ADV_EMAIL', 'ADV_TEL', 'ADV_COM_NAME', 'ADV_TYPE', 'ADV_DT']
    },
    advertises: {
      title: ['회사명', '제품명', '협찬품 가격을', '인플루언서수', '결제상태'],
      body: ['ADV_COM_NAME', 'AD_PROD_NAME', 'AD_PROD_PRICE', 'INF_SUM', 'AD_PAID']
    }
  };

  const [tableData, setTableData] = useState({
    influencers: [],
    advertisers: [],
    advertises: []
  });

  function getData() {
    axios.get('/api/TB_ADMIN/dashboard').then((res) => {
      const { advertises, advertisers, influencers } = res.data.data;
      console.log(res.data.data);
      setTableData({ advertises, advertisers, influencers });
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <Grid container spacing={2}>
          {
            ['influencers', 'advertisers', 'advertises'].map(category => (
              <Grid key={category} item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {tableRows[category].title.map((item, index) => (
                          <StyledTableCell key={item} align={index > 0 ? 'right' : ''}>{item}</StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                       tableData[category].map(row => (
                         <StyledTableRow hover key={row.INF_ID || row.ADV_ID || row.AD_ID}>
                           {tableRows[category].body.map((item, index) => (
                             <StyledTableCell key={item} component={index === 0 ? 'th' : ''} scope={index === 0 ? 'row' : ''} align={index > 0 ? 'right' : ''}>
                               {category === 'advertises' && item === 'ADV_COM_NAME' ? row.TB_ADVERTISER[item] : row[item]}
                             </StyledTableCell>
                           ))}
                         </StyledTableRow>
                       ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
