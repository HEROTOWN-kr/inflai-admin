import React, { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

function Subscription() {
  const props = useOutletContext();

  const { setMenuIndicator } = useOutletContext();
  useEffect(() => setMenuIndicator(5), []);

  return <Outlet context={{ ...props }} />;
}

export default Subscription;
