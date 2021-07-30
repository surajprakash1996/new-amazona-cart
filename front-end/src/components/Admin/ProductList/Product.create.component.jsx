/** @format */

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../../helpers/Loading.helper";
import MessageHelper from "../../../helpers/Message.helper";
import { useForm } from "react-hook-form";

import {productCreateAction} from '../../../action-creators/Product.actions';
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";


import {PRODUCT_CREATE_RESET} from '../../../constants/Product.constant';


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

const ProductCreateComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {loading, success, error }  = useSelector((state) => state.ProductCreate);
  const { errors, handleSubmit, register } = useForm({
    mode: "onTouched"
  });

  const onSubmit = (data) => {
    const productCreate = {
      name: data.name,
      price: data.price,
      image: data.image,
      brand: data.brand,
      category: data.category,
      reviews: data.reviews,
      rating: data.rating,
      countInStock: data.countInStock,
      description: data.description,
    };

    dispatch(productCreateAction(productCreate));
  };


  useEffect(() => {
    if(success) {
      history.push('/admin/product-list');
    }
    return () => {
      dispatch({type: PRODUCT_CREATE_RESET});
    }
  },[success,history,dispatch])


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.root}>
          <Grid
            container
            spacing={1}
            component={Paper}
            className={classes.paper}>

            <Grid item xs={12}>
              <Typography variant="h6">Product Create</Typography>
            </Grid>

            {
                loading && (
                  <Grid item xs={12}>
                    <Loading />
                  </Grid>
      
                )
            }

            {
                error && (
                  <Grid item xs={12}>
                    <MessageHelper severity="error" message={error}/>
                  </Grid>
      
                )
            }


            {
                success && (
                  <Grid item xs={12}>
                    <MessageHelper severity="success" message="Product Created."/>
                  </Grid>
      
                )
            }


            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                placeholder="Product Name"
                label="Product Name"
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
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                placeholder="Image url"
                label="Image Url"
                type="text"
                name="image"
                variant="outlined"
                error={Boolean(errors.image)}
                helperText={errors.image ? errors.image.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Brand Name"
                label="Brand Name"
                type="text"
                name="brand"
                variant="outlined"
                margin="dense"
                size="small"
                error={Boolean(errors.brand)}
                helperText={errors.brand ? errors.brand.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Category"
                label="Category"
                type="text"
                name="category"
                variant="outlined"
                margin="dense"
                size="small"
                error={Boolean(errors.category)}
                helperText={errors.category ? errors.category.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Count in Stock"
                label="Count in Stock"
                type="text"
                name="countInStock"
                variant="outlined"
                margin="dense"
                size="small"
                error={Boolean(errors.countInStock)}
                helperText={
                  errors.countInStock ? errors.countInStock.message : null
                }
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Price"
                label="Price"
                type="text"
                name="price"
                variant="outlined"
                margin="dense"
                size="small"
                error={Boolean(errors.price)}
                helperText={errors.price ? errors.price.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Rating"
                label="Rating"
                type="text"
                name="rating"
                variant="outlined"
                margin="dense"
                size="small"
                error={Boolean(errors.rating)}
                helperText={errors.rating ? errors.rating.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Reviews"
                label="Reviews"
                type="text"
                name="reviews"
                variant="outlined"
                margin="dense"
                size="small"
                error={Boolean(errors.reviews)}
                helperText={errors.reviews ? errors.reviews.message : null}
                inputRef={register({
                  required: "Required",
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Description"
                label="Description"
                type="text"
                name="description"
                variant="outlined"
                margin="dense"
                size="small"
                multiline
                rows={4}
                error={Boolean(errors.description)}
                helperText={
                  errors.description ? errors.description.message : null
                }
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
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                color="primary"
                size="medium">
                Create New
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default ProductCreateComponent;
