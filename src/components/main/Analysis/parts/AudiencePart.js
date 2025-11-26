// JavaScript
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, colors, Grid, LinearProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import { axiosInstance as axios } from "@lib/axiosInstance";
import DoughnutComponent from "../DoughnutComponent";
import BarComponent from "../BarComponent";
import analysisStyles from "../AnalysisStyle";
import MapGraph from "../../campaign/Graphs/MapGraph";
import PieChartApex from "../PieChartApex";

const PREFIX = "AudiencePart";

const classes = {
  orange: `${PREFIX}-orange`,
  lemon: `${PREFIX}-lemon`,
  purple: `${PREFIX}-purple`,
  lightGreen: `${PREFIX}-lightGreen`,
  yellow: `${PREFIX}-yellow`,
  grey: `${PREFIX}-grey`,
};

const StyledGrid = styled(Grid)({
  [`& .${classes.orange}`]: {
    backgroundColor: colors.orange[500],
  },
  [`& .${classes.lemon}`]: {
    backgroundColor: "rgb(180, 240, 70)",
  },
  [`& .${classes.purple}`]: {
    backgroundColor: "#6E0FFF",
  },
  [`& .${classes.lightGreen}`]: {
    backgroundColor: "#18DBA8",
  },
  [`& .${classes.yellow}`]: {
    backgroundColor: "#FFE600",
  },
  [`& .${classes.grey}`]: {
    backgroundColor: "#00000017",
  },
});

