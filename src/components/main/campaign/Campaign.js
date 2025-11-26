import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CampaignList from "./CampaignList";
import RequestList from "../request/RequestList";
import RequestDetail from "../request/RequestDetail";
import CampaignCreateNew from "./CampaignCreateNew";
import CampaignEdit from "./CampaignEdit";
import CampaignParInsta from "./CampaignParInsta";
import CampaignParBlog from "./CampaignParBlog";
import StyledTabs from "../../containers/StyledTabs";
import StyledTab from "../../containers/StyledTab";
import CampaignParYoutube from "./CampaignParYoutube";
import Question from "../question/Question";
import CampaignSeller from "./CampaignSeller";
import CampaignParReview from "./CampaignParReview";

const PREFIX = "Campaign";

const classes = {
  title: `${PREFIX}-title`,
  tabs: `${PREFIX}-tabs`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")({
  [`& .${classes.title}`]: {
    fontFamily: "Noto Sans KR, sans-serif",
    fontWeight: 700,
    marginTop: "96px",
    marginBottom: "48px",
  },
  [`& .${classes.tabs}`]: {
    root: {},
    indicator: {},
  },
});

function Campaign(props) {
  const { setMenuIndicator } = props;
  const [tab, setTab] = useState(0);

  // match for base path; assumes parent route mounts this component at "/Campaign/*"
  const match = useMatch("/Campaign/*");
  const basePath = match ? "/Campaign" : "";

  useEffect(() => setMenuIndicator(3), [setMenuIndicator]);

  console.log("basePath : ", basePath);

  return (
    <Root>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>
            캠페인 관리
          </Typography>
          <StyledTabs className={classes.tabs} value={tab}>
            <StyledTab label="등록된 캠페인" component={Link} to={`${basePath}/List`} />
            <StyledTab label="캠페인 요청" component={Link} to={`${basePath}/Request`} />
          </StyledTabs>
        </Box>
      </Box>
      <Box py={2} bgcolor="#f4f4f4">
        <Routes>
          <Route path="List" element={<CampaignList {...props} setTab={setTab} />} />
          <Route path="ParInsta/:id" element={<CampaignParInsta />} />
          <Route path="ParYoutube/:id" element={<CampaignParYoutube />} />
          <Route path="ParBlog/:id" element={<CampaignParBlog />} />
          <Route path="ParReview/:id" element={<CampaignParReview />} />
          <Route path="Seller/:id" element={<CampaignSeller />} />
          <Route path="Request" element={<RequestList {...props} setTab={setTab} />} />
          <Route path="Request/:id" element={<RequestDetail />} />
          <Route path="create" element={<CampaignCreateNew />} />
          <Route path=":id" element={<CampaignEdit />} />
          <Route path="Question/:id" element={<Question />} />
          <Route path="/" element={<Navigate to="List" replace />} />
        </Routes>
      </Box>
    </Root>
  );
}

export default Campaign;
