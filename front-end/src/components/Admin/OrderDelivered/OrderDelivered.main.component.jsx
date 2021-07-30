/** @format */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../../helpers/Message.helper";
import Loading from "../../../helpers/Loading.helper";
import { useParams, useHistory } from "react-router";

import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import ShippingCardOrder from "./ShippingDelivered.card.component";
import PaymentCardComponent from "./PaymentDelivered.card.component";
import OrderItemsComponent from "./OrderDeliveredItems.card.component";
import OrderSummaryComponent from "./OrderDeliveredSummary.component";

import { OrderDetailsAction } from "../../../action-creators/Order.action";
import * as OrderPayConstant from "../../../constants/Order.constant";



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


  const { loading, error, orderDetails } = useSelector(
    (state) => state.OrderDetails
  );

  const user = useSelector((state) => state.User);

  const {
    loading: loadingDelivered,
    error: errorDelivered,
    success: successDelivered
  } =  useSelector(state => state.OrderDelivered);

  useEffect(() => {

    if (!orderDetails || successDelivered || orderDetails._id !== id) {
      dispatch({ type: OrderPayConstant.ORDER_DELIVERED_RESET });
      dispatch(OrderDetailsAction(id));
    } 
  }, [id, user, history, successDelivered ,orderDetails, dispatch]);

  return (
    <div>
      <h3>Admin Order Delivered Dashboard.</h3>

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
                totalPrice={orderDetails.totalPrice}
                isPaid={orderDetails.isPaid}
                Cart={orderDetails}
                errorDelivery={errorDelivered}
                loadingDelivery={loadingDelivered}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderMainComponent;
