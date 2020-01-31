import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { enqueueSnackbar, closeSnackbar } from "@actions/notifications";
import { logout } from "@actions/auth";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import PropTypes from "prop-types";

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  dispatch =>
    bindActionCreators(
      {
        enqueueSnackbar,
        closeSnackbar,
        logout
      },
      dispatch
    )
)
class Header extends Component {
  static propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    closeSnackbar: PropTypes.func.isRequired
  };

  handleClick = () => {
    // NOTE:
    // if you want to be able to dispatch a `closeSnackbar` action later on,
    // you SHOULD pass your own `key` in the options. `key` can be any sequence
    // of number or characters, but it has to be unique to a given snackbar.
    this.props.enqueueSnackbar("Failed fetching data.", {
      action: key => (
        <IconButton
          color="inherit"
          onClick={() => this.props.closeSnackbar(key)}
        >
          <ClearIcon />
        </IconButton>
      )
    });
  };

  handleDimissAll = () => this.props.closeSnackbar();

  render() {
    const authLinks = (
      <Button onClick={this.props.logout} color="inherit">
        Logout
      </Button>
    );

    const guestLinks = (
      <>
        <Button component={Link} to="/register" color="inherit">
          Register
        </Button>
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
      </>
    );

    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Box display="flex" alignItems="center">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                <Button component={Link} to="/" color="inherit">
                  Lead Manager
                </Button>
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" flex="1">
              {this.props.isAuthenticated ? authLinks : guestLinks}
            </Box>
            <Box display="flex" justifyContent="flex-end" flex="1">
              <IconButton onClick={this.handleClick} color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton onClick={this.handleDimissAll} color="inherit">
                <NotificationsOffIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );
  }
}

export default Header;
