import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import OrgRepos from "./OrgRepos";

const data = {
  appName: "Github Repos",
};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {data.appName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box m={2}>
          <OrgRepos />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
