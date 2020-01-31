import React from "react";
import Box from "@material-ui/core/Box";
import Form from "@components/Form";
import Leads from "@components/Leads";

export default function DashBoard() {
  return (
    <Box m={2}>
      <Form />
      <Leads />
    </Box>
  );
}
