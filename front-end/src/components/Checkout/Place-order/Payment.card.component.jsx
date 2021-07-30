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

const PaymentMethodComponent = (props) => {

  const classes = useStyles();
  const { payment } = props;
  
  return (
    <div className={classes.root}>
      <Box pb={2}>
        <Typography className={classes.headerLine}>Payment Method</Typography>
      </Box>

      <Grid container>
        <Grid item xs={3}>
          <Typography className={classes.heading}>Method</Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography className={classes.value}>{payment}</Typography>
        </Grid>

      </Grid>
    </div>
  )
};

export default PaymentMethodComponent;
