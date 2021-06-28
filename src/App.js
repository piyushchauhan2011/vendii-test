import React from "react";
import axios from "axios";
import useSWR from "swr";

const apiUrl = process.env.REACT_APP_GITHUB_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
  timeout: 3000,
  headers: { Accept: "application/vnd.github.v3+json" },
});

const fetcher = (url) => instance.get(url).then((res) => res.data);

function App() {
  const { data, error } = useSWR("orgs/rxhealth/repos", fetcher, {
    revalidateOnFocus: false,
  });
  if (error) alert("error occured");
  console.log({ data });
  return <p>Learn React</p>;
}

export default App;
