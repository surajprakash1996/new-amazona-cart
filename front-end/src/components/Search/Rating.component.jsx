/** @format */

import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  reviews: {
    fontSize: "11px",
    color: "#7d7d7d",
  },
}));

const RatingComponent = (props) => {
  const classes = useStyles();
  const { rating, reviews, caption } = props;
  return (
    <div className={classes.root}>
      <Rating name="rating" defaultValue={rating} precision={0.5} readOnly />
       {
         caption ? <Typography className={classes.reviews} >({caption})</Typography> :  <Typography className={classes.reviews}>({reviews}) Reviews</Typography>
       }
    </div>
  );
};

export default RatingComponent;
