import http from "./axios";

const getGenres = () => {
  return http.get("/utils/movies/genre");
};


export default {
    getGenres,

};
