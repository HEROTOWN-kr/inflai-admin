import React, { useEffect, useState } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import StyledTitle from '../../containers/StyledTitle';
import StyledSelect from '../../containers/StyledSelect';
import Instagram from './Instagram';
import Youtube from './Youtube';

function RankingList(props) {
  const [blogType, setBlogType] = useState('1');

  const { history, match } = props;


  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <StyledTitle title="인플루언서 랭킹" />
      </Grid>
      <Grid item xs={7} xl={8}>
        <Grid container justify="space-between" alignItems="flex-end">
          <Grid item>
            <StyledSelect
              value={blogType}
              variant="outlined"
              onChange={(event => setBlogType(event.target.value))}
            >
              <MenuItem value="1">Instagram</MenuItem>
              <MenuItem value="2">Youtube</MenuItem>
            </StyledSelect>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12}>
        { blogType === '1' ? <Instagram history={history} match={match} /> : <Youtube /> }
      </Grid>
    </Grid>
  );
}

export default RankingList;
