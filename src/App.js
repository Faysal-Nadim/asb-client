import React from "react";
import "./App.css";

import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { GlobalLayout } from "./components/layout/global";
import { Product } from "./pages/product";
import { Onboarding } from "./pages/onboarding";
import { Cart } from "./pages/cart";
import { ShopDetails } from "./pages/shop";
import { Account } from "./pages/account";
import UserProfileLayout from "./components/layout/user";
import { Order } from "./pages/order";
import { ShopLayout } from "./components/layout/shop";
import { Dashboard } from "./pages/my-shop/dashboard";
import { Products } from "./pages/my-shop/products";
import { Orders } from "./pages/my-shop/orders";
import { Reports } from "./pages/my-shop/reports";
import { Coupons } from "./pages/my-shop/coupons";
import { Earnings } from "./pages/my-shop/earnings";

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

        <Route
          path="/cart"
          element={
            <GlobalLayout>
              <Cart />
            </GlobalLayout>
          }
        />

        <Route
          path="/my-shop/*"
          element={
            <ShopLayout>
              <Outlet />
            </ShopLayout>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"products"} element={<Products />} />
          <Route path={"orders"} element={<Orders />} />
          <Route path={"reports"} element={<Reports />} />
          <Route path={"coupons"} element={<Coupons />} />
          <Route path={"earnings"} element={<Earnings />} />
        </Route>

        <Route
          path="/shop/:permalink"
          element={
            <GlobalLayout>
              <ShopDetails />
            </GlobalLayout>
          }
        />

        <Route
          path="/user/*"
          element={
            <UserProfileLayout>
              <Outlet />
            </UserProfileLayout>
          }
        >
          <Route index element={<Account />} />
          <Route path={"account"} element={<Account />} />
          <Route path={"orders"} element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
