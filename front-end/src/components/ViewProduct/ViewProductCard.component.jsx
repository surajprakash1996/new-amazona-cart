/** @format */

import React, { useState } from "react";
import { useHistory,Link } from "react-router-dom";

import {
  Grid,
  Box,
  TextField,
  Paper,
  Typography,
  Avatar,
  makeStyles,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "100%",
    width: "100%",
  },
  name: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  brand: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "gray",
  },
  description: {
    fontSize: "12px",
    textAlign: "justify",
  },
  reviews: {
    fontSize: "10px",
  },
  price: {
    fontSize: "18px",
    color: "gray",
    fontWeight: "bolder",
  },
}));

const ViewProductCardComponent = (props) => {
  const { product } = props;
  const classes = useStyles();
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const {
    _id,
    name,
    description,
    image,
    countInStock,
    brand,
    price,
    rating,
    reviews,
    seller,
  } = product;
  
  console.log(seller)
  const addToCart = (id, qty) => {
    history.push(`/cart/${id}/?qty=${qty}`);  };

  return (
    <div>
      <Grid container component={Box} spacing={5}>
        <Grid
          component={Paper}
          container
          item
          xl={8}
          lg={8}
          md={12}
          sm={12}
          xs={12}>
          <Grid component={Box} p={2} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Avatar src={image} variant="square" className={classes.avatar} />
          </Grid>
          <Grid component={Box} p={2} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box>
              <Typography gutterBottom className={classes.name}>
                {name}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom className={classes.brand}>
                {brand}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom className={classes.description}>
                {description.substring(0, 120)}...
              </Typography>
            </Box>
            <Box>
              <Rating
                name="rating"
                defaultValue={rating}
                precision={0.5}
                readOnly
              />
            </Box>
            <Box>
              <Typography gutterBottom className={classes.reviews}>
                ({reviews}) Reviews
              </Typography>
            </Box>
            <Box my={1}>
              <Typography gutterBottom className={classes.price}>
                ${price}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          component={Paper}
          p={2}
          item
          xl={4}
          lg={4}
          md={12}
          sm={12}
          xs={12}>

      
          <Box display="flex" direction="column" justifyContent="space-between">
             <Avatar style={{
              height:"40px",
              width:"40px"
            }} src={seller.seller.sellerLogo}></Avatar> 
            <Box my={3}></Box>
            <Typography gutterBottom style={{ fontSize: "18px", fontWeight: 'bold'}}>
              <Button style={{fontWeight:"bold", fontSize:"18px"}} component={Link} to={`/seller/${seller._id}`}> {seller.seller.sellerName} </Button>
             
            </Typography>
          </Box>


          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom className={classes.name}>
              Name
            </Typography>
            <Typography gutterBottom style={{ fontSize: "15px" }}>
              {name.substring(0, 15)}...
            </Typography>
          </Box>

        


          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom className={classes.name}>
              Status
            </Typography>
            {countInStock > 0 ? (
              <Typography
                gutterBottom
                style={{ fontSize: "15px", color: "#54eb70" }}>
                In Stock
              </Typography>
            ) : (
              <Typography
                gutterBottom
                style={{ fontSize: "15px", color: "#f54a3b" }}>
                Out of Stock
              </Typography>
            )}
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom className={classes.name}>
              Qty
            </Typography>
            <TextField
              disabled={countInStock === 0}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              size="small"
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
          </Box>
          <Box my={3}>
            <Button
              onClick={() => addToCart(_id, qty)}
              variant="contained"
              size="small"
              color="primary"
              disabled={countInStock === 0}
              fullWidth>
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewProductCardComponent;
