import React from "react";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Dialog, Grid } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { axiosInstance as axios } from "@lib/axiosInstance";
import StyledButton from "../../containers/StyledButton";
import { Colors } from "../../../lib/Сonstants";
import StyledText from "../../containers/StyledText";
import ReactFormText from "../../containers/ReactFormText";

const PREFIX = "SellUrlDialog";

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.root}`]: {
    position: "absolute",
    top: "15px",
    right: "14px",
    fontSize: "28px",
    color: "#b9b9b9de",
    cursor: "pointer",
  },
  [`& .${classes.paper}`]: {
    margin: "12px",
    width: "100%",
    borderRadius: "2px",
  },
});

const defaultValues = {
  url: "",
};

const schema = Yup.object().shape({
  url: Yup.string()
    .required("판매링크 URL를 입력해주세요")
    .test("snsTypeCheck", "올바른 URL이 아닙니다. URL을 확인해주세요.", (val) => val.indexOf("http://") === 0 || val.indexOf("https://") === 0),
});

export default function SellUrlDialog(props) {
  const { open, closeDialog, selected, getParticipants } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onConfirmFunc = ({ url }) => {
    // logic save
    const apiObj = { participantId: selected.id, url };
    axios
      .post("/TB_PARTICIPANT/saveSellUrl", apiObj)
      .then((res) => {
        getParticipants();
        reset(defaultValues);
        closeDialog();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  function onDialogClose() {
    reset(defaultValues);
    closeDialog();
  }

  function checkUrl() {
    reset({ url: selected.sellUrl });
  }

  return (
    <StyledDialog
      // fullScreen={fullScreen}
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onDialogClose}
      maxWidth="xs"
      aria-labelledby="responsive-dialog-title"
      TransitionProps={{
        onEntered: checkUrl,
      }}
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        판매링크 등록
        <Clear onClick={onDialogClose} classes={{ root: classes.root }} />
      </Box>
      <Box padding="20px">
        <Box mb={2}>
          <Box mb={1}>
            <StyledText color="#3f51b5">판매링크 URL</StyledText>
          </Box>
          <ReactFormText
            register={register}
            errors={errors}
            name="url"
            placeholder="예시) https://herotownshop.cafe24.com/product/detail.html?product_no=10&cate_no=1&display_group=2"
          />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Box width="100px">
              <StyledButton height={38} padding="0" onClick={onDialogClose}>
                닫기
              </StyledButton>
            </Box>
          </Grid>
          <Grid item>
            <Box width="100px">
              <StyledButton height={38} padding="0" onClick={handleSubmit(onConfirmFunc)}>
                저장
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StyledDialog>
  );
}
