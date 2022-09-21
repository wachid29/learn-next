import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "next/app";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { Provider, useSelector } from "react-redux";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainApp Component={Component} pageProps={pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

function MainApp({ Component, pageProps }) {
  axios.interceptors.request.use(
    function (config) {
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return <Component {...pageProps} />;
}

// export default MainApp;
