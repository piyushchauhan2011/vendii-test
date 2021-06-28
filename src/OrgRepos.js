import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useSWR from "swr";
import { formatDistance, subDays } from "date-fns";
import fileSize from "filesize";
import { fetcher } from "./utils/http";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ORG = process.env.REACT_APP_ORG;
const ORG_REPOS_URL = `orgs/${ORG}/repos`;

export default function OrgRepos() {
  const classes = useStyles();
  const { data, error } = useSWR(ORG_REPOS_URL, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) {
    return <div>Error occurred...</div>;
  }

  if (!data || !data.length) {
    return <div>Loading...</div>;
  }

  const repos = data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    stars: repo.stargazers_count,
    language: repo.language,
    license: repo.license?.name,
    size: repo.size,
    updatedAt: repo.updated_at,
  }));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Stars</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>License</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Last updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell component="th" scope="row">
                {repo.name}
              </TableCell>
              <TableCell align="right">{repo.stars}</TableCell>
              <TableCell>{repo.language}</TableCell>
              <TableCell>{repo.license}</TableCell>
              <TableCell align="right">{fileSize(repo.size)}</TableCell>
              <TableCell align="right">
                {formatDistance(subDays(new Date(repo.updatedAt), 3), new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
