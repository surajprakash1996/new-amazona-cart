/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
    const { userInfo } = useSelector((state) => state.User);
    if(!userInfo) {
      return <Redirect to="/sign-in" />
    }
    return (
    <Route
      {...rest}
      render={(...props) =>
        !userInfo && !userInfo.isAdmin ? (
          <Redirect to="/sign-in" />
        ) : (
          <Component {...props}></Component>
        )
      }
    />
  );
};

export default AdminRoute;