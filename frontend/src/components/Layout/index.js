import React from "react";
import Header from "@components/Header";
import Container from "@material-ui/core/Container";

const Layout = props => {
  return (
    <div>
      <Header />
      <Container maxWidth="sm">{props.children}</Container>
    </div>
  );
};

export default Layout;
