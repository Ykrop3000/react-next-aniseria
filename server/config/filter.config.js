module.exports = {
  statuses: ["anons", "ongoing", "released"],
  kindes: [
    "tv",
    "movie",
    "ova",
    "ona",
    "special",
    "music",
    "tv_13",
    "tv_24",
    "tv_48",
  ],
  orders: [
    {
      name: "popularity",
      path: "visits",
    },
    {
      name: "id",
      path: "id",
    },
    {
      name: "ranked",
      path: "score",
    },
    {
      name: "episodes",
      path: "episodes",
    },
    {
      name: "aired_on",
      path: "aired_on",
    },
  ],
  seasons: [
    {
      name: "winter",
      path: [1, 2, 12],
    },
    {
      name: "spring",
      path: [3, 4, 5],
    },
    {
      name: "summer",
      path: [6, 7, 8],
    },
    {
      name: "fall",
      path: [9, 10, 11],
    },
  ],
  paths: {
    title: "name",
    kind: "kind",
    studios: "studios",
    status: "status",
    genres: "genres",
    aired: "aired_on",
    id: "id",
  },
};
