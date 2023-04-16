import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import UserState from "../context/user/userState";
import MyFooter from "../components/MyFooter";
import Script from "next/script";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <Head></Head>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Component {...pageProps} />
      <MyFooter />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </UserState>
  );
}

export default MyApp;
