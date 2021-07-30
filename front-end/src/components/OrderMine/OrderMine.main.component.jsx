import React, { useEffect } from "react";
import { Box, Typography,Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { orderMineAction } from '../../action-creators/OrderMine.action';
import Loading from '../../helpers/Loading.helper';
import MessageHelper from '../../helpers/Message.helper';
import { useHistory } from "react-router";
import { ORDER_DETAILS_RESET } from "../../constants/Order.constant";


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

const OrderMineComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {loading, error, orderMine } = useSelector((state) => state.OrderMine);
  const {userInfo} = useSelector((state) => state.User);


  useEffect(() => {
      if(!userInfo) {
          history.push('/sign-in')
      }
      dispatch(orderMineAction());
  },[dispatch,userInfo,history])


  const detailHandler = (id) => {
      dispatch({type: ORDER_DETAILS_RESET});
      history.push(`/order/${id}`)
  }

  return (
    <div>
      <Box my={2} p={3} style={{backgroundColor:'white'}}>
        <Typography variant="h4">Order History</Typography>
      </Box>


      {
        loading ? <Loading /> : error ? <MessageHelper severity="error" message={error} /> : (
            <React.Fragment>
            <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Total</StyledTableCell>
                <StyledTableCell align="center">Paid</StyledTableCell>
                <StyledTableCell align="center">Delivered</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              orderMine.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component="th" scope="row">{item._id}</StyledTableCell>
                  <StyledTableCell align="center">{item.createdAt.substring(0,10)}</StyledTableCell>
                  <StyledTableCell align="center">{item.totalPrice.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="center">{item.isPaid ? item.paidAt.substring(0,10): "No"}</StyledTableCell>
                  <StyledTableCell align="center">{item.isDelivered ? item.deliveredAt.substring(0,10): "No"}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => detailHandler(item._id)} variant="outlined">
                      Details
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </React.Fragment>

        )
      }

    </div>
  );
};

export default OrderMineComponent;




