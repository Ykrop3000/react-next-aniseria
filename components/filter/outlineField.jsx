import React from "react";
import { useRouter } from "next/router";
import {
  Select,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: "130px",
    marginLeft: "8px",
    marginBottom: "8px",
  },
  select: {
    padding: 0,
  },
}));

export default function filterField({
  data = [],
  active = [],
  placeholder = "Жанры",
  selectedText = "жанр",
  multiple = true,
  name = "genre",
}) {
  const router = useRouter();
  const [selected, setSelect] = React.useState(
    router.query[name] ? router.query[name].split(",") : []
  );

  const classes = useStyles();
  React.useEffect(() => {
    setSelect(router.query[name] ? router.query[name].split(",") : []);
  }, [router.query[name]]);

  const handleChange = (event) => {
    setSelect(event.target.value);
    const params = Object.assign({}, router.query, {
      [name]: multiple ? event.target.value.join(",") : event.target.value,
    });
    router.push({ query: params });
  };

  return (
    <FormControl className={classes.form}>
      <Select
        variant="outlined"
        defaultValue={"false"}
        className={classes.select}
        value={selected}
        displayEmpty
        onChange={handleChange}
        multiple={multiple}
        renderValue={(select) => {
          return select.length === 0
            ? placeholder
            : `${select.length} ${selectedText}`;
        }}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>

        {data.map((element) => (
          <MenuItem key={element.id} value={String(element.id)}>
            <Checkbox
              size="small"
              checked={selected.includes(String(element.id))}
            />
            <ListItemText primary={element.russian} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
