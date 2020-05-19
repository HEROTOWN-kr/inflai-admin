import React, { useEffect, useState } from 'react';
import {
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  withStyles
} from '@material-ui/core';
import axios from 'axios';

function Ranking() {
  const [influencers, setInfluencers] = useState([]);
  const [blogType, setBlogType] = useState('1');

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      array.push({
        id: item.id,
        name: item.name,
        username: item.username,
        subscribers: item.followers_count,
      })
    ));

    setInfluencers(array);
  }

  function getInfluencers() {
    if (blogType === '1') {
      axios.get('/api/TB_INFLUENCER/rankInstagram', {
        params: {
          type: blogType
        }
      }).then((res) => {
        console.log(res);
        createInfluencers(res.data.data);
      });
    } else {
      axios.get('/api/TB_INFLUENCER/rankYoutube', {
        params: {
          type: blogType
        }
      }).then((res) => {
        console.log(res);
        createInfluencers(res.data.data);
      });
    }
  }

  useEffect(() => {
    getInfluencers();
  }, [blogType]);

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
          <Grid item sm={12}>
            <Select
              value={blogType}
              variant="outlined"
              onChange={(event => setBlogType(event.target.value))}
            >
              <MenuItem value="1">Instagram</MenuItem>
              <MenuItem value="2">Youtube</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell align="right">유저네임</StyledTableCell>
                    <StyledTableCell align="right">구독수</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {influencers.map(row => (
                    <StyledTableRow hover key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.username}</StyledTableCell>
                      <StyledTableCell align="right">{row.subscribers}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Ranking;
