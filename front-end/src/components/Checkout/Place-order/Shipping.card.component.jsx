/** @format */

import { makeStyles , Grid, Box, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: 'white',
    margin: '10px 5px 10px 0px'
  },
  headerLine: {
    fontSize: "22px",
    fontWeight: "bolder",
  },
  heading: {
    fontSize: '15px',
    fontWeight: 'bold'
  },
  value: {
    fontSize: '15px'
  }

}));

const ShippingCardComponent = (props) => {
  const classes = useStyles();
  const {shipping} = props;
  const {address, fullname, city, pincode, country} = shipping;
  return (
    <div className={classes.root}>
      <Box pb={2}>
        <Typography className={classes.headerLine}>Shipping Address</Typography>
      </Box>

      <Grid container>
        <Grid item xs={3}>
          <Typography className={classes.heading}>Name</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography className={classes.value}>{fullname}</Typography>
        </Grid>


        <Grid item xs={3}>
          <Typography className={classes.heading}>Address</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography  className={classes.value}>{address} {city} {pincode} {country}</Typography>
        </Grid>
      </Grid>
    </div>
  )
};

export default ShippingCardComponent;
