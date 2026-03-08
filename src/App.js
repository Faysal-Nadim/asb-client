import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { GlobalLayout } from "./components/layout/global";
import { Product } from "./pages/product";
import { Onboarding } from "./pages/onboarding";
import { Cart } from "./pages/cart";
import { ShopDetails } from "./pages/shop";
import { Account } from "./pages/user/account";
import { Order } from "./pages/user/order";
import { ShopLayout } from "./components/layout/shop";
import { Dashboard } from "./pages/my-shop/dashboard";
import { Products } from "./pages/my-shop/products";
import { Orders } from "./pages/my-shop/orders";
import { Reports } from "./pages/my-shop/reports";
import { Coupons } from "./pages/my-shop/coupons";
import { Earnings } from "./pages/my-shop/earnings";
import { Wishlist } from "./pages/wishlist";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./redux/actions";
import PrivateRoute from "./components/hoc/private";
import { OnboardStatus } from "./pages/status/onboard";
import { SystemLayout } from "./components/layout/system";
import { AuthPage } from "./pages/auth";
import { PageLoadingProvider } from "./components/context/loading";
import { Settings } from "./pages/my-shop/settings";
import { AddProduct } from "./pages/my-shop/addproduct";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <PageLoadingProvider>
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
            path="/user/auth"
            element={
              <SystemLayout type={"Authentication"}>
                <AuthPage />
              </SystemLayout>
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
                <PrivateRoute>
                  <Onboarding />
                </PrivateRoute>
              </GlobalLayout>
            }
          />

          <Route
            path="/merchant/onboarding/status"
            element={
              <SystemLayout type={"Merchant Onboarding"}>
                <OnboardStatus />
              </SystemLayout>
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
            path="/wishlist"
            element={
              <GlobalLayout>
                <Wishlist />
              </GlobalLayout>
            }
          />

          <Route
            path="/my-shop/*"
            element={
              <ShopLayout>
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              </ShopLayout>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path={"dashboard"} element={<Dashboard />} />
            <Route path={"products"} element={<Products />} />
            <Route path={"products/add-new"} element={<AddProduct />} />
            <Route path={"orders"} element={<Orders />} />
            <Route path={"reports"} element={<Reports />} />
            <Route path={"coupons"} element={<Coupons />} />
            <Route path={"earnings"} element={<Earnings />} />
            <Route path={"settings"} element={<Settings />} />
          </Route>

          <Route
            path="/shop/:country/:indentifier"
            element={
              <GlobalLayout>
                <ShopDetails />
              </GlobalLayout>
            }
          />

          <Route
            path="/user/account"
            element={
              <GlobalLayout>
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              </GlobalLayout>
            }
          />
          <Route
            path="/user/orders"
            element={
              <GlobalLayout>
                <Order />
              </GlobalLayout>
            }
          />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </PageLoadingProvider>
    </div>
  );
}

export default App;
