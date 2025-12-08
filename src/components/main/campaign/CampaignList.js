import React, { useEffect, useState } from "react";
import { CircularProgress, IconButton, InputAdornment, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Create, Delete, Edit, FileCopy } from "@mui/icons-material";
import { axiosInstance as axios } from "@lib/axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import StyledTableCell from "../../containers/StyledTableCell";
import StyledTableRow from "../../containers/StyledTableRow";
import MyPagination from "../../containers/MyPagination";
import StyledButton from "../../containers/StyledButton";
import { AdvertiseTypes, Colors } from "../../../lib/Сonstants";
import StyledText from "../../containers/StyledText";
import defaultAccountImage from "../../../img/default_account_image.png";
import ConfirmDialog from "../../containers/ConfirmDialog";
import StyledImage from "../../containers/StyledImage";
import ReactFormText from "../../containers/ReactFormText";
import Select from "@mui/material/Select";
import CopyDialog from "./CopyDialog";
import { useNavigate, useOutletContext } from "react-router-dom";

const tableHeader = [
  {
    text: "번호",
    align: "center",
    width: "60px",
  },
  {
    text: "id",
    align: "center",
    width: "50px",
  },
  {
    text: "캠페인정보",
    align: "center",
  },
  {
    text: "신청/선정/후기",
  },
  {
    text: "등록/옵션기간",
    align: "center",
  },
  {
    text: "관리자툴",
    align: "center",
    width: "150px",
  },
];

const snsTypes = {
  1: {
    text: "Instagram",
    color: Colors.pink,
  },
  2: {
    text: "Youtube",
    color: Colors.red,
  },
  3: {
    text: "Blog",
    color: Colors.green,
  },
  5: {
    text: "리뷰어",
    color: Colors.aqua,
  },
};

