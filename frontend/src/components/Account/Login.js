import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "@actions/auth";
import { PropTypes } from "prop-types";

@connect(state => ({ isAuthenticated: state.auth.isAuthenticated }), { login })
class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  handleOnChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleOnSubmit = evt => {
    evt.preventDefault();
    this.props.login(this.state);
  };

  render() {
    return (
      <Box mt={2}>
        <Typography variant="h4" paragraph>
          Login
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
              name="password"
              label="Password"
              margin="normal"
              variant="outlined"
              placeholder="Password"
              value={this.state.password}
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
              Login
            </Button>
          </Box>
        </form>
        <Box m={2}>
          <Typography align="center">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default Login;