const sex = {
  labels: ["18-24", "25-34", "35-44", "45-54", "65+"],
  datasets: [
    {
      label: "여성",
      backgroundColor: "#6E0FFF",
    },
    {
      label: "남성",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  ],
};

const bgColors = ["purple", "lightGreen", "yellow", "grey"];

// simple helper returning sx props for LinearProgress to set bar color
function getBarSx(color) {
  return {
    "& .MuiLinearProgress-bar": {
      backgroundColor: color,
    },
    "&.MuiLinearProgress-root": {
      backgroundColor: "#e0e0e0",
    },
  };
}

function AudiencePart(props) {
  const { testData, instaData, setLocationMax } = props;
  const { genderData, ageData, followerActivity, INS_ID } = instaData;
  const { male, female } = genderData;
  const [mapData, setMapData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [apexData, setApexData] = useState({
    scores: [],
    labels: [],
    colors: [],
  });
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up("md"));

  const classesLocal = analysisStyles();

  sex.datasets[0].data = female;
  sex.datasets[1].data = male;

  const femaleSum = female.reduce((a, b) => a + b, 0);
  const maleSum = male.reduce((a, b) => a + b, 0);

  function getStatistics() {
    axios
      .get("/TB_INSTA/statsMapNew", {
        params: { INS_ID },
      })
      .then((res) => {
        const { statsTopString, sortedStats, stats, apexStats } = res.data;
        if (sortedStats) setMapData(sortedStats);
        if (stats) {
          setStatsData(stats);
          setLocationMax({
            description: stats[0].description,
            value: stats[0].value,
            statsTop: statsTopString,
          });
        }
        if (apexStats) {
          setApexData(apexStats);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  useEffect(() => {
    if (INS_ID) {
      getStatistics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [INS_ID]);

  return (
    <Box mt="80px" mb="24px">
      <StyledGrid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box pl="10px" borderLeft="4px solid #6E0FFF">
            <Typography variant="h6" paragraph>
              팔로워 충성도 분석
            </Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" p="20px">
              <Box ml="25px">
                <Grid container alignItems="center">
                  <Grid item>
                    <DoughnutComponent
                      chartData={[followerActivity.flwrsMax, followerActivity.notActiveFlwr]}
                      chartColor={[colors.orange[500], "rgba(0, 0, 0, 0.2)"]}
                    />
                  </Grid>
                  <Grid item>
                    <Box ml={2}>
                      <Typography variant="subtitle2" classes={{ root: classesLocal.bold }}>
                        충성도있는 팔로워
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classesLocal.bold }}>
                        {`${followerActivity.flwrsMax}명`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt="30px">
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      충성도있는 팔로워
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      비활동 팔로워
                    </Typography>
                  </Grid>
                </Grid>
                <Box my={1}>
                  <LinearProgress variant="determinate" value={followerActivity.flwrsMax} sx={getBarSx(colors.orange[500])} />
                </Box>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography
                      variant="body1"
                      classes={{ root: classesLocal.bold }}
                    >{`${followerActivity.flwrsMax}명 (${followerActivity.flwrsMaxPer}%)`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      classes={{ root: classesLocal.bold }}
                    >{`${followerActivity.notActiveFlwr}명 (${followerActivity.notActiveFlwrPer}%)`}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
              <Typography variant="body1">충성도있는 팔로워 수는 지난 주 동안 Instagram의 온라인 상태에 대한 정보를 수신하여 계산됩니다.</Typography>
            </Box>
          </Box>
          <Box mt={1} px="25px" py="15px" bgcolor="#F2F2F2" borderRadius="7px">
            <Typography variant="body1" gutterBottom classes={{ root: classesLocal.bold600 }}>
              충성도있는 팔로워 수로 본 영향력지수
            </Typography>
            <Typography variant="body1">
              0%~5% : 미미
              <br />
              5%~10% : 저조
              <br />
              10%~15% : 보통
              <br />
              15%~20% : 우수
              <br />
              25%이상 : 매우우수
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" style={{ height: "100%" }}>
            <Grid item>
              <Box pl="10px" borderLeft="4px solid #6E0FFF">
                <Typography variant="h6" paragraph>
                  팔로워 공감능력 분석
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box bgcolor="#FFF" p="20px" pl="45px" boxSizing="border-box" height="100%" borderRadius="7px 7px 0 0" overflow="hidden">
                <Grid container alignItems="center" style={{ height: "100%" }}>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <DoughnutComponent
                        chartData={[instaData.ability, 100 - instaData.ability]}
                        chartColor={[colors.orange[500], "rgba(0, 0, 0, 0.2)"]}
                      />
                    </Grid>
                    <Grid item>
                      <Box ml={2}>
                        <Typography variant="subtitle2" classes={{ root: classesLocal.bold }}>
                          팔로워의 공감능력
                        </Typography>
                        <Typography variant="subtitle2" classes={{ root: classesLocal.bold }}>
                          {`${instaData.ability}%(${instaData.abilityType})`}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2" borderRadius="0 0 7px 7px">
                <Typography variant="body1">
                  {`공감능력분석은 좋아요 대비 댓글수로서 ${instaData.INS_NAME}님의 공감능력은 ${instaData.ability}% 입니다. 공감능력이 높을 수록 광고의 효율성이 높아집니다`}
                </Typography>
              </Box>
              <Box mt={1} px="25px" py="15px" bgcolor="#F2F2F2" borderRadius="7px">
                <Typography variant="body1" gutterBottom classes={{ root: classesLocal.bold600 }}>
                  공감능력분석으로 본 영향력지수
                </Typography>
                <Typography variant="body1">
                  0%~5% : 미미
                  <br />
                  5%~10% : 저조
                  <br />
                  10%~15% : 보통
                  <br />
                  15%~20% : 우수
                  <br />
                  25%이상 : 매우우수
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </StyledGrid>
      <Box mt="50px">
        <Typography variant="subtitle2" paragraph>
          팔로워의 지도
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box borderRadius="7px" bgcolor="#FFF" p="20px">
            <MapGraph mapData={mapData} />
          </Box>
          <Box px="25px" py="15px" bgcolor="#F2F2F2" borderRadius="7px">
            <Typography variant="body1">
              팔로워들의 국적을 분석하여 지도로 보여줍니다. 국내외의 사용자가 지나치게 많을 경우 팔로워구매를 의심할 수 있습니다. 실제 사용자중
              국내사용자들의 비율로 팔로워수를 판단해야 합니다.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box borderRadius="7px" bgcolor="#FFF" p="20px" height="100%" boxSizing="border-box">
            {apexData ? (
              <Grid container alignItems="center" style={{ height: "100%" }}>
                <Grid item xs={12}>
                  <PieChartApex series={apexData.scores} colors={apexData.colors} labels={apexData.labels} />
                </Grid>
              </Grid>
            ) : (
              <Grid container alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                <Grid item>로딩 중...</Grid>
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box mt="50px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" paragraph>
              언어 비율
            </Typography>
            <Box p="20px" bgcolor="#FFF" borderRadius="7px">
              {testData.language.map((item) => (
                <Box key={item.lng}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="body1" color="textSecondary">
                        {item.lng}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color="textSecondary">
                        {`${item.num}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box my="10px">
                    <LinearProgress
                      variant="determinate"
                      value={item.num}
                      sx={getBarSx(
                        item.color === "purple"
                          ? "#6E0FFF"
                          : item.color === "lightGreen"
                            ? "#18DBA8"
                            : item.color === "yellow"
                              ? "#FFE600"
                              : "#00000017"
                      )}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" paragraph>
              연령 비율
            </Typography>
            <Box p="20px" bgcolor="#FFF" borderRadius="7px">
              {ageData.map((item, index) => (
                <Box key={item.age}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="body1" color="textSecondary">
                        {item.age}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color="textSecondary">
                        {`${item.num}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box my="10px">
                    <LinearProgress
                      variant="determinate"
                      value={item.num}
                      sx={getBarSx(
                        bgColors[index] === "purple"
                          ? "#6E0FFF"
                          : bgColors[index] === "lightGreen"
                            ? "#18DBA8"
                            : bgColors[index] === "yellow"
                              ? "#FFE600"
                              : "#00000017"
                      )}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" paragraph>
              성별 비율
            </Typography>
            <Box p="20px" bgcolor="#FFF" borderRadius="7px">
              <Grid container>
                <Grid item xs={12} md="auto">
                  <Box mx={5} mt="30px">
                    <DoughnutComponent
                      chartData={[femaleSum, maleSum]}
                      chartWidth={140}
                      chartHeight={140}
                      chartColor={["#6E0FFF", "rgba(0, 0, 0, 0.2)"]}
                    />
                    <Box mt="25px">
                      <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                          <FiberManualRecord classes={{ fontSizeSmall: classesLocal.colorGrey2 }} fontSize="small" />
                        </Grid>
                        <Grid item>
                          <Box>{`남성 ${genderData.malePercent}%`}</Box>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                          <FiberManualRecord classes={{ fontSizeSmall: classesLocal.colorViolet }} fontSize="small" />
                        </Grid>
                        <Grid item>
                          <Box>{`여성 ${genderData.femalePercent}%`}</Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md>
                  <Box maxWidth="380px" m="0 auto" mt={{ xs: 2, md: 0 }}>
                    <BarComponent data={sex} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AudiencePart;
