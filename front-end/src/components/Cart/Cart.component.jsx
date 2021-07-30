/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link as RouterLink, useHistory } from "react-router-dom";
import { fetchProductInCart } from "../../action-creators/Cart.action";

import MessageHelper from '../../helpers/Message.helper';

import {
  Box,
  Typography,
  Grid,
  Link,
  makeStyles,
  Button,
} from "@material-ui/core";
import CartProductItem from "../Cart/CartProductItem.component";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: theme.spacing(3),
  },
  cardsContainer: {
    border: "1px solid #E3e3e3",
    padding: theme.spacing(3),
    margin: "3px",
  },
}));

const CartComponent = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  
  const { cartItems , error} = useSelector((state) => state.Cart);

  const totalQty = () => {
    return cartItems.reduce((accum, curr) => accum + Number(curr.qty), 0);
  };

  const totalPrice = () => {
    return cartItems.reduce(
      (accum, curr) => accum + Number(curr.price) * Number(curr.qty),
      0
    );
  };

  const checkOutHandler = () => {
    history.push('/sign-in?redirect=shipping');
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchProductInCart(id, qty));
    }
  }, [dispatch, id, qty]);

  

  return (
    <div className={classes.root}>
      {cartItems.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Typography>Cart empty.</Typography>
          <Link to="/" component={RouterLink} variant="body2">
            Go to Shopping
          </Link>
        </Box>
      ) : (
        <Grid container component={Box} display="flex" justifyContent="center">
          {
            error && <MessageHelper severity="error" message={error} />
          }
          <Grid
            className={classes.cardsContainer}
            item
            xl={8}
            lg={8}
            md={8}
            sm={12}
            xs={12}>
            <Box>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginLeft: "20px",
                }}>
                Cart Items
              </Typography>
            </Box>
            {cartItems.map((item) => (
              <CartProductItem product={item} key={item._id} />
            ))}
          </Grid>
          <Grid
            className={classes.cardsContainer}
            item
            xl={3}
            lg={3}
            md={3}
            sm={12}
            xs={12}>
            <Box my={2}>
              <Typography style={{ fontWeight: "bold" }}>
                Subtotal ({totalQty()} items)
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography>Total</Typography>
              </Box>
              <Box>${totalPrice().toFixed(2)}</Box>
            </Box>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                onClick={() => checkOutHandler()}
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                  height: "37px",
                  textTransform: "capitalize",
                }}
                variant="contained"
                color="primary"
                size="small">
                Procced to checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CartComponent;
