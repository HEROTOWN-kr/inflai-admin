import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import ReactFormText from '../../containers/ReactFormText';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';
import StyledSelect from '../../containers/StyledSelect';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import CKEditorComponent from '../../containers/CKEditorComponent';
import DaumPostCode from '../../containers/DaumPostCode';
import StyledButton from '../../containers/StyledButton';
import ImageHolder from './ImageHolder';

function compareDates(date1, date2) {
  const day1 = date1.getDate();
  const day2 = date2.getDate();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 > year2) {
    return false;
  } if (year1 === year2 && month1 > month2) {
    return false;
  } if (year1 === year2 && month1 === month2 && day1 >= day2) {
    return false;
  }
  return true;
}

const schema2 = Yup.object().shape({});

function CampaignCreate(props) {
  const { goBack, match } = props;
  const campaignId = match.params.id;

  const snsTypes = [
    { name: 'insta', text: '인스타', dbValue: 'AD_INSTA' },
    { name: 'naver', text: '네이버', dbValue: 'AD_NAVER' },
    { name: 'youtube', text: '유튜브', dbValue: 'AD_YOUTUBE' },
  ];

  const [campaignData, setCampaignData] = useState({
    AD_INSTA: false,
    AD_YOUTUBE: false,
    AD_NAVER: false,
    AD_DELIVERY: false
  });
  const [campaignEditor, setCampaignEditor] = useState({});
  const [images, setImages] = useState([]);
  const [dbImages, setDbImages] = useState([]);

  const schema = Yup.object().shape({
    influencerCount: Yup.string()
      .required('모집인원수를 입력해주세요'),
    sns: Yup.string().test('snsTypeCheck', '모집회망SNS를 선택해주세요', val => campaignData.AD_INSTA === true || campaignData.AD_YOUTUBE === true || campaignData.AD_NAVER === true),
    searchFinish: Yup.date()
      .when('searchStart', (searchStart, testSchema) => testSchema.test({
        test: searchFinish => compareDates(searchStart, searchFinish),
        message: '리뷰어 신청 마감일을 시작일 이후로 설정해주세요'
      })),
    /* advertiserId: Yup.string()
      .required('등록인아이디를 입력해주세요'), */
    detailAddress: Yup.string()
      .required('상세주소를 입력해주세요'),
    phone: Yup.string()
      .required('연락처를 입력해주세요'),
    email: Yup.string()
      .required('이메일을 입력해주세요'),
    campaignName: Yup.string()
      .required('캠페인명을 입력해주세요'),
    shortDisc: Yup.string()
      .required('짧은설명을 입력해주세요'),
    searchKeyword: Yup.string()
      .required('검색키워드를 입력해주세요'),
    discription: Yup.string()
      .required('참여 안내 사항을 입력해주세요'),
  });

  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: { RadioGroup: '0', visible: '0' }
  });

  const onSubmit = async (data) => {
    try {
      const obj = {
        ...data,
        insta: campaignData.AD_INSTA ? 1 : 0,
        youtube: campaignData.AD_YOUTUBE ? 1 : 0,
        naver: campaignData.AD_NAVER ? 1 : 0,
        delivery: campaignData.AD_DELIVERY ? 1 : 0
      };

      if (campaignId) {
        await axios.post('/api/TB_AD/update', { ...obj, campaignId });
        if (images.length > 0) {
          const uploaders = images.map((item) => {
            const formData = new FormData();
            formData.append('file', item.file);
            formData.append('id', campaignId);
            return axios.post('/api/TB_PHOTO_AD/uploadImage', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => ('sucess')).catch(error => ('error'));
          });
          axios.all(uploaders).then(() => {
            goBack();
          });
        } else {
          goBack();
        }
      } else {
        axios.post('/api/TB_AD/create', obj).then((res) => {
          if (images.length > 0) {
            const id = res.data.data.AD_ID;
            const uploaders = images.map((item) => {
              const formData = new FormData();
              formData.append('file', item.file);
              formData.append('id', id);
              return axios.post('/api/TB_PHOTO_AD/uploadImage', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              }).then(response => ('sucess')).catch(error => ('error'));
            });
            axios.all(uploaders).then(() => {
              goBack();
            });
          } else {
            goBack();
          }
        }).catch((error) => {
          alert(error.response.data);
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  const onSubmit2 = (data) => {
    console.log(data);
  };

  const getType = watch('type');


  async function getCampaignData() {
    try {
      const response = await axios.get('/api/TB_AD/detail', { params: { id: match.params.id } });
      const { data } = response.data;
      const {
        AD_NAME, AD_CTG, AD_CTG2, AD_DELIVERY, AD_DETAIL, AD_DETAIL_ADDR,
        AD_DISC, AD_DT, AD_EMAIL, AD_EXTR_ADDR, AD_ID, AD_INF_CNT, AD_INSTA,
        AD_NAVER, AD_POST_CODE, AD_PROVIDE, AD_ROAD_ADDR, AD_SEARCH_KEY,
        AD_SHRT_DISC, AD_SRCH_END, AD_SRCH_START, AD_TEL, AD_VISIBLE,
        AD_YOUTUBE, TB_PHOTO_ADs
      } = data;
      // debugger;
      setCampaignData({
        ...campaignData,
        AD_INSTA: AD_INSTA === 1,
        AD_NAVER: AD_NAVER === 1,
        AD_YOUTUBE: AD_YOUTUBE === 1,
        AD_DELIVERY,
        AD_DETAIL,
        AD_PROVIDE
      });
      if (TB_PHOTO_ADs && TB_PHOTO_ADs.length > 0) setDbImages(TB_PHOTO_ADs);

      setValue('campaignName', AD_NAME);
      setValue('type', AD_CTG);
      setValue('subtype', AD_CTG2);
      setValue('detailAddress', AD_DETAIL_ADDR);
      setValue('discription', AD_DISC);
      setValue('email', AD_EMAIL);
      setValue('extraAddress', AD_EXTR_ADDR);
      setValue('influencerCount', AD_INF_CNT);
      setValue('postcode', AD_POST_CODE);
      setValue('roadAddress', AD_ROAD_ADDR);
      setValue('searchKeyword', AD_SEARCH_KEY);
      setValue('shortDisc', AD_SHRT_DISC);
      setValue('searchFinish', new Date(AD_SRCH_END));
      setValue('searchStart', new Date(AD_SRCH_START));
      setValue('phone', AD_TEL);
      setValue('visible', AD_VISIBLE);
      setValue('RadioGroup', '1');
    } catch (err) {
      alert(err);
    }
  }

  /* useEffect(() => {
    setValue('RadioGroup', '1');
  }, [campaignData]); */

  useEffect(() => {
    register({ name: 'image' }, {});
    register({ name: 'detailInfo' }, {});
    register({ name: 'provideInfo' }, {});
  }, [register]);

  useEffect(() => {
    if (campaignId) {
      getCampaignData();
    }
  }, []);

  useEffect(() => {
    if (campaignEditor.detailInfo && campaignData.AD_DETAIL) {
      campaignEditor.detailInfo.data.set(campaignData.AD_DETAIL);
    }
    if (campaignEditor.provideInfo && campaignData.AD_PROVIDE) {
      campaignEditor.provideInfo.data.set(campaignData.AD_PROVIDE);
    }
  }, [campaignData]);

  return (
    <Box
      mt={4}
      p={4}
      width={1200}
      css={{ margin: '0 auto', boxSizing: 'border-box' }}
      component={Paper}
    >
      <Box component="h1" css={{ textAlign: 'center' }}>캠페인 정보</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">모집희망SNS</StyledText></Box>
            {snsTypes.map(item => (
              <FormControlLabel
                control={(
                  <Checkbox checked={!!campaignData[item.dbValue]} onChange={event => setCampaignData({ ...campaignData, [item.dbValue]: event.target.checked })} />
                      )}
                key={item.name}
                label={item.text}
              />
            ))}
            <input
              type="text"
              readOnly
              name="sns"
              ref={register}
              style={{
                opacity: '0', width: '0', padding: '0', border: '0', height: '0'
              }}
            />
            {
              errors.sns ? (
                <div className="error-message">{errors.sns.message}</div>
              ) : null
            }
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">모집인원</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="influencerCount" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">리뷰어 신청기간</StyledText></Box>
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
            {
              errors.searchFinish ? (
                <div className="error-message">{errors.searchFinish.message}</div>
              ) : null
            }
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">제공상품 배송여부</StyledText></Box>
            {/* <FormControlLabel
              control={(<Checkbox name="delivery" inputRef={register} />)}
              label="배송형 상품"
            /> */}
            <FormControlLabel
              control={(
                <Checkbox checked={!!campaignData.AD_DELIVERY} onChange={event => setCampaignData({ ...campaignData, AD_DELIVERY: event.target.checked })} />
                )}
              label="배송형 상품"
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">캠페인 출력상태</StyledText></Box>
            <Controller
              as={(
                <RadioGroup row aria-label="gender">
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="대기상태"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="노출상태"
                  />
                </RadioGroup>
              )}
              name="visible"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">등록인아이디</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="advertiserId" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">카테고리</StyledText></Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Controller
                  render={controllerProps => (
                    <StyledSelect
                      native
                      {...controllerProps}
                      variant="outlined"
                      fullWidth
                    >
                      {AdvertiseTypes.mainType.map((item, index) => <option key={index} value={index}>{item}</option>)}
                    </StyledSelect>
                  )}
                  defaultValue={0}
                  name="type"
                  control={control}
                />
              </Grid>
              {
                AdvertiseTypes.subType[getType] ? (
                  <Grid item xs={2}>
                    <Controller
                      render={controllerProps => (
                        <StyledSelect
                          native
                          {...controllerProps}
                          variant="outlined"
                          fullWidth
                        >
                          {AdvertiseTypes.subType[getType].map((item, index) => <option key={index} value={index}>{item}</option>)}
                        </StyledSelect>
                      )}
                      defaultValue={0}
                      name="subtype"
                      control={control}
                    />
                  </Grid>
                ) : null
              }
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">주소</StyledText></Box>
            <DaumPostCode setValue={setValue} register={register} errors={errors} />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">연락처</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="phone" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">이메일</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="email" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">캠페인명</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="campaignName" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">짧은설명</StyledText></Box>
            <TextareaAutosize ref={register} rowsMin={8} style={{ width: '99%' }} placeholder="짧은설명" name="shortDisc" />
            {
              errors.shortDisc ? (
                <div className="error-message">{errors.shortDisc.message}</div>
              ) : null
            }
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">검색키워드</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="searchKeyword" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">참여 안내 사항</StyledText></Box>
            <TextareaAutosize ref={register} rowsMin={8} style={{ width: '99%' }} placeholder="참여 안내 사항" name="discription" />
            {
              errors.discription ? (
                <div className="error-message">{errors.discription.message}</div>
              ) : null
            }
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">이미지 업로드</StyledText></Box>
            <Box border="1px solid #0000003b" p={3}>
              <ImageHolder setValue={setValue} images={images} setImages={setImages} dbImages={dbImages} setDbImages={setDbImages} campaignId={campaignId} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">상세정보</StyledText></Box>
            <CKEditorComponent setValue={setValue} name="detailInfo" control={control} campaignEditor={campaignEditor} setCampaignEditor={setCampaignEditor} />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">제공내역 상세정보</StyledText></Box>
            <CKEditorComponent setValue={setValue} name="provideInfo" control={control} campaignEditor={campaignEditor} setCampaignEditor={setCampaignEditor} />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={2}><StyledButton onClick={goBack}>취소</StyledButton></Grid>
              <Grid item xs={2}><StyledButton onClick={handleSubmit(onSubmit)}>저장하기</StyledButton></Grid>
              {/* <Grid item xs={2}><StyledButton onClick={handleSubmit(onSubmit2)}>test</StyledButton></Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default CampaignCreate;
