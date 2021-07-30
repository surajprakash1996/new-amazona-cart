/** @format */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { viewProductList } from "../../action-creators/Product.actions";
import { useSelector } from "react-redux";
import Loading from "../../helpers/Loading.helper";
import Message from "../../helpers/Message.helper";
import { makeStyles } from "@material-ui/core";

import { FETCH_VIEW_PRODUCT_RESET } from "../../constants/Product.constant";
import ViewProductCardComponent from "../ViewProduct/ViewProductCard.component";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: theme.spacing(5),
  },
}));

const ViewProductComponent = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, error, product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(viewProductList(id));
    }
    return () => {
      dispatch({ type: FETCH_VIEW_PRODUCT_RESET });
    };
  }, [dispatch, id]);

  return (
    <div className={classes.root}>
      {loading || product === undefined || product === null ? (
        <Loading />
      ) : error ? (
        <Message severity="error" message={error} />
      ) : (
        <ViewProductCardComponent product={product} />
      )}
    </div>
  );
};

export default ViewProductComponent;
