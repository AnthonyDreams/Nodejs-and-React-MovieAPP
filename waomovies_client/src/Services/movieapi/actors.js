import http from "./axios";

const getAll = () => {
  return http.get("/actors");
};

const SearchBy = (data) => {
    const queryString = new URLSearchParams(data).toString()
    return http.get("/actors?"+queryString);
}

const get = (id) => {
  return http.get(`/actors/${id}`);
};

const create = (data) => {
  return http.post("/actors", data);
};

const update = (id, data) => {
  return http.put(`/actors/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/actors/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  SearchBy
};
