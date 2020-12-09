import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button, Box
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function Dashboard(props) {
  const tableRows = {
    influencers: {
      label: '신규가입인플루언서',
      title: ['이름', '이메일', '전화번호', '소셜', '가입일차'],
      body: ['INF_NAME', 'INF_EMAIL', 'INF_TEL', 'INF_BLOG_TYPE', 'INF_DT'],
      link: '/Influencer'
    },
    advertisers: {
      label: '신규가입광고주',
      title: ['이름', '이메일', '전화번호', '회사 명', '기업구분', '가입일차'],
      body: ['ADV_NAME', 'ADV_EMAIL', 'ADV_TEL', 'ADV_COM_NAME', 'ADV_TYPE', 'ADV_DT'],
      link: '/Advertiser'
    },
    advertises: {
      label: '최근캠페인',
      title: ['회사명', '제품명', '협찬품 가격을', '인플루언서수', '결제상태'],
      body: ['ADV_COM_NAME', 'AD_PROD_NAME', 'AD_PROD_PRICE', 'INF_SUM', 'AD_PAID'],
      link: '/Campaign'
    }
  };

  const [tableData, setTableData] = useState({
    influencers: [],
    advertisers: [],
    advertises: []
  });

  const { setMenuIndicator, history } = props;
  useEffect(() => setMenuIndicator(0), []);

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

  return (
    <Box width={1200} css={{ margin: '0 auto' }}>
      <Grid container spacing={2}>
        {
            ['influencers', 'advertisers', 'advertises'].map(category => (
              <Grid key={category} item xs={12}>
                <Box className="category-label">
                  <Grid container justify="space-between">
                    <Grid item>{tableRows[category].label}</Grid>
                    <Grid item>
                      <button onClick={() => history.push(tableRows[category].link)}>
                          전체보기
                      </button>
                    </Grid>
                  </Grid>
                </Box>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {tableRows[category].title.map((item, index) => (
                          <StyledTableCell key={item} align={index > 0 ? 'right' : 'left'}>{item}</StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                          tableData[category].map(row => (
                            <StyledTableRow hover key={row.INF_ID || row.ADV_ID || row.AD_ID}>
                              {tableRows[category].body.map((item, index) => (
                                <StyledTableCell key={item} component={index === 0 ? 'th' : ''} scope={index === 0 ? 'row' : ''} align={index > 0 ? 'right' : 'left'}>
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
    </Box>
  );
}

export default Dashboard;
