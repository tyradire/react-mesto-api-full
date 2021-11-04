import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest  }) => {
  return (
    <Route {...rest} render={props => rest.loggedIn === true ? <Component {...props} {...rest} /> : <Redirect to="./sign-up" />} />
)}

export default ProtectedRoute;