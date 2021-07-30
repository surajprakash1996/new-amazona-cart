/** @format */

import React , { useEffect }from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import ShippingCardScreen from './Shipping.card.component';
import PaymentCardComponent from './Payment.card.component';
import OrderItemsComponent from './OrderItems.card.component';

import OrderSummaryComponent from "./OrderSummary.component";

const PlaceOrderScreen = () => {
 
  const user = useSelector((state) => state.User);
  const history = useHistory();

  const Cart = useSelector((state) => state.Cart);

  useEffect(() => {
    if(!user.userInfo) {
      history.push('/sign-in');
    }
  }, [user, history])

  return (
    <div>
      <Grid container>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <ShippingCardScreen shipping={Cart.shippingAddress}/>
          <PaymentCardComponent  payment={Cart.paymentMethod}/>
          <OrderItemsComponent items={Cart.cartItems}/>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <OrderSummaryComponent Cart={Cart}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaceOrderScreen;
