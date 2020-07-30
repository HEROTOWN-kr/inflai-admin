import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Snackbar
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import RequestDialog from './RequestDialog';
import StyledTitle from '../../containers/StyledTitle';
import Alert from '../../containers/Alert';
import StyledCheckBox from '../../containers/StyledCheckBox';
import StyledSelect from '../../containers/StyledSelect';

const tableHeader = [
  {
    text: '이름',
    align: 'left'
  },
  {
    text: '이메일',
    align: 'right'
  },
  {
    text: '전화번호',
    align: 'right'
  },
  {
    text: '소셜',
    align: 'right'
  },
  {
    text: '상태',
    align: 'right'
  },
  {
    text: '요청날짜',
    align: 'right'
  },
];

const stateCategory = [
  {
    text: '승인',
    value: 1
  },
  {
    text: '거절',
    value: 2
  },
  {
    text: '대기중',
    value: 3
  }
];

function CampaignDetail(props) {
  const { match, goBack } = props;
  const [requests, setRequests] = useState({});
  const [reqState, setReqState] = useState('0');
  const [dialog, setDialog] = useState(false);
  const [message, setMessage] = useState({
    open: false,
    text: '',
    type: 'success'
  });
  const [requestToChange, setRequestToChange] = useState(0);
  const [selected, setSelected] = React.useState([]);

  function toggleDialog() {
    setDialog(!dialog);
  }

  function getStatistic() {
    axios.get('/api/TB_NOTIFICATION/getRequests', {
      params: {
        id: match.params.id
      }
    }).then((res) => {
      const { data } = res.data;
      console.log(data);
      setRequests(data);
    });
  }

  useEffect(() => {
    getStatistic();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Object.keys(requests).map(n => requests[n].NOTI_ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const clickOnTableRow = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const messageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage({ ...message, open: false });
  };

  function changeState() {
    if (reqState !== '0') {
      axios.post('/api/TB_NOTIFICATION/changeState', { id: selected, state: reqState }).then((res) => {
        if (res.data.code === 200) {
          setReqState('0');
          setSelected([]);
          setMessage({ type: 'success', open: true, text: '저장되었습니다' });
          getStatistic();
        } else if (res.data.code === 401) {
          console.log(res);
        } else {
          console.log(res);
        }
      }).catch(error => (error));
    } else {
      setMessage({ type: 'error', open: true, text: '상태선택해주세요' });
    }
  }

  const EnhancedTableToolbar = () => (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <StyledTitle title="인플루언서 요청 리스트" />
      </Grid>
      <Grid item>
        {selected.length > 0 ? (
          <FormControl
            fullWidth
            variant="outlined"
          >
            <StyledSelect
              value={reqState}
              onChange={(event => setReqState(event.target.value))}
            >
              <MenuItem value="0">상태선택</MenuItem>
              <MenuItem value="1">승인</MenuItem>
              <MenuItem value="2">거절</MenuItem>
              <MenuItem value="3">대기중</MenuItem>
            </StyledSelect>
          </FormControl>

        ) : null}
      </Grid>
    </Grid>
  );

  function MyTableRow(fnProps) {
    const { data } = fnProps;
    const {
      NOTI_ID, NOTI_STATE, NOTI_DT, TB_INFLUENCER
    } = data;

    const {
      INF_NAME, INF_EMAIL, INF_TEL, INF_BLOG_TYPE
    } = TB_INFLUENCER;

    function getColor(state) {
      if (state === '대기중') {
        return {
          color: '#ff9510'
        };
      } if (state === '승인') {
        return {
          color: '#8bce7f'
        };
      }
      return {
        color: 'red'
      };
    }

    const isSelected = id => selected.indexOf(id) !== -1;
    const isItemSelected = isSelected(NOTI_ID);
    const labelId = `enhanced-table-checkbox-${NOTI_ID}`;

    function openDialog() {
      setRequestToChange({ ...data });
      // setReqState(stateCategory[NOTI_STATE].value);
      setDialog(true);
    }

    return (
      <TableRow
        hover
        // onClick={() => openDialog(data)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        onClick={event => clickOnTableRow(event, NOTI_ID)}
        selected={isItemSelected}
      >
        <StyledTableCell component="th" scope="row">
          <StyledCheckBox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {INF_NAME}
        </StyledTableCell>
        <StyledTableCell align="right">{INF_EMAIL}</StyledTableCell>
        <StyledTableCell align="right">{INF_TEL}</StyledTableCell>
        <StyledTableCell align="right">{INF_BLOG_TYPE}</StyledTableCell>
        <StyledTableCell align="right" style={getColor(NOTI_STATE)}>{NOTI_STATE}</StyledTableCell>
        <StyledTableCell align="right">{NOTI_DT}</StyledTableCell>
      </TableRow>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <EnhancedTableToolbar />
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <StyledCheckBox
                    indeterminate={selected.length > 0 && selected.length < requests.length}
                    checked={requests.length > 0 && selected.length === requests.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </StyledTableCell>
                {tableHeader.map(item => (
                  <StyledTableCell key={item.text} align={item.align}>{item.text}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(requests).map(key => (
                <MyTableRow key={requests[key].NOTI_ID} data={requests[key]} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={4} container justify="space-between">
            <Grid item xs={5}>
              <Button variant="contained" color="secondary" fullWidth onClick={goBack}>이전</Button>
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" color="primary" fullWidth onClick={changeState}>저장</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={messageClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={messageClose} severity={message.type}>
          {message.text}
        </Alert>
      </Snackbar>
      {/* <RequestDialog
        open={dialog}
        close={toggleDialog}
        changeState={changeState}
        state={reqState}
        setState={setReqState}
        stateCategory={stateCategory}
        info={requestToChange}
      /> */}
    </Grid>
  );
}

export default CampaignDetail;
