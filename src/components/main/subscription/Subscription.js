import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import SubscriptionList from './SubscriptionList';
import SubscriptionDetail from './SubscriptionDetail';

function Subscription(props) {
  const { setMenuIndicator } = props;
  // derive base path; ensure parent route mounts this component at "/Subscription/*"
  const match = useMatch('/Subscription/*');
  useEffect(() => setMenuIndicator(5), []);

  return (
    <Routes>
      <Route path="List" element={<SubscriptionList {...props} />} />
      <Route path=":id" element={<SubscriptionDetail />} />
      <Route path="/" element={<Navigate to={match ? '/Subscription/List' : 'List'} replace />} />
    </Routes>
  );
}

export default Subscription;
