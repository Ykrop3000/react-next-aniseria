import SubHeader from "../base/subHeader";
import OutlineField from "./outlineField";
import { getGenres } from "src/api";
import React from "react";
import { connect } from "react-redux";

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
    setGenres(resp.data);
  }, []);

  return (
    <SubHeader title={title}>
      <OutlineField data={genres} />
      <OutlineField
        data={statuses}
        selectedText="статус"
        placeholder="Статус"
        name="status"
      />
    </SubHeader>
  );
}

const mapStateToProps = (state) => ({
  statusAnime: state.constant.statusAnime,
});

export default connect(mapStateToProps)(Filter);
