import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { GlobalLayout } from "./components/layout/global";
import { Product } from "./pages/product";
import { Onboarding } from "./pages/onboarding";

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

        <Route
          path="/product/:permalink"
          element={
            <GlobalLayout>
              <Product />
            </GlobalLayout>
          }
        />

        <Route
          path="/merchant/onboarding"
          element={
            <GlobalLayout>
              <Onboarding />
            </GlobalLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
