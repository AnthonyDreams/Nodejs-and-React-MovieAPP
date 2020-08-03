import http from "./axios";

const getAll = () => {
  return http.get("/movies");
};

const SearchBy = (data) => {
  const queryString = new URLSearchParams(data).toString();
  return http.get("/movies?" + queryString);
};

const get = (id) => {
  return http.get(`/movies/${id}`);
};

const create = (data) => {
  return http.post("/movies", data);
};

const update = (id, data) => {
  return http.put(`/movies/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/movies/${id}`);
};

export default {
  getAll,
  SearchBy,
  get,
  create,
  update,
  remove,
};
