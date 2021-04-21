import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#4e6baf",
    },
    secondary: {
      main: "#f2f2f2",
    },
    text: {
      primary: "#f2f2f2",
      hint: "#4e6baf",
    },
    action: {
      main: "#f2f2f2",
      active: "rgba(150,140,150,.1)",
      hover: "rgba(150,140,150,.1)",
    },
    background: {
      paper: "#171717",
      default: "#121212",
    },
  },

  overrides: {
    MuiSvgIcon: {
      root: {
        color: "#f2f2f2",
        fontSize: "1.5rem",
      },
      fontSizeSmall: {
        fontSize: "1.25rem",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "12px",
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "1rem",
      },
    },
    MuiPaginationItem: {
      outlined: {
        border: "none",
      },
      page: {
        "&$selected": {
          // this is to refer to the prop provided by M-UI
          backgroundColor: "#4e6baf", // updated backgroundColor
        },
        "&$disabled": {
          display: "none",
        },
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          content: "none",
        },
      },
    },
    MuiSelect: {
      icon: {
        color: "#f2f2f2",
      },
      outlined: {
        background: "rgba(120,120,120, 0.05)",
        border: "none",
      },
    },
    MuiMenuItem: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiCheckbox: {
      small: {
        color: "red",
      },
    },
  },

  spacing: 8,
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 12,
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    h4: {
      fontSize: "1.5625rem",
      "@media (min-width: 600px)": {
        fontSize: "1.8219rem",
      },
      "@media (min-width: 960px)": {
        fontSize: "2.0243rem",
      },
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1.125rem",
      "@media (min-width: 600px)": {
        fontSize: "1.25rem",
      },
    },
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
    },
  },
});

export default theme;
