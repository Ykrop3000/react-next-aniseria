import React from "react";
import NoSsr from "@material-ui/core/NoSsr";
import { useRouter } from "next/router";

import { TextField, InputAdornment } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { fetchAnimes } from "src/api";
import ListCardSearch from "components/cards/listCards/searchCard";

const useStyles = makeStyles({
  search: {
    width: "400px",
    marginLeft: "8px",
    marginRight: "8px",
    "@media (max-width: 600px)": {
      width: "100%",
      marginRight: 0,
    },
  },
  root: {
    paddingTop: "6px !important",
    paddingBottom: "6px !important",
  },
  input: {
    paddingTop: "4.5px !important",
    paddingBottom: "4.5px !important",
  },
});

export default function SearchField() {
  const router = useRouter();
  const classes = useStyles();
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(router.query.search || "");

  const getAnimes = async (search) => {
    const resp = await fetchAnimes({
      limit: 8,
      order: "ranked",
      search,
    });
    setOptions(resp.data);
  };

  const handleChange = (event) => {
    if (event.target.value === "") {
      setOptions([]);
    } else {
      getAnimes(event.target.value);
    }
    setValue(event.target.value);
  };

  React.useEffect(() => {
    setValue(router.query.search);
  }, []);

  return (
    <NoSsr>
      <Autocomplete
        id="search"
        fullWidth={true}
        options={options}
        freeSolo
        getOptionLabel={(option) => option.russian}
        className={classes.search}
        classes={{
          input: classes.input,
          inputRoot: classes.root,
        }}
        renderOption={(option, { selected }) => (
          <ListCardSearch data={option} />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            margin="dense"
            placeholder="Что ищем, семпай?"
            value={value}
            onChange={handleChange}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                router.push({ pathname: "animes", query: { search: value } });
                ev.preventDefault();
              }
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </NoSsr>
  );
}
