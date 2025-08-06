import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { GlobalLayout } from "./components/layout/global";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <GlobalLayout>
              <Home />
            </GlobalLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
