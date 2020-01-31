import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "@components/Loader";

const PrivatRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return <Loader />;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default connect(
  state => ({
    auth: state.auth
  }),
  null
)(PrivatRoute);
