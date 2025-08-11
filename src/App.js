import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { GlobalLayout } from "./components/layout/global";
import { Product } from "./pages/product";

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
      </Routes>
    </div>
  );
}

export default App;
