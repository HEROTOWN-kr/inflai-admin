import React, { useEffect, useState } from 'react';
import {
  Dialog, useMediaQuery, Grid, Box, Divider
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import StyledButton from '../../containers/StyledButton';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';
import StyledSelect from '../../containers/StyledSelect';

function getFinishDate(date, month) {
  const startDate = new Date(date);
  return new Date(startDate.setMonth(startDate.getMonth() + month));
}

const defaultValues = {
  startDate: new Date(),
  endDate: new Date(),
  status: '1'
};

function SubscriptionDialog(props) {
  const {
    open, handleClose, getSubData, setMessage, subData, selectedId
  } = props;
  const [dialogData, setDialogData] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    reset, handleSubmit, handleBlur, watch, errors, setValue, control, getValues
  } = useForm({ defaultValues });

  const watchStart = watch('startDate');

  useEffect(() => {
    if (watchStart) {
      const finishDate = getFinishDate(watchStart, dialogData.planMonth);
      setValue('endDate', new Date(finishDate));
    } else {
      setValue('endDate', null);
    }
  }, [watchStart]);

  function dialogClose() {
    setDialogData({});
    handleClose();
  }

  const onSubmit = (data) => {
    const { status, startDate, endDate } = data;

    const post = {
      id: dialogData.id,
      status,
      startDate,
      endDate
      // endDate: endDate.replace(/\//g, '-')
    };
    axios.post('/api/TB_SUBSCRIPTION/update', post).then((res) => {
      setMessage({ type: 'success', open: true, text: '저장되었습니다' });
      getSubData();
      dialogClose();
    }).catch((err) => {
      alert(err.response.data.message);
    });
  };

  function onDialogOpen() {
    if (selectedId) {
      const data = subData.filter(item => item.id === selectedId);
      if (data[0]) {
        reset({
          startDate: data[0].startDate ? new Date(data[0].startDate) : null,
          endDate: data[0].finishDate ? new Date(data[0].finishDate) : null,
          status: data[0].status
        });
        setDialogData(data[0]);
      }
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      open={open}
      onEnter={onDialogOpen}
      onClose={dialogClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledText textAlign="center" fontSize="25px" fontWeight="bold">서브스크립션 정보</StyledText>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">플랜</StyledText></Box>
            {dialogData.planName}
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">시작 날짜</StyledText></Box>
            <ReactFormDatePicker
              name="startDate"
              control={control}
              setValue={setValue}
              handleBlur={handleBlur}
              getValues={getValues}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">마감 날짜</StyledText></Box>
            <ReactFormDatePicker
              name="endDate"
              disabled
              control={control}
              setValue={setValue}
              handleBlur={handleBlur}
              getValues={getValues}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">상태</StyledText></Box>
            <Grid container>
              <Grid item xs={6}>
                <Controller
                  render={controllerProps => (
                    <StyledSelect
                      native
                      {...controllerProps}
                      variant="outlined"
                      fullWidth
                    >
                      <option value="2">승인</option>
                      <option value="1">대기</option>
                    </StyledSelect>
                  )}
                  name="status"
                  control={control}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <StyledButton
                  background="#ff005b"
                  hoverBackground="#e00452"
                  height="36px"
                  fontSize="16px"
                  padding="0 20px"
                  onClick={handleClose}
                >
                  취소
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton
                  height="36px"
                  fontSize="16px"
                  padding="0 20px"
                  onClick={handleSubmit(onSubmit)}
                >
                  수정
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default SubscriptionDialog;
