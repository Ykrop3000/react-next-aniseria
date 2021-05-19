import React from "react";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "src/theme";
import "assets/css/main.css";
import Header from "components/base/header";
import { Provider } from "react-redux";
import { useStore } from "store";
import { HEADERABSOLUTE, HEADERTRANSPARENT } from "../store/actions/types";
import { useRouter } from "next/router";

export default function MyApp(props) {
  const { Component, pageProps, isMobile } = props;
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
      <StylesProvider injectFirst>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <div id="app" className="app">
              <Header isMobile={isMobile} />
              <Component {...pageProps} isMobile={isMobile} />
            </div>
          </ThemeProvider>
        </Provider>
      </StylesProvider>
    </React.Fragment>
  );
}
MyApp.getInitialProps = async (something) => {
  const { Component, ctx } = something;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let isMobileView = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;

  return {
    pageProps,
    isMobile: isMobileView
      ? isMobileView.match(
          /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      : false,
  };
};
