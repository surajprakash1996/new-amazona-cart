/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userInfo } = useSelector((state) => state.User);
    if(!userInfo) {
      return <Redirect to="/sign-in" />
    }
    return (
    <Route
      {...rest}
      render={(...props) =>
        !userInfo || userInfo === undefined || userInfo === null ? (
          <Redirect to="/sign-in" />
        ) : (
          <Component {...props}></Component>
        )
      }
    />
  );
};

export default PrivateRoute;