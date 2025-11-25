import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, IconButton, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import StyledTitle from '../../containers/StyledTitle';
import StyledText from '../../containers/StyledText';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import MyPagination from '../../containers/MyPagination';
import { Colors } from '../../../lib/Сonstants';
import SubscriptionDialog from './SubscriptionDialog';
import Alert from '../../containers/Alert';


const tableRows = [
  {
    text: '#',
    align: 'center',
    width: '60px'
  },
  {
    text: '이름',
    align: 'left',
  },
  {
    text: '이메일',
    align: 'left',
  },
  {
    text: '전화번호',
    align: 'left',
  },
  {
    text: '플랜',
    align: 'left'
  },
  {
    text: '요금',
    align: 'center'
  },
  {
    text: '쿠폰',
    align: 'center'
  },
  {
    text: '시작 날짜',
    align: 'left'
  },
  {
    text: '마감 날짜',
    align: 'left'
  },
  {
    text: '상태',
    align: 'left'
  },
  {
    text: '관리자툴',
    align: 'left',
    width: '120px'
  },
];

function SubscriptionList(props) {
  const { history } = props;
  const [subscribeData, setSubscribeData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogData, setDialogData] = useState({});
  const [editDialog, setEditDialog] = useState(false);

  function toggleEditDialog() {
    setEditDialog(!editDialog);
  }

  function getSubscribtions() {
    axios.get('/api/TB_SUBSCRIPTION/list', {
      params: { page }
    }).then((res) => {
      const { data, countRes } = res.data;
      const subscribeArray = data.map((item) => {
        const {
          SUB_ID, SUB_START_DT, SUB_END_DT, SUB_STATUS, SUB_COUPON, PLN_NAME, PLN_MONTH, PLN_PRICE_MONTH,
          ADV_NAME, ADV_EMAIL, ADV_TEL, rowNum
        } = item;

        return {
          id: SUB_ID,
          advertiserName: ADV_NAME,
          advertiserEmail: ADV_EMAIL,
          advertiserTel: ADV_TEL,
          planName: PLN_NAME,
          planPriceMonth: PLN_PRICE_MONTH,
          planMonth: PLN_MONTH,
          startDate: SUB_START_DT,
          finishDate: SUB_END_DT,
          status: SUB_STATUS,
          coupon: SUB_COUPON,
          rowNum
        };
      });
      setSubscribeData(subscribeArray);
      setCount(countRes);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    getSubscribtions();
  }, [page]);

  useEffect(() => {
    if (selectedId) {
      const data = subscribeData.filter(item => item.id === selectedId);
      if (data[0]) setDialogData(data[0]);
    }
  }, [selectedId]);

  function openDialog(id) {
    setSelectedId(id);
    toggleEditDialog();
  }


  const changePage = (event, value) => {
    setPage(value);
  };

  function editRow(event, id) {
    history.push(`${props.match.path}/${id}`);
  }

  return (
    <Box py={6} width={1200} css={{ margin: '0 auto' }}>
      <StyledTitle title="서브스크립션 리스트" />
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            { tableRows.map(item => (
              <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                <StyledText
                  color="#ffffff"
                  textAlign="center"
                >
                  {item.text}
                </StyledText>
              </StyledTableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribeData.map(item => (
            <StyledTableRow key={item.id}>
              <StyledTableCell align="center">
                {item.rowNum}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.advertiserName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.advertiserEmail}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.advertiserTel}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.planName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.planPriceMonth}
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center" color={item.coupon ? Colors.green : Colors.red}>
                  {item.coupon ? '사용' : '미사용'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.startDate || '-'}
              </StyledTableCell>
              <StyledTableCell align="center">
                {item.finishDate || '-'}
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center" color={item.status === '1' ? Colors.red : Colors.green}>
                  {item.status === '1' ? '대기' : '승인'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={event => openDialog(item.id)}>
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
      <SubscriptionDialog
        open={editDialog}
        handleClose={toggleEditDialog}
        subData={subscribeData}
        getSubData={getSubscribtions}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </Box>
  );
}

export default SubscriptionList;
