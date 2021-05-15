import React from "react";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "src/theme";
import "assets/css/main.css";
import Header from "components/base/header";
import { Provider } from "react-redux";
import { useStore } from "store";
import {
  HEADERABSOLUTE,
  HEADERTRANSPARENT,
  USER,
} from "../store/actions/types";
import { useRouter } from "next/router";
import { instance, getMe } from "src/api";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  const headerController = () => {
    const absoluteList = ["/animes", "/animes/[id]", "/user/bookmarks"];
    const transparentList = ["/animes/[id]", "/user/bookmarks"];
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

  const userController = async () => {
    if (
      Object.keys(store.getState().user.user).length === 0 &&
      store.getState().user.isLogged
    ) {
      console.log("getMe");
      getMe()
        .then(({ data }) => {
          store.dispatch({ type: USER, payload: data });
        })
        .catch((err) => {
          delete instance.defaults.headers.common["Authorization"];
          localStorage.removeItem("token");
        });
    }
  };

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    instance.defaults.headers.common["Authorization"] =
      typeof window != "undefined" && window.document
        ? localStorage.getItem("token")
        : "";
    headerController();
    userController();
  }, []);

  React.useEffect(() => {
    headerController();
  }, [router.pathname]);

  return (
    <React.Fragment>
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
