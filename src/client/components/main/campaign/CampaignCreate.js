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
import ReactFormText from '../../containers/ReactFormText';
import StyledText from '../../containers/StyledText';
import ReactFormDatePicker from '../../containers/ReactFormDatePicker';
import StyledSelect from '../../containers/StyledSelect';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import StyledImage from '../../containers/StyledImage';
import deleteIcon from '../../../img/photo_del.png';
import CKEditorComponent from '../../containers/CKEditorComponent';
import DaumPostCode from '../../containers/DaumPostCode';

const schema = Yup.object().shape({
  /* name: Yup.string()
    .required('콘텐츠 유형을 선택하세요'), */
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

  const [images, setImages] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const onSubmit = data => console.log(data);
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

  function ImageActionButton(props) {
    const {
      children, color, background, onClick, borderRadius, padding
    } = props;

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
            <Box mb={1}><StyledText color="#3f51b5">모집인원</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="name" />
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
                render={props => (
                  <RadioGroup row aria-label="gender" {...props} name="gender1">
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
            <ReactFormText register={register} errors={errors} name="advertiserName" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">카테고리</StyledText></Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Controller
                  render={props => (
                    <StyledSelect
                      native
                      {...props}
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
                      render={props => (
                        <StyledSelect
                          native
                          {...props}
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
            <TextareaAutosize ref={register} rowsMin={3} placeholder="짧은설명" name="shortDisc" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">검색키워드</StyledText></Box>
            <ReactFormText register={register} errors={errors} name="searchKeyword" />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">참여 안내 사항</StyledText></Box>
            <TextareaAutosize ref={register} rowsMin={3} placeholder="참여 안내 사항" name="discription" />
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
                    <Grid container spacing={1}>
                      {images.map(item => (
                        <Grid item key={item.id}>
                          <div style={{ position: 'relative' }}>
                            <StyledImage
                              width="130"
                              height="130"
                              borderRadius="100%"
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
            <DaumPostCode setValue={setValue} register={register} errors={errors} />
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
