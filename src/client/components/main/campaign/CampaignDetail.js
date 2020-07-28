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
  Typography
} from '@material-ui/core';
import axios from 'axios';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableRow from '../../containers/StyledTableRow';
import RequestDialog from './RequestDialog';
import StyledTitle from '../../containers/StyledTitle';

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
  const [reqState, setReqState] = useState(1);
  const [dialog, setDialog] = useState(false);
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

  const EnhancedTableToolbar = () => (
    <Grid container justify="space-between">
      <Grid item>
        <StyledTitle title="인플루언서 요청 리스트" />
      </Grid>
      <Grid item>
        {selected.length > 0 ? (
          <div>{selected.length}</div>
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
      setReqState(stateCategory[NOTI_STATE].value);
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
        <TableCell component="th" scope="row">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {INF_NAME}
        </TableCell>
        <TableCell align="right">{INF_EMAIL}</TableCell>
        <TableCell align="right">{INF_TEL}</TableCell>
        <TableCell align="right">{INF_BLOG_TYPE}</TableCell>
        <TableCell align="right" style={getColor(NOTI_STATE)}>{NOTI_STATE}</TableCell>
        <TableCell align="right">{NOTI_DT}</TableCell>
      </TableRow>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <EnhancedTableToolbar />
        <TableContainer component={Paper}>
          <Table aria-label="customized table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox />
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
      <Grid item md={12}>
        <Grid container justify="center">
          <Grid item md={2}>
            <Button variant="contained" color="secondary" fullWidth onClick={goBack}>이전</Button>
          </Grid>
        </Grid>
      </Grid>
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
