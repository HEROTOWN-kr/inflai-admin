import React, { useState } from 'react';
import {
  Box, Grid, Paper, FormControlLabel, Checkbox, Radio, RadioGroup, FormControl, FormLabel
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactFormText from '../../containers/ReactFormText';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('콘텐츠 유형을 선택하세요'),
  /* videoType: Yup.string()
    .required('원하시는 촬영방법을 선택하세요'),
  publicText: Yup.string()
    .required('필수 작성 내용과 예시를 넣어주세요'),
  tags: Yup.string()
    .required('필수 해시태그를 2개 입력하세요'), */
});

function CampaignCreate() {
  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [blogsValues, setBlogsValues] = useState([]);
  const onSubmit = data => console.log(data);


  function handleSelect(checkedName) {
    console.log(checkedName);
    const newNames = blogsValues?.includes(checkedName)
      ? blogsValues?.filter(name => name !== checkedName)
      : [...(blogsValues ?? []), checkedName];
    setBlogsValues(newNames);
    return newNames;
  }

  return (
    <Box
      p={4}
      width={1200}
      css={{ margin: '0 auto' }}
      component={Paper}
    >
      <Box component="h1" css={{ textAlign: 'center' }}>캠페인 정보</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={1}><StyledText>모집희망SNS</StyledText></Box>
            {['인스타', '블로그', '유튜브'].map(name => (
              <FormControlLabel
                control={(
                  <Checkbox name={name} inputRef={register} />
                    )}
                key={name}
                label={name}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText>모집인원</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="name" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText>리뷰어 신청기간</StyledText></Box>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <ReactFormDatePicker
                  name="searchStart"
                  control={control}
                  setValue={setValue}
                  handleBlur={handleBlur}
                  getValues={getValues}
                />
              </Grid>
              <Grid item>~</Grid>
              <Grid item>
                <ReactFormDatePicker
                  name="searchFinish"
                  control={control}
                  setValue={setValue}
                  handleBlur={handleBlur}
                  getValues={getValues}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText>캠페인 출력상태</StyledText></Box>
            {/* <input name="Developer" type="radio" value="Yes" ref={register({ required: true })} />
            <input name="Developer" type="radio" value="No" ref={register({ required: true })} />
*/}
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <Controller
                render={props => (
                  <RadioGroup row aria-label="gender" {...props} name="gender1">
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                )}
                name="RadioGroup"
                control={control}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <button type="submit">submit</button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default CampaignCreate;
