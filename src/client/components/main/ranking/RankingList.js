import React, { Fragment, useEffect, useState } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import StyledTitle from '../../containers/StyledTitle';
import StyledSelect from '../../containers/StyledSelect';
import Instagram from './Instagram';
import Youtube from './Youtube';

function RankingList(props) {
  const [blogType, setBlogType] = useState('1');

  const { history, match } = props;


  return (
    <Fragment>
      <StyledSelect
        value={blogType}
        variant="outlined"
        onChange={(event => setBlogType(event.target.value))}
      >
        <MenuItem value="1">Instagram</MenuItem>
        <MenuItem value="2">Youtube</MenuItem>
      </StyledSelect>
      { blogType === '1' ? <Instagram history={history} match={match} /> : <Youtube /> }
    </Fragment>
  );
}

export default RankingList;
