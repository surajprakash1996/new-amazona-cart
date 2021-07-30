/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const SellerRoute = ({ component: Component, ...rest }) => {
    const { userInfo } = useSelector((state) => state.User);
    if(!userInfo) {
      return <Redirect to="/sign-in" />
    }
    return (
    <Route
      {...rest}
      render={(...props) =>
        (!userInfo || userInfo === undefined || userInfo === null) && !userInfo.isSeller ? (
          <Redirect to="/sign-in" />
        ) : (
          <Component {...props}></Component>
        )
      }
    />
  );
};

export default SellerRoute;