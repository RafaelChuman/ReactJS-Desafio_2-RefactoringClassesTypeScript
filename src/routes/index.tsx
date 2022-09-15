import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

const RoutesOfProject = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesOfProject;
