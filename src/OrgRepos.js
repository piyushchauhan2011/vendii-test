import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import useSWR from "swr";
import { formatDistance, subDays } from "date-fns";
import fileSize from "filesize";
import { fetcher } from "./utils/http";
import { TablePaginationActions } from "./TablePaginationActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ORG = process.env.REACT_APP_ORG;
const FACEBOOK_REPOS_TOTAL_COUNT = 112;
const ORG_REPOS_URL = `orgs/${ORG}/repos`;

export default function OrgRepos() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, error } = useSWR([ORG_REPOS_URL, page, rowsPerPage], fetcher, {
    revalidateOnFocus: false,
  });

  const handleChangePage = (event, currentPage) => {
    setPage(currentPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (error) {
    return <div>Error occurred...</div>;
  }

  if (!data || !data.length) {
    return <Skeleton variant="rect" height={120} />;
  }

  const repos = data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    license: repo.license?.name,
    size: repo.size,
    updatedAt: repo.updated_at,
  }));

  return (
    <div>
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
                  <Link href={repo.url} target="_blank">
                    {repo.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{repo.stars}</TableCell>
                <TableCell>{repo.language}</TableCell>
                <TableCell>{repo.license}</TableCell>
                <TableCell align="right">{fileSize(repo.size)}</TableCell>
                <TableCell align="right">
                  {formatDistance(
                    subDays(new Date(repo.updatedAt), 3),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={FACEBOOK_REPOS_TOTAL_COUNT}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
}
