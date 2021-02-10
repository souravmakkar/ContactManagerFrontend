import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthService from './auth.service';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={
      (props) =>( AuthService.getLoggedIn() === true)
            ? <Component {...props} />
      :<Redirect to="/signin" />
    } />
  )
}

export default ProtectedRoute;