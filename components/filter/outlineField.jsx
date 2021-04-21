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
  },
  select: {
    padding: 0,
  },
}));

export default function filterField({
  data = [],
  active = [],
  placeholder = "Типы",
  selectedText = "тип",
  multiple = true,
  name = "genres",
}) {
  const [selected, setSelect] = React.useState(active);
  const router = useRouter();
  const classes = useStyles();
  const isFirstRun = React.useRef(true);

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  React.useEffect(() => {
    if (isFirstRun.current !== 0) {
      isFirstRun.current = false;
      return;
    }
    const params = Object.assign({}, router.query, {
      [name]: multiple ? selected.join(",") : selected,
    });
    router.push({ query: params });
  }, [selected]);

  return (
    <FormControl className={classes.form}>
      <Select
        variant="outlined"
        className={classes.select}
        value={selected}
        onChange={handleChange}
        multiple={multiple}
        renderValue={(select) => `${select.length} ${selectedText}`}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>

        {data.map((element) => (
          <MenuItem key={element.id} value={element.id}>
            <Checkbox size="small" checked={selected.includes(element.id)} />
            <ListItemText primary={element.russian} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
