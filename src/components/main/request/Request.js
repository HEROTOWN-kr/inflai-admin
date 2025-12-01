import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RequestDetail from "./RequestDetail";
import RequestList from "./RequestList";
import CreateCampaign from "./CreateCampaign";

/**
 * Request routes (react-router v6/v7 style).
 * Currently не используется в основном роутинге, но приведён к актуальному API,
 * чтобы не было зависимостей от устаревшего Switch / render.
 *
 * Если когда‑нибудь понадобится, монтировать так:
 *   <Route path="Request/*" element={<Request />} />
 */
function Request() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/Request");
  }

  function goToCreate(id) {
    navigate(`/Request/create/${id}`);
  }

  return (
    <div className="request">
      <Routes>
        <Route
          path="create/:id"
          element={<CreateCampaign goBack={goBack} />}
        />
        <Route
          path=":id"
          element={<RequestDetail goBack={goBack} goToCreate={goToCreate} />}
        />
        <Route index element={<RequestList />} />
      </Routes>
    </div>
  );
}

export default Request;
