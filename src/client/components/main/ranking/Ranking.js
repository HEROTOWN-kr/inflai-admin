import React, { useEffect, useState } from 'react';
import {
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';

function Ranking() {
  const [influencers, setInfluencers] = useState([]);
  const [blogType, setBlogType] = useState('1');

  const tableRows = {
    instagram: {
      title: ['이름', '유저네임', '구독수'],
      body: ['name', 'username', 'subscribers']
    },
    youtube: {
      title: ['이름', '구독수'],
      body: ['name', 'subscribers']
    }
  };

  function createInfluencers(data) {
    const array = [];

    data.map(item => (
      blogType === '1'
        ? array.push({
          id: item.id,
          name: item.name,
          username: item.username,
          subscribers: item.followers_count,
        })
        : array.push({
          // id: item.id,
          name: item.snippet.title,
          // username: item.username,
          subscribers: item.statistics.subscribersCount,
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
                    {blogType === '1'
                      ? (
                        tableRows.instagram.title.map((item, index) => (
                          <StyledTableCell key={item} align={index > 0 ? 'right' : ''}>{item}</StyledTableCell>
                        ))
                      ) : (
                        tableRows.youtube.title.map(item => (
                          <StyledTableCell key={item}>{item}</StyledTableCell>
                        ))
                      )
                    }
                    {/* <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell align="right">유저네임</StyledTableCell>
                    <StyledTableCell align="right">구독수</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {influencers.map(row => (
                    <StyledTableRow hover key={row.id}>
                      {
                        blogType === '1'
                          ? (
                            tableRows.instagram.body.map((item, index) => (
                              <StyledTableCell component={index === 0 ? 'th' : ''} scope={index === 0 ? 'row' : ''} align={index > 0 ? 'right' : ''}>{row[item]}</StyledTableCell>))
                          ) : (
                            tableRows.youtube.body.map((item, index) => (
                              <StyledTableCell component={index === 0 ? 'th' : ''} scope={index === 0 ? 'row' : ''} align={index > 0 ? 'right' : ''}>{row[item]}</StyledTableCell>))
                          )
                      }
                      {/* <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.username}</StyledTableCell>
                      <StyledTableCell align="right">{row.subscribers}</StyledTableCell> */}
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
