import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, TableBody, TableHead, TableRow, Checkbox, Table
} from '@material-ui/core';
import axios from 'axios';
import { all } from 'async';
import StyledText from '../../../containers/StyledText';
import MyPagination from '../../../containers/MyPagination';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import { Colors } from '../../../../lib/Сonstants';
import StyledButton from '../../../containers/StyledButton';
import StyledBackDrop from '../../../containers/StyledBackDrop';

const tableHeader = [
  {
    text: '체크',
    align: 'center',
    width: '40px'
  },
  {
    text: '번호',
    align: 'center',
    width: '40px'
  },
  {
    text: '캠페인이름',
    align: 'center'
  },
  {
    text: '시잘일',
    align: 'center'
  },
  {
    text: '마감일',
    align: 'center'
  }
];

function KakaoNotify() {
  const [campaigns, setCampaigns] = useState([]);
  const [savingMode, setSavingMode] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const limit = 10;

  function getCampaigns() {
    axios.get('/api/TB_AD/getAll', { params: { page, limit } }).then((res) => {
      const { campaignsRes, countRes } = res.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const {
          AD_ID, AD_NAME, AD_SRCH_START, AD_SRCH_END, rownum
        } = item;
        return {
          id: AD_ID,
          campaignName: AD_NAME,
          startDate: AD_SRCH_START,
          endDate: AD_SRCH_END,
          rownum
        };
      });
      setCampaigns(campaignsArray);
      setCount(countRes);
    });
  }

  useEffect(() => {
    getCampaigns();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  function selectCampaign(id) {
    const isExist = selectedItems.indexOf(id) !== -1;
    if (isExist) {
      const newItems = selectedItems.filter(item => item !== id);
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function sendMessage() {
    setSavingMode(true);
    axios.get('/api/TB_AD/notify', {
      params: { ids: selectedItems }
    }).then((res) => {
      setSavingMode(false);
    }).catch((error) => {
      alert(error.response.data.message);
      setSavingMode(false);
    });
  }

  return (
    <Box py="20px" px="30px" maxWidth={1200} css={{ margin: '0 auto', boxSizing: 'border-box' }}>
      <Grid container>
        <Grid item xs="auto">
          <Box width="300px">
            <StyledText mb="30px" fontSize="16px">카카오 알림톡 메세지</StyledText>
            {selectedItems.map(item => (
              <StyledText mb={1}>{`Campaign #${item}`}</StyledText>
            ))}
            <Box width="150px" mt={2}>
              <StyledButton
                padding="0"
                height={40}
                disabled={selectedItems.length < 3}
                onClick={sendMessage}
              >
카카오 알림 보내기
              </StyledButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <StyledText fontSize="16px">캠페인 리스트</StyledText>
          <Box my="30px">
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map(item => (
                    <StyledTableCell key={item.text} align={item.align} width={item.width || null}>{item.text}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((row) => {
                  const isExist = selectedItems.indexOf(row.id) !== -1;
                  const disabled = !isExist && selectedItems.length >= 3;
                  return (
                    <StyledTableRow
                      hover
                      key={row.id}
                      onClick={event => (disabled ? null : selectCampaign(row.id))}
                    >
                      <StyledTableCell>
                        <Checkbox
                          checked={isExist}
                          disabled={disabled}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.rownum}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.campaignName}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.startDate}
                        </StyledText>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledText textAlign="center" color={disabled ? Colors.disabled : null}>
                          {row.endDate}
                        </StyledText>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>

          </Box>
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
        </Grid>
      </Grid>
      <StyledBackDrop open={savingMode} />
    </Box>
  );
}

export default KakaoNotify;
