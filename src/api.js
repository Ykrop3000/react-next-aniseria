import axios from "axios";

export const instance = axios.create();

export const fetchAnimes = (params) => {
  return instance.get("http://localhost:8080/api/animes", { params });
};

export const fetchUpdates = (params = {}) => {
  const data = Object.assign(
    {},
    {
      token: "b7cc4293ed475c4ad1fd599d114f4435",
      types: "anime-serial",
      sort: "updated_at",
      limit: 10,
      with_material_data: true,
    },
    params
  );
  return instance.get("https://kodikapi.com/list", { params: data });
};

export const getEpisodes = (id) => {
  const params = {
    token: "b7cc4293ed475c4ad1fd599d114f4435",
    title: id,
    with_episodes: true,
  };
  return instance.get("https://kodikapi.com/search", { params });
};

export const getGenres = (id) => {
  return instance.get("http://localhost:8080/api/genres");
};
