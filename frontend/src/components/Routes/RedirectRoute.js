import React from "react";
import { Route, Redirect } from "react-router-dom";

const RedirectRoute = ({
  component: Component,
  condition,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (condition) {
          return <Redirect to={redirectPath} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default RedirectRoute;
