import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@material-ui/core';
import axios from 'axios';
import MainBlock from '../../containers/MainBlock';

function RankingDetail(props) {
  const [statistics, setStatistics] = useState({
    likeStats: [],
    commentsStats: []
  });
  const { match } = props;

  async function getStatistics() {
    const InstaData = await axios.get('/api/TB_INSTA/detail', {
      params: {
        INS_ID: match.params.id
      }
    });
    const { data } = InstaData.data;
    console.log(data);

    setStatistics(data);
  }

  useEffect(() => {
    getStatistics();
  }, []);


  const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Likes',
      type: 'line',
      data: statistics.likeStats,
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    }, {
      label: 'Replies',
      type: 'bar',
      data: statistics.commentsStats,
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    }]
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
          /* labels: {
            show: true
          } */
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };

  const plugins = [{
    afterDraw: (chartInstance, easing) => {
      const { ctx } = chartInstance.chart;
      ctx.fillText('This text drawn by a plugin', 100, 100);
    }
  }];

  return (
    <div>
      <MainBlock
        width="1200"
      >
        <Box
          width="720px"
          height="360px"
        >
          <h2>*인플루언서 계정의 각 게시물마다 (좋아요, 댓글) 수 비교</h2>
          <Bar
            data={data}
            options={options}
            plugins={plugins}
          />
        </Box>
      </MainBlock>
    </div>
  );
}

export default RankingDetail;
