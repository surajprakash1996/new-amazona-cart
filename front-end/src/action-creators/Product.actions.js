/** @format */

import * as ProductConstant from "../constants/Product.constant";
import axios from "axios";

// Fetch all product

export const fetchProductList = ({ seller = '', name = '', category = '' , min=0, max=0, rating = 0, order ='' }) => {
  return async (dispatch, getState) => {
    dispatch({ type: ProductConstant.FETCH_PRODUCTS_LOADING });
    try {
      const { data } = await axios.get(
        `http://localhost:4000/product/all/?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}/&rating=${rating}&order/${order}`
      );
      dispatch({ type: ProductConstant.FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ProductConstant.FETCH_PRODUCTS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

// Fetch view Product

export const viewProductList = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: ProductConstant.FETCH_VIEW_PRODUCT_LOADING });
    try {
      const { data } = await axios.get(
        `http://localhost:4000/product/view/${id}`
      );
      dispatch({
        type: ProductConstant.FETCH_VIEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductConstant.FETCH_VIEW_PRODUCT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

//  Product Category

export const fetchProductCategory = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ProductConstant.PRODUCT_CATEGORY_LOADING });
    try {
      const { data } = await axios.get(
        `http://localhost:4000/product/category`
      );
      dispatch({
        type: ProductConstant.PRODUCT_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ProductConstant.PRODUCT_CATEGORY_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const productUpdateAction = (product) => {
  return async (dispatch, getState) => {
    dispatch({ type: ProductConstant.PRODUCT_UPDATE_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.patch(
        `http://localhost:4000/product/update`,
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: ProductConstant.PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ProductConstant.PRODUCT_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const productCreateAction = (product) => {
  return async (dispatch, getState) => {
    dispatch({ type: ProductConstant.PRODUCT_CREATE_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.post(
        `http://localhost:4000/product/create`,
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: ProductConstant.PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ProductConstant.PRODUCT_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const ProductDeleteAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: ProductConstant.PRODUCT_DELETE_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.delete(
        `http://localhost:4000/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: ProductConstant.PRODUCT_DELETE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ProductConstant.PRODUCT_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
