/** @format */

import { combineReducers } from "redux";
import {
  productCategoryReducer,
  ProductCreateReducer,
  ProductDeleteReducer,
  ProductListReducer,
  ProductUpdateReducer,
  ProductViewReducer,
} from "./reducers/Product.reducer";
import { CartReducer } from "./reducers/Cart.reducer";
import {
  UserProfileDetailsReducer,
  UserReducer,
  UserProfileUpdateReducer,
  UserListReducer,
  UserListDetailReducer,
  UserListUpdateReducer,
  UserListDeleteReducer,
  TopSellerReducer,
} from "./reducers/User.reducer";

import { PlaceOrderReducer } from "./reducers/PlaceOrder.reducer";
import { OrderDetailReducer } from "./reducers/Order.reducer";
import { OrderPayReducer } from "./reducers/OrderPay.reducer";
import { OrderMineReducer } from "./reducers/OrderMine.reducer";
import {
  OrderDeleteReducer,
  OrderListWithUserReducer,
} from "./reducers/OrderList.reducer";

import { OrderDeliveredReducer } from "./reducers/OrderDelivered.action";


const rootReducer = combineReducers({
  ProductList: ProductListReducer,
  ProductView: ProductViewReducer,
  Cart: CartReducer,
  User: UserReducer,
  PlaceOrder: PlaceOrderReducer,
  OrderDetails: OrderDetailReducer,
  OrderPay: OrderPayReducer,
  OrderMine: OrderMineReducer,
  UserProfileDetail: UserProfileDetailsReducer,
  UserProfileUpdate: UserProfileUpdateReducer,
  ProductUpdate: ProductUpdateReducer,
  ProductCreate: ProductCreateReducer,
  ProductDelete: ProductDeleteReducer,
  OrderList: OrderListWithUserReducer,
  OrderDelete: OrderDeleteReducer,
  OrderDelivered: OrderDeliveredReducer,
  UserList: UserListReducer,
  UserDetailList: UserListDetailReducer,
  UserListUpdate: UserListUpdateReducer,
  UserListDelete: UserListDeleteReducer,
  TopSeller:TopSellerReducer,
  ProductCategory: productCategoryReducer
});

export default rootReducer;
