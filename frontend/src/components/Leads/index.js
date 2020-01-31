import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Box,
  IconButton,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { getLeads, deleteLead } from "@actions/leads";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "@components/Loader";
import PropTypes from "prop-types";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

@connect(
  state => ({
    leads: state.leads.leads,
    leadsToDelete: state.leads.leadsToDelete,
    error: state.leads.error
  }),
  { getLeads, deleteLead }
)
class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getLeads();
  }

  renderLeads = () => {
    return this.props.leads.map(item =>
      this.props.leadsToDelete.includes(item.id) ? null : (
        <StyledTableRow key={item.id}>
          <TableCell component="th" scope="row">
            {item.id}
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.message}</TableCell>
          <TableCell>
            <IconButton onClick={() => this.props.deleteLead(item.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      )
    );
  };

  render() {
    return (
      <Box>
        <Typography variant="h4" paragraph>
          Lead List
        </Typography>
        {this.props.leads.length === 0 ? (
          <Typography>You have no leads yet!</Typography>
        ) : (
          <Loader
            loading={this.props.leads}
            minHeight={200}
            error={this.props.error}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Message</StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>{this.renderLeads()}</TableBody>
            </Table>
          </Loader>
        )}
      </Box>
    );
  }
}

export default Leads;
