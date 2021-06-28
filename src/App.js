import React from "react";
import axios from "axios";
import useSWR from "swr";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

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

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Github Repos
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default App;
