import React, { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

function Instagram() {
  const { setTab, ...props } = useOutletContext();
  useEffect(() => setTab(0), []);

  return <Outlet context={props} />;
}

export default Instagram;
