/** @format */

import { Typography, Box } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../helpers/Loading.helper";
import MessageHelper from "../../../helpers/Message.helper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import { UserListAction, userListDeleteAction } from "../../../action-creators/User.action";
import { useHistory } from "react-router";
import { USER_LIST_DELETE_RESET, USER_LIST_DETAIL_RESET, USER_LIST_RESET } from "../../../constants/User.constant";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const UserListMainComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { loading, userList, error } = useSelector((state) => state.UserList);
  
  const {success: successDelete} = useSelector((state) => state.UserListDelete)

  const deleteHandler = (id) => {
    if(window.confirm('Are You Sure to Delete User')) {
      dispatch(userListDeleteAction(id));
    }
  }

  useEffect(() => {
      dispatch({type: USER_LIST_DELETE_RESET});
      dispatch(UserListAction());
      return () => {
        dispatch({type: USER_LIST_RESET});
        dispatch({type: USER_LIST_DETAIL_RESET});
      }
  }, [dispatch]);

  useEffect(() => {
    if(successDelete) {
      dispatch({type: USER_LIST_DELETE_RESET});
      dispatch(UserListAction());
    }
    return () => {
      dispatch({type: USER_LIST_RESET});
      dispatch({type: USER_LIST_DETAIL_RESET});
    }
  }, [dispatch,successDelete]);
  return (
    <div>
      <Box my={3}>
        <Typography
          style={{
            fontWeight: "bolder",
            fontSize: "22px",
            color: "black",
          }}>
              User List
          </Typography>
      </Box>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageHelper serverity="error" message={error} />
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">isAdmin</StyledTableCell>
                  <StyledTableCell align="center">isSeller</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((item) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      {item._id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.isAdmin ? "Yes" : "No"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.isSeller ? "Yes" : "No"}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <IconButton
                        onClick={() => history.push(`/user/user-list-detail/${item._id}`)}
                        variant="outlined">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteHandler(item._id)}
                        variant="outlined">
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default UserListMainComponent;
