import axios from "axios";

const apiUrl = process.env.REACT_APP_GITHUB_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 3000,
  headers: { Accept: "application/vnd.github.v3+json" },
});

export const fetcher = (url, page, offset) =>
  instance
    .get(`${url}?page=${page}&per_page=${offset}`)
    .then((res) => res.data);