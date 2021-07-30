/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../helpers/Loading.helper";
import Message from "../../helpers/Message.helper";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchProductList } from "../../action-creators/Product.actions";
import ProductCardComponent from "./ProductCard.component";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { topSellerAction } from "../../action-creators/User.action";

import { Carousel } from 'react-responsive-carousel';
import CarouselSellerCard from './CarouselSellerCard.component';



const useStyles = makeStyles((theme) => ({

}));

const ProductList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { error, loading, products } = useSelector(
    (state) => state.ProductList
  );

  const {
    error: errorSeller,
    loading: loadingSeller,
    topSeller: sellerTopSeller,
  } = useSelector((state) => state.TopSeller);

  useEffect(() => {
    dispatch(fetchProductList({}));
    dispatch(topSellerAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {loadingSeller ? (
        <Loading />
      ) : errorSeller ? (
        <Message severity="error" message={error} />
      ) : (
        <React.Fragment>
         {
           !sellerTopSeller ? <Message severity="error" message="No Seller Found." /> : (
            <>
                <h2>Top Seller </h2>
               <Carousel autoPlay showThumbs={false} showArrows>
                {
                  sellerTopSeller.map((data) => (
                    <CarouselSellerCard key={data._id} seller={data} />
                  ))
                }
             </Carousel>
            </>
           
            
           )
         }
        </React.Fragment>
      )}

      {loading === true ? (
        <Loading />
      ) : error ? (
        <Message severity="error" message={error} />
      ) : (
        <React.Fragment>
          <h2>Feaured Product</h2>
          <Grid container spacing={1}>
            {products.map((data) => (
              <Grid key={data._id} item xl={4} lg={4} md={6} sm={6} xs={12}>
                <ProductCardComponent productInfo={data} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductList;
