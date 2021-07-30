/** @format */

import React, { useEffect } from "react";

import {
  Box,
  Grid,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import MessageHelper from "../../helpers/Message.helper";
import Loading from "../../helpers/Loading.helper";
import { regexEmail } from "../../helpers/Regex.helper";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  UserProfileDetailsAction,
  UserProfileUpdateAction,
} from "../../action-creators/User.action";
import { USER_PROFILE_UPDATE_RESET } from "../../constants/User.constant";

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100% - 64px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  paper: {
    width: 600,
    padding: theme.spacing(5),
  },
}));

const UserProfileDetailsComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { errors, handleSubmit, register, getValues, reset } = useForm({
    mode: "onTouched",
  });

  const { loading, error, userProfileDetail } = useSelector(
    (state) => state.UserProfileDetail
  );
  const { userInfo } = useSelector((state) => state.User);

  const onSubmit = (data) => {
    dispatch(UserProfileUpdateAction(data));
  };

  useEffect(() => {
    if (userProfileDetail) {
      if(userProfileDetail.isSeller) {
        reset({
          sellerName: userProfileDetail.seller.sellerName,
          sellerDescription: userProfileDetail.seller.sellerDescription,
          sellerLogo: userProfileDetail.seller.sellerLogo,
          name: userProfileDetail.name,
          email: userProfileDetail.email,
        })
      }
      else {
        reset({
          name: userProfileDetail.name,
          email: userProfileDetail.email,
      })
      }
    } else {
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
      dispatch(UserProfileDetailsAction(userInfo._id));
    }
  }, [userProfileDetail, userInfo, history, dispatch, reset]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageHelper severity="error" message={error} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.root}>
            <Grid
              container
              spacing={1}
              component={Paper}
              className={classes.paper}>
              <Grid item xs={12}>
                <Typography variant="h6">User Profile</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  size="small"
                  placeholder="Full Name"
                  label="Full Name"
                  type="text"
                  name="name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name.message : null}
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
                  placeholder="Enter email address"
                  label="Email address"
                  type="email"
                  name="email"
                  variant="outlined"
                  error={Boolean(errors.email)}
                  helperText={errors.email ? errors.email.message : null}
                  inputRef={register({
                    required: "Required",
                    pattern: {
                      value: regexEmail,
                      message: "Invalid Format.",
                    },
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Password"
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  error={Boolean(errors.password)}
                  helperText={errors.password ? errors.password.message : null}
                  inputRef={register}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.message
                      : null
                  }
                  inputRef={register({
                    validate: (value) => {
                      if (value === getValues("password")) {
                        return true;
                      } else {
                        return "Password Does Not Match.";
                      }
                    },
                  })}
                />
              </Grid>

              {userInfo && userInfo.isSeller && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h5">Seller Detail</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Seller Name"
                      label="Seller Name"
                      type="text"
                      name="sellerName"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      error={Boolean(errors.sellerName)}
                      helperText={
                        errors.sellerName ? errors.sellerName.message : null
                      }
                      inputRef={register}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Seller Logo"
                      label="Seller Logo"
                      type="text"
                      name="sellerLogo"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      error={Boolean(errors.sellerLogo)}
                      helperText={
                        errors.sellerLogo ? errors.sellerLogo.message : null
                      }
                      inputRef={register}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Seller Description"
                      label="Seller Description"
                      type="text"
                      name="sellerDescription"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      error={Boolean(errors.sellerDescription)}
                      helperText={
                        errors.sellerDescription
                          ? errors.sellerDescription.message
                          : null
                      }
                      inputRef={register}
                    />
                  </Grid>
                </>
              )}

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
                  size="medium">
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </div>
  );
};

export default UserProfileDetailsComponent;
