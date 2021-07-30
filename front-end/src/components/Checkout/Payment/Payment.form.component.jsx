/** @format */

import React, {useEffect, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { useSelector, useDispatch } from 'react-redux';
import {savePaymentMethod} from '../../../action-creators/Cart.action';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingTop: "40px",
    paddingBottom: "40px",
    backgroundColor: "white",
    marginTop: "20px",
  },
  formLabel: {
    marginBottom: theme.spacing(4),
  },
}));

const PaymentFormComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const Cart = useSelector(state => state.Cart);
  const { handleSubmit, errors, register } = useForm({
    mode: "onTouched",
  });

  const [paymentMode , setPaymentMode] = useState('paypal');

  const user = useSelector((state) => state.User);
  
  const onSubmit = (data) => {
    dispatch(savePaymentMethod(data.payment));
    history.push('/place-order');
  };

  if(!Cart.shippingAddress.address) {
    history.push('/shipping');
  }

  useEffect(() => {
    if(!user.userInfo) {
      history.push('/sign-in');
    }
  },[user, history])

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: "30px" }} gutterBottom>
        Payment Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box>
            <FormControl error={Boolean(errors.payment)}>
              <FormLabel className={classes.formLabel}>
                Choose Your Payment Method
              </FormLabel>
              <RadioGroup row name="payment" value={paymentMode}>
                <FormControlLabel
                  value="paypal"
                  control={
                    <Radio onChange={(e) => setPaymentMode(e.target.value)} inputRef={register({ required: "Required." })}/>
                  }
                  label="Paypal"
                />
                <br />
                <FormControlLabel
                  value="stripe"
                  control={
                    <Radio onChange={(e) => setPaymentMode(e.target.value)}  inputRef={register({ required: "Required." })}  />
                  }
                  label="Stripe"
                />
              </RadioGroup>
              <FormHelperText>{errors.payment?.message}</FormHelperText>
            </FormControl>
          </Box>

          <Box mt={2}>
            <Button
              type="button"
              color="primary"
              style={{
                textTransform:'capitalize',
                marginRight:'30px'
              }}
              component={Link}
              to="/shipping"
              variant="outlined">
              Back
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save 
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default PaymentFormComponent;
