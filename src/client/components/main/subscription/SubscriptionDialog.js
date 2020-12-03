import React, { useEffect, useState } from 'react';
import {
  Dialog, useMediaQuery, Grid, Box
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import StyledButton from '../../containers/StyledButton';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';
import StyledSelect from '../../containers/StyledSelect';

function addMonths(date, months) {
  const d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date;
}

function getFinishDate(date) {
  const startDate = new Date(date);
  const finishDate = addMonths(startDate, 6);
  const dd = String(finishDate.getDate()).padStart(2, '0');
  const mm = String(finishDate.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = finishDate.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
}

function SubscriptionDialog(props) {
  const {
    open, handleClose, onConfirm, selectedId
  } = props;
  const [endDate, setEndDate] = useState('정보 없습니다');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues
  } = useForm();

  const watchStart = watch('startDate');

  useEffect(() => {
    if (watchStart) {
      const finishDate = getFinishDate(watchStart);
      setEndDate(finishDate);
    }
  }, [watchStart]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledText textAlign="center" fontSize="25px" fontWeight="bold">서브스크립션 정보</StyledText>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">플랜</StyledText></Box>
            plan
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
            {endDate}
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
                  defaultValue="1"
                  name="status"
                  control={control}
                />
              </Grid>
            </Grid>
          </Grid>
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
