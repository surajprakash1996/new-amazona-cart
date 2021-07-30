/** @format */

import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../../helpers/Loading.helper";
import MessageHelper from "../../../helpers/Message.helper";
import { useForm } from "react-hook-form";

import {useSelector, useDispatch} from 'react-redux';
import {Grid, TextField, Button, Box, Typography, Paper, makeStyles} from '@material-ui/core';

import {viewProductList, productUpdateAction} from '../../../action-creators/Product.actions';
import { PRODUCT_UPDATE_RESET } from "../../../constants/Product.constant";

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


const ProductUpdateComponent = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const history = useHistory();


  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = useSelector((state) => state.ProductUpdate);
  const {loading, error, product} = useSelector((state) => state.ProductView);
  const { errors, handleSubmit, register, reset } = useForm({
    mode: "onTouched",
  });
  
   

  const onSubmit = (data) => { 
     const productUpdate = {
       id: product._id,
       name: data.name,
       price: data.price,
       image: data.image,
       brand: data.brand,
       category: data.category,
       reviews: data.reviews,
       rating: data.rating,
       countInStock: data.countInStock,
       description: data.description
     }
     dispatch(productUpdateAction(productUpdate));
  };

  useEffect(() => {
    if(successUpdate) {
      history.push(`/admin/product-list`);
      dispatch({type: PRODUCT_UPDATE_RESET});
    }

     if(!product || product._id !== id || successUpdate) {
         dispatch(viewProductList(id))
     } else {
         reset({
             name: product.name,
             price: product.price,
             image: product.image,
             brand: product.brand,
             category: product.category,
             countInStock: product.countInStock,
             rating: product.rating,
             reviews: product.reviews,
             description: product.description,
         })
     }
  },[product, dispatch, reset, id, successUpdate,history])

  return (
    <div>
      <Box>
        {loadingUpdate && <h2>Loading...</h2> }
        {errorUpdate && <MessageHelper severity="error" message={errorUpdate} /> }
      </Box>
        {
            loading ? <Loading /> : error ? <MessageHelper severity="error" message={error}/> : (
                 
                <form onSubmit={handleSubmit(onSubmit)}>
                <Box className={classes.root}>
                  <Grid
                    container
                    spacing={1}
                    component={Paper}
                    className={classes.paper}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Product Update</Typography>
                    </Grid>
      

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
                        helperText={
                          errors.category
                            ? errors.category.message
                            : null
                        }
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
                          errors.countInStock
                            ? errors.countInStock.message
                            : null
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
                        helperText={
                          errors.price
                            ? errors.price.message
                            : null
                        }
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
                        helperText={
                          errors.rating
                            ? errors.rating.message
                            : null
                        }
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
                        helperText={
                          errors.reviews
                            ? errors.reviews.message
                            : null
                        }
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
                          errors.description
                            ? errors.description.message
                            : null
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
                        color="primary"
                        size="medium">
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>

            )
        }
    </div>
  );
};

export default ProductUpdateComponent;
