import http from "./axios";

const getAll = () => {
  return http.get("/characters");
};

const get = (id) => {
  return http.get(`/characters/${id}`);
};

const create = (data) => {
  return http.post("/characters", data);
};

const update = (id, data) => {
  return http.put(`/characters/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/characters/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
