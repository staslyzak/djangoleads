import React from "react";
import { Route, Switch } from "react-router-dom";
import Notifier from "@components/Notifier";
import DashBoard from "@components/DashBoard";
import Login from "@components/Account/Login";
import Register from "@components/Account/Register";
import Layout from "@components/Layout";
import PrivatRoute from "@components/Routes/PrivatRoute";
import RedirectRoute from "@components/Routes/RedirectRoute";
import { loadUser } from "@actions/auth";
import { connect } from "react-redux";

// const PUBLIC_ROUTES = [
//   {
//     path: "/",
//     component: DashBoard,
//     exact: true
//   }
// ];

const PRIVAT_ROUTES = [
  {
    path: "/account",
    component: null,
    exact: true
  }
];

const REDIRECT_ROUTES = [
  {
    path: "/",
    redirectPath: "/login",
    condition: props => !props.auth.isAuthenticated,
    component: DashBoard,
    exact: true
  },
  {
    path: "/login",
    redirectPath: "/",
    condition: props => props.auth.isAuthenticated,
    component: Login,
    exact: true
  },
  {
    path: "/register",
    redirectPath: "/",
    condition: props => props.auth.isAuthenticated,
    component: Register,
    exact: true
  }
];

@connect(state => ({ auth: state.auth }))
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadUser());
  }

  render() {
    return (
      <Layout>
        <Notifier />
        <Switch>
          {PRIVAT_ROUTES.map(route => (
            <PrivatRoute key={route.path} {...route} />
          ))}
          {/* {PUBLIC_ROUTES.map(route => (
            <Route key={route.path} {...route} />
          ))} */}
          {REDIRECT_ROUTES.map(route => (
            <RedirectRoute
              key={route.path}
              {...route}
              condition={route.condition(this.props)}
            />
          ))}
        </Switch>
      </Layout>
    );
  }
}

export default App;
