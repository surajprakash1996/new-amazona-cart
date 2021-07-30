/** @format */

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetailsAction } from "../../action-creators/User.action";
import { fetchProductList } from "../../action-creators/Product.actions";

import { Grid } from "@material-ui/core";

import Loading from "../../helpers/Loading.helper";
import MessageHelper from "../../helpers/Message.helper";

import SellerProductCard from "./SellerProductCard.component";
import SellerProfileComponent from './SellerProfileComponent.component'

const SellerComponent = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, userProfileDetail } = useSelector(
    (state) => state.UserProfileDetail
  );
  const {
    error: errorProduct,
    products: productListProduct,
  } = useSelector((state) => state.ProductList);

  useEffect(() => {
    if(!userProfileDetail || (userProfileDetail._id !== id)) {
      dispatch(UserProfileDetailsAction(id));
      dispatch(fetchProductList({seller: id}));
    }
    
   }, [dispatch, userProfileDetail  ,id]);

  return (
    <div style={{paddingTop:'10px'}}>
      {loading || !productListProduct ? (
        <Loading />
      ) : error || errorProduct ? (
        <MessageHelper severity="error" message={error} />
      ) : (
        <Grid container>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <SellerProfileComponent sellerProfile={userProfileDetail}/>
          </Grid>
          <Grid item style={{height:'85vh', overflow:'scroll'}} spacing={1} container xs={12} sm={9} md={9} lg={9} xl={9}>
            {productListProduct.length === 0 ? (
              <h4>No Product Found.</h4>
            ) : (
              <React.Fragment>
                {productListProduct.map((data) => (
                  <Grid
                    key={data._id}
                    item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <SellerProductCard productInfo={data} />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SellerComponent;
