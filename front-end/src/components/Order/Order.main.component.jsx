/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../helpers/Message.helper";
import Loading from "../../helpers/Loading.helper";
import { useParams, useHistory } from "react-router";

import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import ShippingCardOrder from "./Shipping.card.component";
import PaymentCardComponent from "./Payment.card.component";
import OrderItemsComponent from "./OrderItems.card.component";
import OrderSummaryComponent from "./OrderSummary.component";
import { OrderDetailsAction } from "../../action-creators/Order.action";

import { payOrder } from "../../action-creators/OrderPay.action";
import * as OrderPayConstant from "../../constants/Order.constant";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(3),
    backgroundColor: "white",
    margin: "10px 5px 10px 0px",
  },
}));

const OrderMainComponent = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [sdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector((state) => state.OrderPay);

  const {
    error: errorPay,
    loading: loadingPay,
    success: successPay,
  } = orderPay;

  const { loading, error, orderDetails } = useSelector(
    (state) => state.OrderDetails
  );

  const successPaymentTrigger = (paymentResult) => {
    dispatch(payOrder(orderDetails, paymentResult));
  };

  const user = useSelector((state) => state.User);

  useEffect(() => {
    if (!user || !user.userInfo) {
      history.push("/sign-in");
    }

    const addPayPalScript = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/config/paypal/client-id"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!orderDetails || successPay  || orderDetails._id !== id) {
      dispatch({ type: OrderPayConstant.ORDER_PAY_RESET });
      dispatch(OrderDetailsAction(id));
    } else {
      if (!orderDetails.isPaid) {
        if (!window && !window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [id, user, history, successPay ,orderDetails, dispatch]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message severity="error" message={error} />
      ) : (
        <React.Fragment>
          <Grid container display="flex" justify-content="space-between">
            <Grid item xs={12}>
              <Box className={classes.grid}>
                <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                  Order : {orderDetails._id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <ShippingCardOrder
                delivery={orderDetails.isDelivered}
                shippingAddress={orderDetails.shippingAddress}
              />
              <PaymentCardComponent
                paid={orderDetails.isPaid}
                paymentMethod={orderDetails.paymentMethod}
              />
              <OrderItemsComponent cartItems={orderDetails.orderItems} />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <OrderSummaryComponent
                idParams={id}
                onSuccessHandler={successPaymentTrigger}
                errorPay={errorPay}
                loadingPay={loadingPay}
                totalPrice={orderDetails.totalPrice}
                sdk={sdkReady}
                isPaid={orderDetails.isPaid}
                Cart={orderDetails}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderMainComponent;
