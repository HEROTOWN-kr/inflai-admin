import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import RankingDetail from './RankingDetail';
import InstagramList from './InstagramList';

function Instagram(props) {
  const { setTab } = props;
  useEffect(() => setTab(0), []);

  // Note: Routes here use relative paths. Ensure the parent route mounts this
  // component at a path that includes a trailing "/*" so these child routes resolve correctly.
  return (
    <Routes>
      <Route path="List/*" element={<InstagramList {...props} />} />
      <Route path="Detail/:id" element={<RankingDetail />} />
      <Route path="/" element={<Navigate to="List/" replace />} />
    </Routes>
  );
}

export default Instagram;
