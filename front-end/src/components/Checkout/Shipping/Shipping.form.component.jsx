/** @format */

import React, { useEffect } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../../action-creators/Cart.action';


const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100% - 64px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingTop: '40px',
    paddingBottom:'40px',
    backgroundColor:'white',
    marginTop:'20px'
  },
}));

const ShippingAddressComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const shipping = useSelector((state) => state.Cart.shippingAddress);
  const user = useSelector((state) => state.User)

  const { handleSubmit, errors, register } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    dispatch( saveShippingAddress(data) );
    history.push("/payment");
  };

  useEffect(() => {
    if(!user.userInfo) {
      history.push('/sign-in');
    }
  },[user, history])

  return (

    <form onSubmit={handleSubmit(onSubmit)}>        
      <Box className={classes.root}>
        <Grid container spacing={1} className={classes.paper}>
          <Grid item xs={12}>
            <Typography variant="h4">Shipping Address</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="dense"
              size="small"
              placeholder="Full Name"
              label="Full Name"
              type="text"
              defaultValue={shipping.fullname}
              name="fullname"
              variant="outlined"
              error={Boolean(errors.fullname)}
              helperText={errors.fullname ? errors.fullname.message : null}
              inputRef={register({
                required: "Required",
                minLength: {
                  value: 3,
                  message: "Minimum Length 3 Characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum Length 20 Characters.",
                },
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="dense"
              size="small"
              placeholder="Address"
              label="Address"
              type="address"
              name="address"
              defaultValue={shipping.address}
              variant="outlined"
              error={Boolean(errors.address)}
              helperText={errors.address ? errors.address.message : null}
              inputRef={register({
                required: "Required",
              })}
            />
          </Grid>

          <Grid item xs={12} container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                placeholder="City"
                label="City"
                type="address"
                name="city"
                defaultValue={shipping.city}
                variant="outlined"
                error={Boolean(errors.city)}
                helperText={errors.city ? errors.city.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                placeholder="Pin Code"
                label="Pin code"
                type="address"
                name="pincode"
                defaultValue={shipping.pincode}
                variant="outlined"
                error={Boolean(errors.pincode)}
                helperText={errors.pincode ? errors.pincode.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="dense"
              size="small"
              placeholder="Country"
              label="Country"
              type="address"
              name="country"
              variant="outlined"
              defaultValue={shipping.country}
              error={Boolean(errors.country)}
              helperText={errors.country ? errors.country.message : null}
              inputRef={register({
                required: "Required",
              })}
            />
          </Grid>

          <Grid
            item
            xs={12}
            container
            display="flex"
            component={Box}
            alignItems="center"
            justifyContent="space-between">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{
                textTranform: 'capitalize'
              }}
              size="medium">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ShippingAddressComponent;
