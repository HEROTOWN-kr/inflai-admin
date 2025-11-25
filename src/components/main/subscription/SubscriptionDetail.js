import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';
import StyledSelect from '../../containers/StyledSelect';
import { AdvertiseTypes } from '../../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';

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

function SubscriptionDetail(props) {
  const { match } = props;
  const subId = match.params.id;
  const [subData, setSubData] = useState({});
  const [endDate, setEndDate] = useState('정보 없습니다');

  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues
  } = useForm({
    mode: 'onBlur',
    // resolver: yupResolver(schema2),
    // defaultValues: { RadioGroup: '0', visible: '0' }
  });

  const watchStart = watch('startDate');

  useEffect(() => {
    if (watchStart) {
      const finishDate = getFinishDate(watchStart);
      setEndDate(finishDate);
    }
  }, [watchStart]);

  async function getSubData() {
    try {
      const response = await axios.get('/api/TB_SUBSCRIPTION/detail', { params: { id: match.params.id } });
      const { data } = response.data;
      console.log(data);
      const {
        SUB_ID, SUB_START_DT, SUB_END_DT, SUB_STATUS, TB_PLAN
      } = data;
      const { PLN_NAME } = TB_PLAN;

      setSubData({ plan: PLN_NAME });

      setValue('startDate', SUB_START_DT);
      setValue('status', SUB_STATUS);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (subId) {
      getSubData();
    }
  }, []);

  const onSubmit = async (data) => {
    const { status, startDate } = data;
    const post = {
      id: subId,
      status,
      startDate,
      endDate: endDate.replace(/\//g, '-')
    };
    axios.post('/api/TB_SUBSCRIPTION/update', post).then((res) => {
      // alert('success');
    }).catch((err) => {
      alert(err.response.data.message);
    });
  };

  return (
    <Box
      p={4}
      width={1200}
      css={{ margin: '0 auto' }}
      component={Paper}
    >
      <Box component="h1" css={{ textAlign: 'center' }}>서브스크립션 정보</Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">플랜</StyledText></Box>
          {subData.plan}
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
            <Grid item xs={2}>
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
          <Grid container>
            <Grid item>
              <StyledButton onClick={handleSubmit(onSubmit)}>수정</StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SubscriptionDetail;
