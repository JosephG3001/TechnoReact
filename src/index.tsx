import { ConnectedRouter } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { technoHistory, technoStore } from "./redux/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={technoStore}>
    <ConnectedRouter history={technoHistory}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// export function forceLogin() {
//   store.dispatch(push("/"));
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
