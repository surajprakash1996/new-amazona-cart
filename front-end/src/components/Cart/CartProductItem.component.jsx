/** @format */

import React from "react";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import {
  fetchProductInCart,
  removeFromCart,
} from "../../action-creators/Cart.action";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "50px",
    width: "50px",
  },
  name: {
    fontSize: "13px",
    fontWeight: "bold",
  },
}));

const CarProductItem = (props) => {
  const { product } = props;
  const { _id, name, price, image, qty, countInStock } = product;
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <Grid container component={Box} my={2}>
        <Grid
          item
          component={Box}
          display="flex"
          justifyContent="center"
          xs={2}>
          <Avatar src={image} variant="square" className={classes.avatar} />
        </Grid>
        <Grid
          item
          component={Box}
          display="flex"
          justifyContent="center"
          xs={4}>
          <Typography className={classes.name}>{name}</Typography>
        </Grid>
        <Grid
          item
          component={Box}
          display="flex"
          justifyContent="center"
          xs={2}>
          <Typography className={classes.name}>${price}</Typography>
        </Grid>
        <Grid
          item
          component={Box}
          display="flex"
          justifyContent="center"          
          xs={2}>
          <TextField
            disabled={countInStock === 0}
            value={qty}
            size="small"
            onChange={(e) => dispatch(fetchProductInCart(_id, e.target.value))}
            variant="outlined"
            SelectProps={{
              native: false,
            }}
            select>
            {[...Array(countInStock).keys()].map((x) => (
              <MenuItem key={x + 1} value={x + 1}>
                {x + 1}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          component={Box}
          display="flex"
          justifyContent="center"
          item
          xs={2}>
          <IconButton
            onClick={() => dispatch(removeFromCart(_id))}
            edge="start"
            color="inherit"
            aria-label="menu">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarProductItem;
