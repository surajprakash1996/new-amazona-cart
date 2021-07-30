/** @format */

import React, {useEffect}from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useLocation , useHistory} from 'react-router-dom';
import { regexEmail } from '../../helpers/Regex.helper';
import { useSelector , useDispatch } from 'react-redux';
import Message from '../../helpers/Message.helper';

import { userSignInAction } from '../../action-creators/User.action';
import {
  Box,
  Grid,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Link,
  Button,
} from "@material-ui/core";

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


const SignInComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch()
  const history = useHistory();
  const { error , userInfo } = useSelector(state => state.User);
  const { errors, handleSubmit, register } = useForm({
    mode: "onTouched",
  });

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmit = (data) => {
    dispatch(userSignInAction(data.email, data.password))
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.root}>
          <Grid
            container
            spacing={1}
            component={Paper}
            className={classes.paper}>
            <Grid item xs={12}>
              <Typography variant="h6">Sign In</Typography>
            </Grid>

            {
              error ? <Message severity="error" message={error} /> : null
            }

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
              <Typography variant="body2">
                Don't Have an Account ?{" "}
                <Link
                  to={`/sign-up`}
                  component={RouterLink}>
                  Sign Up
                </Link>
              </Typography>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="medium">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default SignInComponent;
