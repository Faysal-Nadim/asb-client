import React, { useEffect } from "react";
import "./App.css";
import PrivateRoute from "./components/hoc/private";

import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { GlobalLayout } from "./components/layout/global";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { Account } from "./pages/user/account";
import { UserLayout } from "./components/layout/user";
import { Dashboard } from "./pages/user/dashboard";
import { Orders } from "./pages/user/orders";
import { Wishlist } from "./pages/wishlist";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./redux/actions";
import { SystemLayout } from "./components/layout/system";
import { AuthPage } from "./pages/auth";
import { PageLoadingProvider } from "./components/context/loading";
import { Verification } from "./pages/verification";
import { ProductList } from "./pages/productlist";
import { RequestShipment } from "./pages/shipment";

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
            path="/user/auth/verify-email"
            element={
              <SystemLayout type={"Authentication"}>
                <Verification />
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
            path="/product-list"
            element={
              <GlobalLayout>
                <ProductList />
              </GlobalLayout>
            }
          />

          <Route
            path="/request-shipment"
            element={
              <GlobalLayout>
                <RequestShipment />
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
            path="/wishlist"
            element={
              <GlobalLayout>
                <Wishlist />
              </GlobalLayout>
            }
          />

          <Route
            path="/user/*"
            element={
              <UserLayout>
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              </UserLayout>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path={"dashboard"} element={<Dashboard />} />
            <Route path={"orders"} element={<Orders />} />
            <Route path={"account"} element={<Account />} />
          </Route>
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </PageLoadingProvider>
    </div>
  );
}

export default App;
