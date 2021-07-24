/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState"

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  const isAuthenticated = JSON.parse(localStorage.getItem('user'));
  console.log('this', isAuthenticated);

  const { getToken } = useContext(GlobalContext);

  return (
    <Route
    {...rest}
    render={props => {
      if (!getToken()) return <Redirect to='/login' />;
      return Component ? <Component {...props} /> : render(props);
    }}
    />
  );
}

export default ProtectedRoute;