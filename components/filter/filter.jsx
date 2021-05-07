import OutlineField from "./outlineField";
import { getGenres } from "src/api";
import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Link from "next/link";

function Filter({ title, statusAnime }) {
  const [genres, setGenres] = React.useState([]);

  let statuses = [];
  Object.keys(statusAnime).forEach((key) => {
    statuses.push({
      id: key,
      russian: statusAnime[key],
    });
  });

  React.useEffect(async () => {
    const resp = await getGenres();
    setGenres(resp.data.filter((f) => f.kind == "anime"));
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <OutlineField data={genres} />
        <OutlineField
          data={statuses}
          selectedText="статус"
          placeholder="Статус"
          name="status"
        />
      </div>
      <div style={{ width: "100%" }}>
        <Link href="/animes">
          <Button style={{ margin: " 8px 4px -4px 12px" }} color="primary">
            Сбросить
          </Button>
        </Link>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  statusAnime: state.constant.statusAnime,
});

export default connect(mapStateToProps)(Filter);
