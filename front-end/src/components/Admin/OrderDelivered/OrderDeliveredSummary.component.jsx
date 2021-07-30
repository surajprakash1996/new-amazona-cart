/** @format */

import { makeStyles, Box, Typography, Button } from "@material-ui/core";
import React from "react";

import Message from "../../../helpers/Message.helper";
import {useDispatch, useSelector} from 'react-redux';
import { OrderDeliveredAction } from "../../../action-creators/OrderDelivered.action";


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
  const Cart =  props.Cart;
  const dispatch = useDispatch();
  const toPrice = (numb) => {
    return numb.toFixed(2);
  };

  Cart.itemsPrice = toPrice(
    Cart.orderItems.reduce(
      (accum, current) => accum + Number(current.qty) * Number(current.price),
      0
    )
  );
  Cart.shippingPrice = Cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  Cart.taxPrice = toPrice(0.15 * Cart.itemsPrice);
  Cart.totalPrice = toPrice(
    Number(Cart.itemsPrice) + Number(Cart.shippingPrice) + Number(Cart.taxPrice)
  );


  const {userInfo} = useSelector((state => state.User));
  
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
          <Typography className={classes.heading}>${Cart.itemsPrice}</Typography>
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


      <Box mt={1}>
  
      {
        userInfo.isAdmin && Cart.isPaid && !Cart.isDelivered ? (
          <Box>
            <Button 
               variant="contained"
               onClick={() => dispatch(OrderDeliveredAction(props.idParams))}
               disabled={Cart.isDelivered}
               fullWidth
               color="primary"
               style={{
                 fontSize:'15px',
                 fontWeight:'bold',
                 textTransform:'capitalize'
               }}>Delivered </Button>
          </Box> 
        ) : !Cart.Paid && !Cart.isDelivered ? (
          <Box mt={3}>
            <Typography variant="body1" style={{color:'red', fontWeight:'bolder'}}>Payment pending...</Typography>
          </Box>
        ) : null
      }

      {
        props.loadingDelivery && <h4>Loading...</h4>
      }
    
      {
        props.errorDelivery && <Message severity="error"  message={props.errorDelivery}/>
      }


      </Box>

  
    </div>
  );
};




export default OrderSummaryComponent;
