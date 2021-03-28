import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { OidcProvider } from "redux-oidc";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./index.css";
import { history, store } from "./redux/store";
import userManager from "./redux/userManager";
import * as serviceWorker from "./serviceWorker";
import { DefaultStyle } from "./styles";
import { theme } from "./styles/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <DefaultStyle />
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </OidcProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
