/** @format */

import React from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "50px",
    width: "50px",
  },
  name: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  root: {
      marginBottom: theme.spacing(2)
  }
}));

const ProductCardComponent = (props) => {
  const { product } = props;
  const { name, price, image, qty } = product;
  const classes = useStyles();

  const itemsPrice = () => {
      return Number(qty) * Number(price);
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          component={Box}
          display="flex"
          justifyContent="flex-start"
          item
          xs={2}>
          <Avatar src={image} variant="square" className={classes.avatar} />
        </Grid>
        <Grid
          component={Box}
          display="flex"
          justifyContent="flex-start"
          item
          xs={4}>
          <Typography className={classes.name}>{name.substring(0,30)}...</Typography>
        </Grid>
        <Grid
          component={Box}
          display="flex"
          justifyContent="center"
          item
          xs={2}>
          <Typography className={classes.name}>${price}</Typography>
        </Grid>

        <Grid
          component={Box}
          display="flex"
          justifyContent="center"
          item
          xs={1}>
          <Typography className={classes.name}>{qty}</Typography>
        </Grid>


        <Grid
          component={Box}
          display="flex"
          justifyContent="flex-end"
          item
          xs={3}>
          <Typography className={classes.name}>${price} x {qty} = { itemsPrice().toFixed(2)} </Typography>
        </Grid>

      </Grid>
    </div>
  );
};

export default ProductCardComponent;
