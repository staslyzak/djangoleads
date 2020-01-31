import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postLead } from "@actions/leads";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AddIcon from "@material-ui/icons/Add";

@connect(null, { postLead })
class Form extends Component {
  static propTypes = {
    postLead: PropTypes.func.isRequired
  };

  state = {
    name: "",
    email: "",
    message: ""
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.postLead(this.state);
  };

  render() {
    return (
      <Box mb={4}>
        <ExpansionPanel elevation={0}>
          <ExpansionPanelSummary
            expandIcon={<AddIcon />}
            style={{ padding: 0 }}
          >
            <Typography variant="h4">Add Lead</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form onSubmit={this.handleSubmit}>
              <Box mb={4}>
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={this.handleChange}
                  label="Name"
                  name="name"
                  variant="outlined"
                  placeholder="Name"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={this.handleChange}
                  label="E-mail"
                  name="email"
                  type="email"
                  variant="outlined"
                  placeholder="E-mail"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={this.handleChange}
                  label="Message"
                  name="message"
                  variant="outlined"
                  placeholder="Message"
                  multiline
                  rows="4"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Lead
              </Button>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    );
  }
}

export default Form;
