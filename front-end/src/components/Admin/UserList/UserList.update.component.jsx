/** @format */

import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import Loading from "../../../helpers/Loading.helper";
import MessageHelper from "../../../helpers/Message.helper";
import { regexEmail } from "../../../helpers/Regex.helper";
import {
  UserDetailListAction,
  userListUpdateAction,
} from "../../../action-creators/User.action";

import {
  Box,
  Checkbox,
  Grid,
  Paper,
  FormControlLabel,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { USER_LIST_DETAIL_RESET,  USER_LIST_UPDATE_RESET } from "../../../constants/User.constant";

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

const UserListDetailUpdate = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const { loading, error, userDetailList } = useSelector(
    (state) => state.UserDetailList
  );

  const {
    success: successUpdate,
  } = useSelector((state) => state.UserListUpdate);

  const dispatch = useDispatch();
  const { errors, handleSubmit, register, reset, control } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    
    if(successUpdate) {
        history.push('/user/user-list');
        dispatch({type: USER_LIST_UPDATE_RESET});
    }

    if (!userDetailList || userDetailList._id !== id) {  
      dispatch(UserDetailListAction(id));
    } else {
      reset({
        name: userDetailList.name,
        email: userDetailList.email,
        isAdmin: userDetailList.isAdmin,
        isSeller: userDetailList.isSeller,
      });
    }
  }, [dispatch, userDetailList, successUpdate, history, reset, id]);

  const onSubmit = (data) => {
    const updatedUser = {
      _id: userDetailList._id,
      email: data.email,
      name: data.name,
      isAdmin: data.isAdmin,
      isSeller: data.isSeller,
    };
    dispatch(userListUpdateAction(updatedUser));
    dispatch({ type: USER_LIST_DETAIL_RESET});

  };

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
                <FormControlLabel
                  label="is Seller"
                  control={
                    <Controller
                      name="isSeller"
                      control={control}
                      defaultValue={false}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  label="is Admin"
                  control={
                    <Controller
                      name="isAdmin"
                      control={control}
                      defaultValue={false}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                        />
                      )}
                    />
                  }
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

export default UserListDetailUpdate;
