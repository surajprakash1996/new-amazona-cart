/** @format */

import {
  Box,
  Grid,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  MenuItem,
  TextField,
} from "@material-ui/core";

import React, { useEffect } from "react";
import {useHistory, useParams, Link as RouterLink } from "react-router-dom";
import { fetchProductList } from "../../action-creators/Product.actions";
import Loading from "../../helpers/Loading.helper";
import MessageHelper from "../../helpers/Message.helper";
import { useDispatch, useSelector } from "react-redux";
import ProductCardComponent from "./ProductCard.component";
import { price, ratings } from "../../helpers/filter";

import { List } from "@material-ui/core";
import RatingComponent from "./Rating.component";

const SearchResult = () => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order='newest'
  } = useParams();

  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.ProductList
  );

  const {
    error: errorCategory,
    loading: loadingCategory,
    category: categoryState,
  } = useSelector((state) => state.ProductCategory);

  const history = useHistory();

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const sortOrder = filter.order || order
    const filterName = filter.name || name;
    const filterMin = filter.min
      ? filter.min
      : Number(filter.min) === 0
      ? Number(filter.min)
      : 0;
    const filterMax = filter.max
      ? filter.max
      : Number(filter.max) === 0
      ? Number(filter.max)
      : 0;  
    const filterRating = filter.rating || rating;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  useEffect(() => {
    dispatch(
      fetchProductList({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order

      })
    );
  }, [dispatch, name, min, max, category, rating, order]);
  return (
    <div
      style={{
        paddingTop: "30px",
      }}>
      <Grid container spacing={1}>
        <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
          <div
            style={{
              backgroundColor: "white",
              overflow:'scroll',
              height:'550px'
            }}>
            {loadingCategory ||
            categoryState === undefined ||
            categoryState === null ? (
              <Loading />
            ) : errorCategory ? (
              <MessageHelper severity="error" message={error} />
            ) : (
              <div
                style={{
                  backgroundColor: "white",
                }}>
                <div>
                  <List
                    component="nav"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Product Category
                      </ListSubheader>
                    }>
                    {categoryState.map((c) => (
                      <div key={categoryState}>
                      <ListItem
                        button
                        key={c}
                        component={RouterLink}
                        to={getFilterUrl({ category: c })}>
                        <ListItemText
                          primary={c.charAt(0).toUpperCase() + c.slice(1)}
                        />
                      </ListItem>
                      <Divider />
                      </div>
                    ))}
                  </List>
                </div>

                <div>
                  <List
                    component="nav"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Product Price
                      </ListSubheader>
                    }>
                    {price.map((c) => (
                      <>
                      <ListItem
                        button
                        key={c.min}
                        component={RouterLink}
                        to={getFilterUrl({ min: c.min, max: c.max })}>
                        <ListItemText primary={c.name} />
                      </ListItem>
                      <Divider />
                      </>

                    ))}
                  </List>
                </div>

                <div>
                  <List
                    component="nav"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Product rating
                      </ListSubheader>
                    }>
                    {ratings.map((c) => (
                      <>
                      <ListItem
                        button
                        key={c.rating}
                        component={RouterLink}
                        to={getFilterUrl({ rating: c.rating })}>
                        <RatingComponent
                          rating={c.rating}
                          caption={c.name}
                          reviews={0}
                        />
                      </ListItem>
                       <Divider />
                       </>
                    ))}
                  </List>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageHelper severity="error" message={error} />
          ) : (
            <React.Fragment>
              <Box my={2} display="flex"  alignItems="center" flexDirection="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">{products.length} Result Found</Typography>
                </Box>

                <Box display="flex" flexDirection="row" alignItems="center">
                  <Box mr={2}>
                   <Typography variant="subtitle1">Sort</Typography>
                  </Box>
                  <Box>
                    <TextField color="primary" margin='dense' variant='outlined' select value={order} onChange={(e) => history.push(getFilterUrl({order: e.target.value}))}>
                      <MenuItem value='newest'>Newest</MenuItem>
                      <MenuItem value='lowest'>Lowest</MenuItem>
                      <MenuItem value='highest'>Highest</MenuItem>
                      <MenuItem value='toprated'>Top rated</MenuItem>
                    </TextField>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={1}>
                {products.map((data) => (
                  <Grid
                    key={data._id}
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}>
                    <ProductCardComponent productInfo={data} />
                  </Grid>
                ))}   
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchResult;
