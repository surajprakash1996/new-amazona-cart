/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import RatingComponent from "./Rating.component";
import { Link as RouterLink } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { fetchProductInCart } from '../../action-creators/Cart.action';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: "150px",
  },
  brandName: {
    fontSize: "13px",
    fontWeight: "700",
  },
  description: {
    fontSize: "10px",
    textAlign: "justify",
  },
  reviews: {
    fontSize: "11px",
  },
  price: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#7d7d7d",
  },
  inStock: {
    color: "#319e28",
    fontSize: "13px",
  },
  outStock: {
    fontSize: "13px",
    color: "#c9291a",
  },
  button: {
    height: "36px",
    fontSize: "8px",
    fontWeight: "700",
    width: "100%",
  },
}));

const ProductCardComponent = (props) => {
  const classes = useStyles();
  const { productInfo } = props;
  const { _id, name, brand, image, price, reviews, rating, countInStock , seller} =
    productInfo;

  const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Box my={1}>
            <Typography component="p" className={classes.brandName}>
              {brand} - {name.substr(0, 30)}.
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography component="p" className={classes.price}>
                Price - ${price}
              </Typography>
            </Box>

            <Box>
              {countInStock > 0 ? (
                <Typography component="p" className={classes.inStock}>
                  In Stock
                </Typography>
              ) : (
                <Typography component="p" className={classes.outStock}>
                  Out of Stock
                </Typography>
              )}
            </Box>
          </Box>

          <Box my={1}>
            <RatingComponent rating={rating} reviews={reviews} />
          </Box>

          <Box my={2}>
            <Button component={RouterLink} to={`/seller/${seller._id}`}>{seller.seller.sellerName}</Button>
          </Box>

        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          component={RouterLink}
          to={`/view-product/${_id}`}
          variant="outlined"
          color="primary"
          className={classes.button}>
          Go to product
        </Button>
        <Button
          disabled={countInStock === 0}
          onClick={() => dispatch(fetchProductInCart(_id,1))}
          variant="contained"
          color="primary"
          className={classes.button}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCardComponent;
