import React, {useEffect, useState} from 'react';
import {
  Grid,
  MenuItem,
} from '@material-ui/core';
import StyledSelect from '../../containers/StyledSelect';
import StyledTitle from '../../containers/StyledTitle';
import Instagram from './Instagram';
import Youtube from './Youtube';

function Ranking(props) {
  const [blogType, setBlogType] = useState('1');
  const { setMenuIndicator } = props;
  useEffect(() => setMenuIndicator(4), []);

  return (
    <Grid container justify="center">
      <Grid item md={10}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <StyledTitle title="인플루언서 랭킹" />
          </Grid>
          <Grid item sm={12}>
            <StyledSelect
              value={blogType}
              variant="outlined"
              onChange={(event => setBlogType(event.target.value))}
            >
              <MenuItem value="1">Instagram</MenuItem>
              <MenuItem value="2">Youtube</MenuItem>
            </StyledSelect>
          </Grid>
          <Grid item sm={12}>
            {
              blogType === '1' ? <Instagram /> : <Youtube />
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Ranking;
