/** @format */

import React, { useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
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
import IconButton from "@material-ui/core/IconButton";
import MessageHelper from "../../../helpers/Message.helper";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  fetchProductList,
  ProductDeleteAction,
} from "../../../action-creators/Product.actions";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { PRODUCT_DELETE_RESET } from "../../../constants/Product.constant";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
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

const ProductListMainComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const sellerMode = location.pathname.indexOf('/seller') >= 0;


  const { loading, error, products } = useSelector(
    (state) => state.ProductList
  );

  const { userInfo } = useSelector((state) => state.User);
  const { success: successDelete } = useSelector(
    (state) => state.ProductDelete
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure to Delete Product")) {
      dispatch(ProductDeleteAction(id));
    }
  };

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(fetchProductList({seller: sellerMode ? userInfo._id : ''}));
  }, [dispatch, successDelete, userInfo, sellerMode]);

  return (
    <div>
      <Box my={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", color: "teal" }}>
            Product list
          </Typography>
        </Box>

        <Box>
          <Button
            endIcon={<AddIcon />}
            variant="outlined"
            color="primary"
            component={RouterLink}
            to={`/admin/create-product`}
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
            size="large">
            Create New
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Loading />
      ) : error ? (
        <MessageHelper severity="error" message={error} />
      ) : (
        <React.Fragment>
          <Box>
            <TableContainer component={Paper} style={{ height: "530px" }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Brand</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell component="th" scope="row">
                        {item._id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.name.substring(0, 30)}...
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ${item.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.brand}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          component={RouterLink}
                          to={`/admin/product-list-update/${item._id}`}
                          variant="outlined">
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          variant="outlined"
                          onClick={() => deleteHandler(item._id)}>
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

export default ProductListMainComponent;
