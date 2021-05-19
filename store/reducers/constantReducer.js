import { HEADERABSOLUTE, HEADERTRANSPARENT } from "../actions/types";

const initialState = {
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
  redirect_uri: process.env.redirect_uri,

  orderData: [
    {
      id: "popularity",
      text: "По популярности",
    },
    {
      id: "ranked",
      text: "По рейтингу",
    },
    {
      id: "aired_on",
      text: "По дате выпуска",
    },
  ],
  stats: {
    planned: "Запланировано",
    watching: "Смотрю",
    rewatching: "Пересматриваю",
    completed: "Просмотрено",
    on_hold: "Отложено",
    dropped: "Брошено",
  },
  kind: {
    tv: "TV Сериал",
    movie: "Фильм",
    ova: "OVA",
    ona: "ONA",
    special: "Спешл",
    music: "Клип",
    manga: "Манга",
    manhwa: "Манхва",
    manhua: "Маньхуа",
    one_shot: "Ваншот",
    doujin: "Додзинси",
  },
  statusAnime: {
    anons: "Анонсировано",
    ongoing: "Сейчас выходит",
    released: "Вышедшее",
  },

  header: {
    transparent: false,
    absolute: false,
  },
};

export default function constant(state = initialState, action) {
  if (action.type === HEADERABSOLUTE) {
    return {
      ...state,
      header: {
        transparent: state.header.transparent,
        absolute: action.payload,
      },
    };
  }
  if (action.type === HEADERTRANSPARENT) {
    return {
      ...state,
      header: {
        transparent: action.payload,
        absolute: state.header.absolute,
      },
    };
  }
  return state;
}
