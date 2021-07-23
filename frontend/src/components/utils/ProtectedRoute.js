/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = JSON.parse(localStorage.getItem('user'));
  console.log('this', isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;