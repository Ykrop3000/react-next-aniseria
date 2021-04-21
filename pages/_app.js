import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import "../assets/css/main.css";
import Header from "../components/base/header";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { HEADERABSOLUTE, HEADERTRANSPARENT } from "../store/actions/types";
import { useRouter } from "next/router";
import { RemoveFromQueueOutlined } from "@material-ui/icons";
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  const headerController = () => {
    const absoluteList = ["/animes", "/animes/[id]"];
    const transparentList = ["/animes/[id]"];
    const route = router.pathname;

    if (absoluteList.includes(route)) {
      store.dispatch({ type: HEADERABSOLUTE, payload: true });
    } else {
      store.dispatch({ type: HEADERABSOLUTE, payload: false });
    }

    if (transparentList.includes(route)) {
      store.dispatch({ type: HEADERTRANSPARENT, payload: true });
    } else {
      store.dispatch({ type: HEADERTRANSPARENT, payload: false });
    }
  };

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    headerController();
  }, []);

  React.useEffect(() => {
    headerController();
  }, [router.pathname]);

  return (
    <React.Fragment>
      <Head>
        <title>AniSeria</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <div id="app" className="app">
              <Header />
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </Provider>
      </StylesProvider>
    </React.Fragment>
  );
}
export default MyApp;
