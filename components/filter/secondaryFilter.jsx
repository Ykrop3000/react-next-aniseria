import React from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import styles from "assets/css/secondaryFilter.module.css";
import Field from "./field";

import makeStyles from '@mui/styles/makeStyles';
// import SwapVertIcon from "@mui/icons-material/SwapVert";
// import ViewComfyIcon from "@mui/icons-material/ViewComfy";
// import ListIcon from "@mui/icons-material/List";
// import { useRouter } from "next/router";

import { VIEWMODE } from "../../store/actions/types";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "6px",
    minWidth: "32px",
    marginLeft: "8px",
  },
  button_active: {
    background: theme.palette.background.paper,
  },
}));

function SecondaryFilter({ orderData, mode, setGridMode, setListMode }) {
  // const classes = useStyles();
  // const router = useRouter();

  // const sortReverce = () => {
  //   const q = router.query.order;
  //   if (q) {
  //     const params = Object.assign({}, router.query, {
  //       order: q.includes("-") ? q.slice(1) : "-" + q,
  //     });
  //     router.push({ query: params });
  //   } else {
  //     const params = Object.assign({}, router.query, {
  //       order: "-" + orderData[0].id,
  //     });
  //     router.push({ query: params });
  //   }
  // };

  return (
    <Box className={styles.secondaryFilter}>
      <div>
        <Field data={orderData} active={orderData[0]} name="order" />
        {/* <Button onClick={sortReverce} className={classes.button}>
          <SwapVertIcon />
        </Button> */}
      </div>
      <div className={styles.mode}>
        {/* <Button
          onClick={setListMode}
          className={`${classes.button} ${
            mode === "list" ? classes.button_active : ""
          }`}
        >
          <ListIcon />
        </Button>
        <Button
          onClick={setGridMode}
          className={`${classes.button} ${
            mode === "grid" ? classes.button_active : ""
          }`}
        >
          <ViewComfyIcon />
        </Button> */}
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  mode: state.list.viewMode,
  orderData: state.constant.orderData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setGridMode: () => dispatch({ type: VIEWMODE, payload: "grid" }),
    setListMode: () => dispatch({ type: VIEWMODE, payload: "list" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryFilter);
