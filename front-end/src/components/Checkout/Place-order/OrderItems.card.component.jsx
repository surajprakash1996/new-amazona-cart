/** @format */

import { makeStyles, Box, Typography } from "@material-ui/core";
import React from "react";

import ProductCardComponent from "./Product.card.component";

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
    fontWeight: "bold",
  },
  value: {
    fontSize: "15px",
  },
}));

const OrderItemsCardComponent = (props) => {
  const classes = useStyles();
  const { items } = props;

  return (
    <div className={classes.root}>
      <Box pb={2}>
        <Typography className={classes.headerLine}>Order Items</Typography>
      </Box>

      {items.map((item) => (
        <ProductCardComponent key={item._id} product={item} />
      ))}
    </div>
  );
};

export default OrderItemsCardComponent;
