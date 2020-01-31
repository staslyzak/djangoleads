import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { renderCloseAction } from "@components/Notifier";
import { HashRouter as Router } from "react-router-dom";

const notistackRef = React.createRef();
const onClickDismiss = key => () => notistackRef.current.closeSnackbar(key);

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={2}
      ref={notistackRef}
      action={key => renderCloseAction(onClickDismiss(key))}
    >
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
