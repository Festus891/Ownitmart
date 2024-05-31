// Redux setup
import { legacy_createStore as createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newProductReducer,
  deleteProductReducer,
  updateProductReducer,
  newReviewReducer,
  productReviewsReducer,
  deleteReviewReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

import {
  authReducer,
  userReducer,
  forgetPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  updateOrderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  auth: authReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  updateOrder: updateOrderReducer,
  newReview: newReviewReducer,
  deleteReview: deleteReviewReducer,
  productReviews: productReviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
