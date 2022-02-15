import React from "react";
import { ThemeProvider } from "@mui/material/styles";
// import StylesProvider from "@mui/styles/StylesProvider";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "src/theme";
import "assets/css/main.css";
//
import Header from "components/base/header";
import Footer from "components/base/footer";
//
import { Provider } from "react-redux";
import { useStore } from "store";
import { HEADERABSOLUTE, HEADERTRANSPARENT } from "../store/actions/types";
//
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
//
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider } from "@emotion/react";
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    pageProps,
    isMobile,
    emotionCache = clientSideEmotionCache,
  } = props;
  const size = useWindowSize();
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
    <CacheProvider value={emotionCache}>
      <NextNProgress />
      {/* <StylesProvider injectFirst> */}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <div id='app' className='app'>
            <Header isMobile={isMobile} />
            <Component {...pageProps} isMobile={isMobile} width={size.width} />
            <Footer />
          </div>
        </ThemeProvider>
      </Provider>
      {/* </StylesProvider> */}
    </CacheProvider>
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

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
