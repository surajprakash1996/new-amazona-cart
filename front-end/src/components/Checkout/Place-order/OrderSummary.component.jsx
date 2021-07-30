/** @format */

import { makeStyles, Box, Typography, Button } from "@material-ui/core";
import React , {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ORDER_CREATE_RESET } from "../../../constants/Order.constant";
import Message from "../../../helpers/Message.helper";

import { placeOrderAction } from "../../../action-creators/PlaceOrder.action";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "white",
    margin: "10px 5px 10px 0px",
  },
  headerLine: {
    fontSize: "22px",
    fontWeight: "bolder",
  },
  heading: {
    fontSize: "15px",
  },
  value: {
    fontSize: "15px",
  },
}));

const OrderSummaryComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const Cart = props.Cart
  const placeOrderCart = useSelector((state) => state.PlaceOrder);
  const { loading, placeOrder, success, error } = placeOrderCart;

  if (!Cart.paymentMethod) {
    history.push("/payment");
  }

  const toPrice = (numb) => {
    return numb.toFixed(2);
  };

  Cart.itemsPrice = toPrice(
    Cart.cartItems.reduce(
      (accum, current) => accum + Number(current.qty) * Number(current.price),
      0
    )
  );
  Cart.shippingPrice = Cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  Cart.taxPrice = toPrice(0.15 * Cart.itemsPrice);
  Cart.totalPrice = toPrice(
    Number(Cart.itemsPrice) + Number(Cart.shippingPrice) + Number(Cart.taxPrice)
  );

  const placeOrderHandler = () => {
    const order = {
      orderItems: Cart.cartItems,
      paymentMethod: Cart.paymentMethod,
      shippingAddress: Cart.shippingAddress,

      itemsPrice: Cart.itemsPrice,
      taxPrice: Cart.taxPrice,
      shippingPrice: Cart.shippingPrice,
      totalPrice: Cart.totalPrice,
    };
    dispatch(placeOrderAction(order));
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${placeOrder._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, placeOrder, history]);

  return (
    <div className={classes.root}>
      <Box pb={2}>
        <Typography className={classes.headerLine}>Order Summary</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography className={classes.heading}>Items</Typography>
        </Box>
        <Box>
          <Typography className={classes.heading}>
            ${Cart.itemsPrice}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography className={classes.heading}>Shipping</Typography>
        </Box>
        <Box>
          <Typography className={classes.heading}>
            ${Cart.shippingPrice}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography className={classes.heading}>Tax(15%)</Typography>
        </Box>
        <Box>
          <Typography className={classes.heading}>${Cart.taxPrice}</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box>
          <Typography style={{ fontSize: "17px", fontWeight: "bold" }}>
            Total Order
          </Typography>
        </Box>
        <Box>
          <Typography style={{ fontSize: "17px", fontWeight: "bold" }}>
            ${Cart.totalPrice}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          fullWidth
          onClick={placeOrderHandler}
          variant="contained"
          color="primary"
          style={{ textTransform: "capitalize" }}>
          Place Order
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <Typography variant="body1">Loading...</Typography>
          </Box>
        ) : null}

        {error ? <Message severity="error" message={error} /> : null}
      </Box>
    </div>
  );
};

export default OrderSummaryComponent;
