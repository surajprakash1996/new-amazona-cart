/** @format */

import React from "react";
import { Container as MuiContainer, Box as MuiBox } from "@material-ui/core";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./pages/Home.page";
import CartPage from "./pages/Cart.page";
import LoginPage from "./pages/Login.page";
import SignInPage from "./pages/SignIn.page";
import ViewProduct from "./components/ViewProduct/ViewProduct.component";
import PaymentComponent from "./components/Checkout/Payment/Payment.component";
import PlaceOrderComponent from "./components/Checkout/Place-order/PlaceOrder.component";

import OrderComponent from "./components/Order/Order.main.component";

import Header from "./layouts/Header.layout";
import ShippingComponent from "./components/Checkout/Shipping/Shipping.component";
import OrderMineComponent from "./components/OrderMine/OrderMine.main.component";
import UserProfileDetailsComponent from "./components/UserProfile/UserProfile.main.component";

import PrivateRoute from "./PrivateRoute/PrivateRoute.component";
import AdminRoute from "./PrivateRoute/AdminRoute.component";
import SellerRoute from "./PrivateRoute/SellerRoute.component";

import AdminDashboardMainComponent from "./components/Admin/Dashboard/Dashboard.main.component";
import AdminOrderListComponent from "./components/Admin/OrderList/OrderList.main.component";
import AdminProductListComponent from "./components/Admin/ProductList/ProductList.main.component";
import AdminProductUpdateComponent from "./components/Admin/ProductList/Product.update.component";
import AdminProductListCreateComponent from "./components/Admin/ProductList/Product.create.component.jsx";
import OrderDeliveredComponent from "./components/Admin/OrderDelivered/OrderDelivered.main.component";

import UserListComponent from "./components/Admin/UserList/UserList.main.component";
import UserListDetailComponent from "./components/Admin/UserList/UserList.update.component";
import SellerComponent from "./components/Seller/Seller.component";

import SearchResult from "./components/Search/Search.result.component";

const RouterRoutes = () => {
  return (
    <MuiContainer maxWidth="md" component={MuiBox}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cart/:id?" component={CartPage} />
          <Route exact path="/seller/:id" component={SellerComponent} />
          <Route exact path="/log-in" component={LoginPage} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/shipping" component={ShippingComponent} />
          <Route exact path="/payment" component={PaymentComponent} />
          <Route exact path="/place-order" component={PlaceOrderComponent} />
          <Route exact path="/order-mine" component={OrderMineComponent} />
          <Route exact path={`/view-product/:id`} component={ViewProduct} />

          <PrivateRoute
            path="/user-profile"
            component={UserProfileDetailsComponent}
          />
          <PrivateRoute exact path="/order/:id" component={OrderComponent} />

          <AdminRoute
            exact
            path="/order-delivered/:id"
            component={OrderDeliveredComponent}
          />
          <AdminRoute
            path="/admin//dashboard"
            component={AdminDashboardMainComponent}
          />
          <AdminRoute
            path="/admin/product-list"
            component={AdminProductListComponent}
          />
          <AdminRoute
            path="/admin/product-list-update/:id"
            component={AdminProductUpdateComponent}
          />
          <AdminRoute
            path="/admin/order-list"
            component={AdminOrderListComponent}
          />
          <AdminRoute path="/user/user-list" component={UserListComponent} />
          <AdminRoute
            path="/admin/create-product"
            component={AdminProductListCreateComponent}
          />
          <AdminRoute
            path="/user/user-list-detail/:id"
            component={UserListDetailComponent}
          />

          <SellerRoute
            path="/admin/product-list"
            component={AdminProductListComponent}
          />
          <SellerRoute
            path="/admin/order-list"
            component={AdminOrderListComponent}
          />

          <Route
            path="/search/name/:name?"
            component={SearchResult}
            exact />
          
          <Route
            path="/search/category/:category"
            component={SearchResult}
            exact />

          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchResult}
            exact />
        </Switch>
      </Router>
    </MuiContainer>
  );
};

export default RouterRoutes;
