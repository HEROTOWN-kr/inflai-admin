import React, { useState, useEffect } from 'react';
import {
  CircularProgress, Divider, Grid, MenuItem, Select, TextField, InputAdornment, Box
} from '@material-ui/core';
import {
  Field, Form, Formik, FormikProps, getIn, FieldProps, ErrorMessage, useField
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import nameArray from '../../../lib/nameArray';

function CreateCampaign() {
  const [requestData, setRequestData] = useState({});
  const [process, setProcess] = useState(false);
  const [prices, setPrices] = useState({
    nano: '',
    micro: '',
    macro: '',
    mega: '',
    celebrity: '',
  });

  function getPrices() {
    axios.get('/api/TB_PRICE/').then((res) => {
      // console.log(res.data.data);
      const { data } = res.data;
      setPrices({
        nano: data[0].PRC_NANO,
        micro: data[0].PRC_MICRO,
        macro: data[0].PRC_MACRO,
        mega: data[0].PRC_MEGA,
        celebrity: data[0].PRC_CELEBRITY
      });
    });
  }

  useEffect(() => {
    getPrices();
  }, []);


  const mySchema = Yup.object().shape({
    type: Yup.string()
      .required('캠페인 유형을 선택해주세요'),
    sumCount: Yup.string()
      .when(['nano', 'micro', 'macro', 'mega', 'celebrity'], {
        is: (nano, micro, macro, mega, celebrity) => !(parseInt(nano, 10)) && !(parseInt(micro, 10)) && !(parseInt(macro, 10)) && !(parseInt(mega, 10)) && !(parseInt(celebrity, 10)),
        then: Yup.string().required('진행하실 인플루언서 수를 입력하세요.'),
      }),
    price: Yup.string()
      .required('상품 가격을 입력하세요')
  });

  function sumCount(values) {
    let sum = 0;

    values.map((item) => {
      if (parseInt(item, 10)) {
        sum += parseInt(item, 10);
      }
      return sum;
    });

    return sum.toString();
  }

  function getMinDate() {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}/${mm}/${dd}`;
  }

  function CalendarComponent(props) {
    const [field, meta, helpers] = useField(props.name);

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          disablePast
          // maxDate={getMaxDate()}
          name="searchDate"
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          value={meta.value}
          onChange={(value) => {
            helpers.setValue(value);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }

  function CounterComponent({
    text,
    number,
    end
  }) {
    return (
      <Grid item md={12}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <span className="result-text">{text}</span>
          </Grid>
          <Grid item>
            <span className="inf-sum">
              {number}
              {end}
            </span>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function MyTextField(props) {
    const [field, meta, helpers] = useField(props.name);

    function changeFunction(event) {
      helpers.setValue(event.target.value);
      if (props.setFieldValue && props.sum) {
        props.setFieldValue(props.sum, parseInt(event.target.value ? event.target.value : 0, 10) * prices[props.name]);
      }
    }

    return (
      <React.Fragment>
        <TextField
          name={field.name}
          id={props.label}
          value={meta.value}
          onChange={(event) => {
            changeFunction(event);
          }}
          onBlur={field.onBlur}
          fullWidth
          placeholder={props.placeholder}
          variant="outlined"
          disabled={field.name === 'email'}
          InputProps={{
            startAdornment: props.startText ? <InputAdornment disablePointerEvents position="start">{props.startText}</InputAdornment> : null,
            endAdornment: props.endText ? <InputAdornment disablePointerEvents position="end">{props.endText}</InputAdornment> : null
          }}
          helperText={meta.touched && meta.error ? (
            <span className="error-message">{meta.error}</span>
          ) : null}
        />
      </React.Fragment>
    );
  }

  return (
    <div className="request-create data-form">
      {process ? (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Formik
          initialValues={{
            type: '',
            nano: '',
            micro: '',
            macro: '',
            mega: '',
            celebrity: '',
            nanoSum: 0,
            microSum: 0,
            macroSum: 0,
            megaSum: 0,
            celebritySum: 0,
            servicePrice: 0,
            videoPrice: 0,
            sumCount: '',
            price: '',
            videoCheck: '0',
            reuse: false,

            name: '',
            startSearch: new Date(),
            searchDate: getMinDate(),
            finishDate: getMinDate(),
            presidentName: '',
            about: '',
            sponsoredItem: '',
            content: '',
            publicText: '',
            tags: '',
            photo: '',

            typeCategory: [],
            channel: [],
          }}
          enableReinitialize
          validationSchema={mySchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form>
              <Grid container spacing={5}>
                <Grid item md={12}>
                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                          홍보하실 제품명/브랜드명/서비스명을 입력하세요.
                        </label>
                      </div>
                      <MyTextField name="name" type="text" />
                    </Grid>
                    <Grid item md={6}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                              캠페인 유형을 선택하세요
                        </label>
                      </div>
                      <Select
                        value={values.type}
                        variant="outlined"
                        fullWidth
                        onChange={(event => setFieldValue('type', event.target.value))}
                      >
                        <MenuItem value="1">상품 리뷰</MenuItem>
                        <MenuItem value="2">방문 리뷰</MenuItem>
                        <MenuItem value="3">서비스 리뷰</MenuItem>
                        <MenuItem value="4">리그램</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item md={6}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                              상품 가격을 입력하세요
                        </label>
                      </div>
                      <MyTextField name="price" type="text" endText="원" />
                    </Grid>
                    <Grid item md={6}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                              제품영상촬영 서비스
                        </label>
                      </div>
                      <Select
                        value={values.videoCheck}
                        variant="outlined"
                        fullWidth
                        onChange={((event) => {
                          setFieldValue('videoCheck', event.target.value);
                          setFieldValue('videoPrice', event.target.value === '1' ? 500000 : 0);
                        })}
                      >
                        <MenuItem value="1">제품영상촬영 필요</MenuItem>
                        <MenuItem value="0">제품영상촬영 필요없음</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Divider />
                </Grid>
                <Grid item md={12}>
                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                          희망하는 인플루언서 등급별 인원 수를 설정하세요.
                        </label>
                      </div>
                      <Grid container spacing={2} className="text-right">
                        {
                          nameArray.counter().map(item => (
                            <Grid item md={12}>
                              <MyTextField
                                name={item.name}
                                startText={item.level}
                                endText="명"
                                sum={item.sum}
                                placeholder="0"
                                setFieldValue={setFieldValue}
                                type="text"
                              />
                            </Grid>
                          ))
                        }
                      </Grid>
                    </Grid>
                    <Grid item md={6}>
                      <div className="counter-result">
                        <span className="result-text">총 모집인원 </span>
                        <span className="inf-number">
                          {sumCount([values.nano, values.micro, values.macro, values.mega, values.celebrity])}
                          명
                        </span>
                      </div>
                      <Box pt={4}>
                        <Grid container spacing={1} className="counter-result">
                          {/* <CounterComponent text="총 모집인원" end="명" number={sumCount([values.nano, values.micro, values.macro, values.mega, values.celebrity])} /> */}
                          { values.nanoSum ? <CounterComponent text="총 나노 금액" end="원" number={values.nanoSum} /> : null}
                          { values.microSum ? <CounterComponent text="총 마이크로 금액" end="원" number={values.microSum} /> : null}
                          { values.macroSum ? <CounterComponent text="총 메크로 금액" end="원" number={values.macroSum} /> : null}
                          { values.megaSum ? <CounterComponent text="총 메가 금액" end="원" number={values.megaSum} /> : null}
                          { values.celebritySum ? <CounterComponent text="총 셀럽 금액" end="원" number={values.celebritySum} /> : null}
                          { values.videoPrice ? <CounterComponent text="제품영상촬영 금액" end="원" number={values.videoPrice} /> : null}
                          {/* <CounterComponent text="서비스 이용료" number="3000" end="원" /> */}
                          <Grid item md={12}>
                            <Divider />
                          </Grid>
                          <CounterComponent text="총 금액" end="원" number={`${values.nanoSum + values.microSum + values.macroSum + values.megaSum + values.celebritySum + values.videoPrice || 0}`} />
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Divider />
                </Grid>
                <Grid item md={12}>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                          인플루언서 모집 기간을 입력하세요
                        </label>
                      </div>
                      <Grid container spacing={2}>
                        <Grid item>
                          <CalendarComponent name="startSearch" />
                        </Grid>
                        <Grid item style={{ marginTop: '20px' }}>~</Grid>
                        <Grid item>
                          <CalendarComponent name="searchDate" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={12}>
                      <div className="label-holder">
                        <label htmlFor="companyName">
                          캠페인 종료일(포스팅 마감일)을 입력하세요
                        </label>
                      </div>
                      <CalendarComponent name="finishDate" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Divider />
                </Grid>
                <Grid item md={12}>
                  <div className="label-holder">
                    <label htmlFor="companyName">
                      원하시는 채널을 선택하세요
                    </label>
                  </div>

                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

      )}
    </div>
  );
}

export default CreateCampaign;
