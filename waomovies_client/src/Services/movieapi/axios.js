import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_MOVIEAPI,
  headers: {
    "Content-type": "application/json"
  }
});