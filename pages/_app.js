import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function MyApp({ Component, pageProps }) {
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

export default MyApp;
