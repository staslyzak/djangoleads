import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "@actions/auth";
import { enqueueSnackbar } from "@actions/notifications";
import { PropTypes } from "prop-types";

@connect(state => ({ isAuthenticated: state.auth.isAuthenticated }), {
  register,
  enqueueSnackbar
})
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  handleOnChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleOnSubmit = evt => {
    const { password2, ...data } = this.state;
    if (data.password !== password2) {
      this.props.enqueueSnackbar("Passwords doesn't match", {
        variant: "error"
      });
    } else {
      this.props.register(data);
    }

    evt.preventDefault();
  };
  render() {
    return (
      <Box mt={2}>
        <Typography variant="h4" paragraph>
          Register
        </Typography>
        <form onSubmit={this.handleOnSubmit}>
          <Box>
            <TextField
              fullWidth
              name="username"
              label="Username"
              margin="normal"
              variant="outlined"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleOnChange}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              margin="normal"
              variant="outlined"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              margin="normal"
              variant="outlined"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
            <TextField
              fullWidth
              name="password2"
              label="Confirm Password"
              margin="normal"
              variant="outlined"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.handleOnChange}
            />
          </Box>
          <Box mt={2}>
            <Button
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </form>
        <Box m={2}>
          <Typography align="center">
            Alerdy have a account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default Register;
