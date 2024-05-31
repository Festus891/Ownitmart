import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Headers, Footer, Home } from "./components/imports";
import ProductsDetails from "./components/product/ProductsDetails";

// Cart imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order import
import ListOrders from "./components/orders/ListOrders";
import OrderDetails from "./components/orders/OrderDetails";

// Auth or User import
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Import
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import { UserList } from "./components/admin/UserList";
import ProductReviews from "./components/admin/ProductReviews";

// stripe for payment import
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import HeaderTwo from "./components/layouts/HeaderTwo";

import { loadUser } from "./actions/userAction";
import store from "./store";
import axios from "axios";
import { useSelector } from "react-redux";
import OrderLists from "./components/admin/OrderLists";
import UpdateUser from "./components/admin/UpdateUser";

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <Headers />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductsDetails />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/shipping" element={<Shipping />} exact />
            <Route path="/order/confirm" element={<ConfirmOrder />} exact />
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/success" element={<OrderSuccess />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/orders/me" element={<ListOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrderLists />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Routes>

        {!loading && user && user.role !== "admin" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
