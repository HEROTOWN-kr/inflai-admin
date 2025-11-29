import React, { createRef, Fragment, useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Close } from "@mui/icons-material";
import Main from "./main/Main";
import Login from "./login/Login";
import AuthContext from "../context/AuthContext";
import useLoading from "./hooks/useLoading";
import StyledBackDrop from "./containers/StyledBackDrop";
import { getUserInfo, saveUserInfo } from "../lib/common";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import Dashboard from "./main/dashboard/Dashboard";
import Advertiser from "./main/advertiser/Advertiser";
import Influencer from "./main/influencer/Influencer";
import Campaign from "./main/campaign/Campaign";
import Ranking from "./main/ranking/Ranking";
import Subscription from "./main/subscription/Subscription";
import Payment from "./main/payment/Payment";
import Settings from "./main/settings/Settings";
import YoutubeAnalysis from "./main/ranking/Youtube/YoutubeAnalysis";
import CampaignList from "./main/campaign/CampaignList";
import CampaignParInsta from "./main/campaign/CampaignParInsta";
import CampaignParYoutube from "./main/campaign/CampaignParYoutube";
import CampaignParBlog from "./main/campaign/CampaignParBlog";
import CampaignParReview from "./main/campaign/CampaignParReview";
import CampaignSeller from "./main/campaign/CampaignSeller";
import RequestList from "./main/request/RequestList";
import RequestDetail from "./main/request/RequestDetail";
import CampaignCreateNew from "./main/campaign/CampaignCreateNew";
import CampaignEdit from "./main/campaign/CampaignEdit";
import Question from "./main/question/Question";
import Instagram from "./main/ranking/Instagram/Instagram";
import Youtube from "./main/ranking/Youtube/Youtube";
import InstagramList from "./main/ranking/Instagram/InstagramList";
import RankingDetail from "./main/ranking/Instagram/RankingDetail";
import SubscriptionList from "./main/subscription/SubscriptionList";
import SubscriptionDetail from "./main/subscription/SubscriptionDetail";
import KakaoNotify from "./main/settings/pages/KakaoNotify";
import Coupon from "./main/settings/pages/Coupon";
import NotFound from "./main/NotFound";

const PREFIX = "App";

const classes = {
  snackbarCloseIcon: `${PREFIX}-snackbarCloseIcon`,
};

const StyledAuthContextProvider = styled(AuthContext.Provider)({
  [`& .${classes.snackbarCloseIcon}`]: {
    cursor: "pointer",
  },
});

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

/**
 * ProtectRoute - wrapper that checks auth and either renders children (via <Outlet />)
 * or redirects to /Login. Keeps routes declarative and centralizes auth logic.
 */
function ProtectedRoute({ isAuthenticated, redirectTo = "/Login" }) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}

/**
 * PublicOnlyRoute - if authenticated, redirect away from login page to root.
 * Useful to prevent showing Login when already logged in.
 */
function PublicOnlyRoute({ isAuthenticated, redirectTo = "/Dashboard" }) {
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}

function App() {
  const navigate = useNavigate(); // replace history from withRouter
  const [user, setUser] = useState(getUserInfo);

  const { isLoading, setLoading } = useLoading();
  const snackbarRef = createRef();
  const onClickDismiss = (key) => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  function changeUser(data) {
    const newUser = { ...data };
    setUser(newUser);
    saveUserInfo(newUser);
  }

  useEffect(() => {
    if (!user.token) {
      navigate("/Login"); // useNavigate instead of navigate
    }
  }, [user, navigate]);

  const isAuthenticated = Boolean(user && user.token);

  return (
    <StyledAuthContextProvider value={{ isLoading, setLoading }}>
      <SnackbarProvider ref={snackbarRef} action={(key) => <Close className={classes.snackbarCloseIcon} onClick={onClickDismiss(key)} />}>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* Public-only routes: e.g. login */}
            <Route element={<PublicOnlyRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/Login" element={<Login user={user} changeUser={changeUser} />} />
            </Route>
            {/* Protected routes: everything under "/" that requires auth */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Main changeUser={changeUser} />}>
                <Route index element={<Navigate to="/Dashboard" replace />} />
                <Route path="Dashboard" index element={<Dashboard />} />
                <Route path="Advertiser" element={<Advertiser />} />
                <Route path="Influencer" element={<Influencer />} />
                <Route path="Campaign" element={<Campaign />}>
                  <Route index element={<CampaignList />} /> {/* <-- дефолтный */}
                  <Route path="List" index element={<CampaignList />} />
                  <Route path="ParInsta/:id" element={<CampaignParInsta />} />
                  <Route path="ParYoutube/:id" element={<CampaignParYoutube />} />
                  <Route path="ParBlog/:id" element={<CampaignParBlog />} />
                  <Route path="ParReview/:id" element={<CampaignParReview />} />
                  <Route path="Seller/:id" element={<CampaignSeller />} />
                  <Route path="Request" element={<RequestList />} />
                  <Route path="Request/:id" element={<RequestDetail />} />
                  <Route path="create" element={<CampaignCreateNew />} />
                  <Route path=":id" element={<CampaignEdit />} />
                  <Route path="Question/:id" element={<Question />} />
                </Route>
                <Route path="Ranking" element={<Ranking />}>
                  <Route index element={<Youtube />} />
                  <Route path="Youtube/*" element={<Youtube />} />
                  <Route path="Instagram/*" element={<Instagram />}>
                    <Route index element={<InstagramList />} />
                    <Route path="List/*" element={<InstagramList />} />
                    <Route path="Detail/:id" element={<RankingDetail />} />
                  </Route>
                </Route>
                <Route path="Subscription" element={<Subscription />}>
                  <Route index element={<SubscriptionList />} />
                  <Route path="List" element={<SubscriptionList />} />
                  <Route path=":id" element={<SubscriptionDetail />} />
                </Route>

                <Route path="Payment" element={<Payment />} />
                <Route path="Settings" element={<Settings />}>
                  <Route index element={<KakaoNotify />} />
                  <Route path="KakaoNotify" element={<KakaoNotify />} />
                  <Route path="Coupon" element={<Coupon />} />
                </Route>
                <Route path="YoutubeDialog" element={<YoutubeAnalysis />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <StyledBackDrop open={isLoading} />
        </ThemeProvider>
      </SnackbarProvider>
    </StyledAuthContextProvider>
  );
}

export default App;
