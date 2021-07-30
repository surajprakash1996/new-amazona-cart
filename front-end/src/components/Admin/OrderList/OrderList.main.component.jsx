/** @format */

import React, { useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../helpers/Loading.helper";
import MessageHelper from "../../../helpers/Message.helper";
import { useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ORDER_DELETE_RESET } from "../../../constants/Order.constant";
import {
  OrderDeleteAction,
  OrderListAction,
} from "../../../action-creators/OrderList.action";

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

const OrderListMainComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sellerMode = location.pathname.indexOf('/seller') >= 0;

  const { userInfo } = useSelector((state) => state.User);

  const { loading, error, orderList } = useSelector((state) => state.OrderList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.OrderDelete);

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(OrderListAction({ seller: sellerMode ? userInfo._id : ''}));
    return () => {
      dispatch({ type: ORDER_DELETE_RESET });
    };
  }, [dispatch, successDelete,sellerMode,userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete order ?")) {
      dispatch(OrderDeleteAction(id));
    }
  };

  return (
    <div>
      <Box my={2} p={3} style={{ backgroundColor: "white" }}>
        <Typography variant="h4">Order List</Typography>

        {loadingDelete && <Loading />}

        {errorDelete && (
          <MessageHelper severity="error" message={errorDelete} />
        )}

        {successDelete && (
          <MessageHelper severity="success" message="Order deleted." />
        )}
      </Box>

      {loading ? (
        <Loading />
      ) : error ? (
        <MessageHelper severity="error" message={error} />
      ) : (
        <React.Fragment>
          <Box>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">User</StyledTableCell>
                    <StyledTableCell align="center">Total</StyledTableCell>
                    <StyledTableCell align="center">Paid</StyledTableCell>
                    <StyledTableCell align="center">Delivered</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell component="th" scope="row">
                        {item._id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.createdAt.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.user.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.totalPrice.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.isPaid ? item.paidAt.substring(0, 10) : "No"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.isDelivered
                          ? item.deliveredAt.substring(0, 10)
                          : "No"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          onClick={() => history.push(`/order-delivered/${item._id}`)}
                          variant="outlined">
                          <VisibilityIcon />
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
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderListMainComponent;
