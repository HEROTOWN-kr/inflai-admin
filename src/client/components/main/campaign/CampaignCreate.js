import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  MenuItem,
  TextareaAutosize,
  Divider
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { all } from 'async';
import axios from 'axios';
import ReactFormText from '../../containers/ReactFormText';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';
import StyledSelect from '../../containers/StyledSelect';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import StyledImage from '../../containers/StyledImage';
import deleteIcon from '../../../img/photo_del.png';
import CKEditorComponent from '../../containers/CKEditorComponent';
import DaumPostCode from '../../containers/DaumPostCode';
import StyledButton from '../../containers/StyledButton';

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

const schema = Yup.object().shape({
  influencerCount: Yup.string()
    .required('모집인원수를 입력해주세요'),
  insta: Yup.bool()
    .when(['naver', 'youtube'], {
      is: (naver, youtube) => !naver && !youtube,
      then: Yup.bool().oneOf([true], '모집회망SNS를 선택해주세요'),
    }),
  searchFinish: Yup.date()
    .when('searchStart', (searchStart, testSchema) => testSchema.test({
      test: searchFinish => compareDates(searchStart, searchFinish),
      message: '리뷰어 신청 마감일을 시작일 이후로 설정해주세요'
    })),
  advertiserId: Yup.string()
    .required('등록인아이디를 입력해주세요'),
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

const schema2 = Yup.object().shape({});

function CampaignCreate(props) {
  const { goBack } = props;
  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema2)
  });

  const snsTypes = [
    { name: 'insta', text: '인스타' },
    { name: 'naver', text: '네이버' },
    { name: 'youtube', text: '유튜브' },
  ];

  const [images, setImages] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const onSubmit = (data) => {
    const {
      insta, youtube, naver, delivery
    } = data;

    const obj = {
      ...data,
      insta: insta ? 1 : 0,
      youtube: youtube ? 1 : 0,
      naver: naver ? 1 : 0,
      delivery: delivery ? 1 : 0
    };

    axios.post('/api/TB_AD/create', obj).then((res) => {
      console.log(res.data);
    }).catch((error) => { alert(error.response.data); });
  };

  const getType = watch('type');
  const deleteBtn = {
    width: '26px',
    height: '26px',
    position: 'absolute',
    display: 'inline-block',
    top: '5px',
    right: ' 6px',
    backgroundImage: `url(${deleteIcon})`,
    textIndent: '-10000px',
    cursor: 'pointer'
  };

  useEffect(() => {
    register({ name: 'image' }, {});
    register({ name: 'detailInfo' }, {});
    register({ name: 'provideInfo' }, {});
  }, [register]);

  function addPicture(event) {
    const { files } = event.target;
    setValue('image', files);
    const dateNow = Date.now();

    const imagesArray = Array.from(files).map((item, index) => {
      const picUrl = URL.createObjectURL(item);
      return {
        id: dateNow + item.name,
        file: item,
        url: picUrl,
        checked: false
      };
    });
    setImages(images.concat(imagesArray));
  }

  function selectImage(id) {
    const imagesArray = images.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setImages(imagesArray);
  }

  function selectAll() {
    let imagesArray;
    if (allSelected) {
      imagesArray = images.map(item => ({ ...item, checked: false }));
    } else {
      imagesArray = images.map(item => ({ ...item, checked: true }));
    }
    setImages(imagesArray);
    setAllSelected(!allSelected);
  }

  function deletePicture(id) {
    const filterImages = images.filter(image => image.id !== id);
    setImages(filterImages);
  }

  function deleteSelected() {
    const filterImages = images.filter(image => !image.checked);
    setImages(filterImages);
  }

  function ImageActionButton(componentProps) {
    const {
      children, color, background, onClick, borderRadius, padding
    } = componentProps;

    const styles = {
      cursor: 'pointer',
      background: background || Colors.blue2,
      color: color || '#ffffff',
      borderRadius: borderRadius || 0,
      fontSize: '14px',
      padding: padding || '3px 16px'
    };

    return (
      <div style={styles} onClick={onClick}>
        {children}
      </div>
    );
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
            <Box mb={1}><StyledText color="#3f51b5">모집희망SNS</StyledText></Box>
            {snsTypes.map(item => (
              <FormControlLabel
                control={(
                  <Checkbox name={item.name} inputRef={register} />
                    )}
                key={item.name}
                label={item.text}
              />
            ))}
            {
              errors.insta ? (
                <div className="error-message">{errors.insta.message}</div>
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
            <FormControlLabel
              control={(<Checkbox name="delivery" inputRef={register} />)}
              label="배송형 상품"
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">캠페인 출력상태</StyledText></Box>
            <FormControl component="fieldset">
              <Controller
                render={controllerProps => (
                  <RadioGroup row aria-label="gender" {...controllerProps} name="visible" onChange={event => console.log(event.target.value)}>
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
                defaultValue="0"
                name="visible"
                control={control}
              />
            </FormControl>
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
            <Box
              border="1px solid #0000003b"
              p={3}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {images.length > 0 ? (
                    <Grid container spacing={2}>
                      {images.map(item => (
                        <Grid item key={item.id}>
                          <div style={{ position: 'relative' }}>
                            <StyledImage
                              width="130"
                              height="130"
                              borderRadius="12px"
                              src={item.url}
                            />
                            <span onClick={() => deletePicture(item.id)} style={deleteBtn}>button</span>
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => selectImage(item.id)}
                              style={{
                                position: 'absolute',
                                top: '3px',
                                left: '3px'
                              }}
                            />
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  ) : <React.Fragment>이미지 없습니다</React.Fragment>
                    }
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <label htmlFor="image">
                        <ImageActionButton padding="13px 22px">
                              파일추가
                          <input
                            id="image"
                            name="image"
                            type="file"
                            style={{ display: 'none' }}
                            multiple
                            accept="image/*"
                            onChange={(event => addPicture(event))}
                          />
                        </ImageActionButton>
                      </label>
                    </Grid>
                    {
                      images.length > 0 ? (
                        <React.Fragment>
                          <Grid item>
                            <ImageActionButton onClick={deleteSelected} padding="13px 22px">선택삭제</ImageActionButton>
                          </Grid>
                          <Grid item>
                            <ImageActionButton onClick={selectAll} padding="13px 22px">모두선택</ImageActionButton>
                          </Grid>
                        </React.Fragment>

                      ) : null
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">상세정보</StyledText></Box>
            <CKEditorComponent setValue={setValue} name="detailInfo" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">제공내역 상세정보</StyledText></Box>
            <CKEditorComponent setValue={setValue} name="provideInfo" />
          </Grid>
          <Grid item xs={12}>
            {/* <button type="submit">submit</button> */}
            <Grid container justify="center" spacing={1}>
              <Grid item xs={2}><StyledButton onClick={goBack}>취소</StyledButton></Grid>
              <Grid item xs={2}><StyledButton onClick={handleSubmit(onSubmit)}>저장하기</StyledButton></Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default CampaignCreate;
