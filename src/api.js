import axios from "axios";

export const instance = axios.create();

export const fetchAnimes = (params) => {
  return instance.get("https://shikimori.one/api/animes", { params });
};
export const fetchAnime = (id) => {
  return instance.get("https://shikimori.one/api/animes/" + id);
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
  const header = instance.defaults.headers.common["Authorization"];
  delete instance.defaults.headers.common["Authorization"];

  const resp = instance.get("https://kodikapi.com/list", { params: data });

  instance.defaults.headers.common["Authorization"] = header;
  return resp;
};

export const getEpisodes = (id) => {
  const params = {
    token: "b7cc4293ed475c4ad1fd599d114f4435",
    shikimori_id: id,
    with_episodes: true,
  };
  const header = instance.defaults.headers.common["Authorization"];
  delete instance.defaults.headers.common["Authorization"];

  const resp = instance.get("https://kodikapi.com/search", { params });

  instance.defaults.headers.common["Authorization"] = header;

  return resp;
};

export const getGenres = () => {
  return instance.get("https://shikimori.one/api/genres");
};

export const signOut = () => {
  return instance.get("https://shikimori.one/api/users/sign_out");
};

export const signIn = (params) => {
  instance({
    url: "https://shikimori.one/oauth/token",
    data: params,
    method: "POST",
  })
    .then((resp) => {
      const token = `${resp.data.token_type} ${resp.data.access_token}`;
      localStorage.setItem("token", token);
      instance.defaults.headers.common["Authorization"] = token;
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
    });
};

export const getMe = () => {
  return instance.get("https://shikimori.one/api/users/whoami");
};

//
export const getFavorites = (id) => {
  return instance.get(`https://shikimori.one/api/users/${id}/anime_rates`);
};

export const addFavorite = ({ user_id, target_id, status }) => {
  return instance.post("https://shikimori.one/api/v2/user_rates", {
    user_rate: {
      user_id: user_id,
      target_id: target_id,
      target_type: "Anime",
      status: status,
    },
  });
};
export const removeFavorite = (id) => {
  return instance.delete("https://shikimori.one/api/v2/user_rates/" + id);
};