function CampaignList(props) {
  const { history, match, setTab } = useOutletContext();
  const [type, setType] = useState("0");
  const [limit, setLimit] = useState(5);
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyDialog, setCopyDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // const limit = 5;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: { searchValue: "" },
  });

  function searchFunc(data) {
    const { searchValue } = data;
    setPage(1);
    setSearchWord(searchValue);
  }

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleCopyDialog() {
    setCopyDialog(!copyDialog);
  }

  async function getCampaigns() {
    setLoading(true);
    try {
      const params = { page, limit };
      if (type !== "0") params.type = type;
      if (searchWord.length > 0) params.searchWord = searchWord;

      const response = await axios.get("/TB_AD/getAll", { params });
      const { campaignsRes, countRes } = response.data.data;
      const campaignsArray = campaignsRes.map((item) => {
        const {
          AD_ID,
          AD_NAME,
          AD_CTG,
          AD_CTG2,
          AD_DT,
          AD_INF_CNT,
          AD_CAM_TYPE,
          TB_PHOTO_ADs,
          AD_TYPE,
          AD_REPORT,
          PAR_SEL_CNT,
          PAR_REVIEW_CNT,
          TB_PARTICIPANTs,
          rownum,
        } = item;

        const returnObj = {
          id: AD_ID,
          type: AD_TYPE,
          campaignName: AD_NAME,
          campaignType: AD_CAM_TYPE,
          category: AD_CTG,
          subcategory: AD_CTG2,
          createDate: AD_DT,
          photo: TB_PHOTO_ADs,
          infCnt: AD_INF_CNT,
          regCnt: TB_PARTICIPANTs.length,
          reviewCnt: PAR_REVIEW_CNT,
          selCnt: PAR_SEL_CNT,
          rownum,
        };
        if (AD_REPORT === "1") returnObj.report = true;

        return returnObj;
      });
      setCampaigns(campaignsArray);
      setCount(countRes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function deleteDbPicture() {
    axios
      .post("/TB_AD/deleteAWS", { id: selectedCampaign })
      .then((res) => {
        setSelectedCampaign(0);
        getCampaigns();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function copyCampaign(id) {
    setSelectedCampaign(id);
    toggleCopyDialog();
  }

  function campaignDetail(event, id) {
    navigate(`${props.match.path}/${id}`);
  }

  function campaignParticipant(id, type) {
    if (type === "1") {
      navigate(`/Campaign/ParInsta/${id}`);
    } else if (type === "2") {
      navigate(`/Campaign/ParYoutube/${id}`);
    } else if (type === "3") {
      navigate(`/Campaign/ParBlog/${id}`);
    } else if (type === "5") {
      navigate(`/Campaign/ParReview/${id}`);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, [page, type, searchWord, limit]);

  useEffect(() => setTab(0), []);

  const changePage = (event, value) => {
    setPage(value);
  };

  const changeType = (event) => {
    setType(event.target.value);
  };

  const changeLimit = (event) => {
    setLimit(event.target.value);
  };

  return (
    <div className="mx-auto max-w-[1276px]">
      <div className="mb-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <Select size={"small"} sx={{ background: "white" }} native variant="outlined" fullWidth value={type} onChange={changeType}>
              <option value="0">전체</option>
              <option value="1">인스타</option>
              <option value="2">유튜브</option>
              <option value="3">블로그</option>
            </Select>
          </div>
          <div>
            <div className="w-[300px]">
              <ReactFormText
                size="small"
                register={register}
                control={control}
                errors={errors}
                name="searchValue"
                placeholder="검색"
                InputProps={{
                  className: "bg-white",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSubmit(searchFunc)} size="large" className="p-2">
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    handleSubmit(searchFunc)();
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select native variant="outlined" size={"small"} sx={{ background: "white" }} fullWidth value={limit} onChange={changeLimit}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={100}>100</option>
            </Select>
            <StyledButton
              height={40}
              padding="0 20px"
              background="#0fb359"
              hoverBackground="#107C41"
              startIcon={<Create />}
              onClick={() => navigate(`../create`)}
            >
              캠페인 등록
            </StyledButton>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="min-h-[500px]">
          <div className="flex min-h-[inherit] items-center justify-center">
            <CircularProgress />
          </div>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableHeader.map((item) => (
                  <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                    {item.text}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((row) => (
                <StyledTableRow key={row.id} onClick={(event) => {}}>
                  <StyledTableCell align="center">
                    <StyledText textAlign="center">{row.rownum}</StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StyledText textAlign="center">{row.id}</StyledText>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="flex gap-3">
                      <div className="flex-none">
                        <StyledImage
                          width="80px"
                          height="80px"
                          src={row.photo.length > 0 ? row.photo[0].PHO_FILE_URL : defaultAccountImage}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${defaultAccountImage}`;
                          }}
                        />
                      </div>
                      <div className="flex w-full flex-col justify-between">
                        <div>
                          <StyledText fontSize="14px" color="#222">
                            {row.campaignName}
                          </StyledText>
                          <StyledText fontSize="14px" color="#222">
                            <div className="flex flex-wrap items-center gap-2">
                              {(row.report || row.campaignType === "3") && (
                                <div className="font-semibold text-[#0027ff]">(기자단)</div>
                              )}
                              {row.campaignType === "2" && <div className="font-semibold text-[#00b605]">[공동구매]</div>}
                              <div className="font-semibold" style={{ color: snsTypes[row.type].color }}>
                                {snsTypes[row.type].text}
                              </div>
                              <div>{` ${AdvertiseTypes.mainType[row.category]} > ${AdvertiseTypes.subType[row.category][row.subcategory]}`}</div>
                            </div>
                          </StyledText>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="w-[70px]">
                            <StyledButton onClick={() => campaignParticipant(row.id, row.type)} padding="0" height="26px" fontSize="0.790rem">
                              신청자
                            </StyledButton>
                          </div>
                          <div className="w-[70px]">
                            <StyledButton
                              onClick={() => navigate(`${match.path}/Question/${row.id}`)}
                              background="#0fb359"
                              hoverBackground="#107C41"
                              padding="0"
                              height="26px"
                              fontSize="0.790rem"
                            >
                              문의
                            </StyledButton>
                          </div>
                          {row.campaignType === "2" ? (
                            <div className="w-[70px]">
                              <StyledButton
                                onClick={() =>
                                  navigate({
                                    pathname: `${match.path}/Seller/${row.id}`,
                                    state: { type: row.type },
                                  })
                                }
                                background="#0fb359"
                                hoverBackground="#107C41"
                                padding="0"
                                height="26px"
                                fontSize="0.790rem"
                              >
                                판매링크
                              </StyledButton>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledText fontSize="14px" color="#222">
                      {`신청자 ${row.regCnt} / ${row.infCnt}`}
                    </StyledText>
                    <StyledText fontSize="14px" color="#222">
                      {`선정자 ${row.selCnt} / ${row.infCnt}`}
                    </StyledText>
                    <StyledText fontSize="14px" color="#222">
                      {`후기수 ${row.reviewCnt} / ${row.selCnt}`}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StyledText fontSize="14px" color="#222" textAlign="center">
                      {row.createDate}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="수정" placement="top">
                      <IconButton className="p-2" disableRipple onClick={(event) => campaignDetail(event, row.id)} size="large">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="복사" placement="top">
                      <IconButton className="p-2" disableRipple onClick={() => copyCampaign(row.id)} size="large">
                        <FileCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="삭제" placement="top">
                      <IconButton
                        className="p-2"
                        disableRipple
                        onClick={() => {
                          setSelectedCampaign(row.id);
                          setDialogOpen(true);
                        }}
                        size="large"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="py-10">
        <div className="flex justify-center">
          <MyPagination itemCount={count} page={page} changePage={changePage} perPage={limit} />
        </div>
      </div>
      <CopyDialog open={copyDialog} campaignId={selectedCampaign} closeDialog={toggleCopyDialog} getCampaigns={getCampaigns} />
      <ConfirmDialog open={dialogOpen} closeDialog={toggleDialog} onConfirm={deleteDbPicture} dialogText="삭제하시겠습니까?" />
    </div>
  );
}

export default CampaignList;
