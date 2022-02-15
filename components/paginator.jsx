import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Pagination from '@mui/material/Pagination';
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "24px 16px 16px",
  },
}));

export default function PaginationRounded({ pages = 10 }) {
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);

    const params = Object.assign({}, router.query, { page: value });
    router.push({ query: params });
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}
