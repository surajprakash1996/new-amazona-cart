/** @format */

import * as ProductConstant from "../constants/Product.constant";

// All Product...

export const ProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ProductConstant.FETCH_PRODUCTS_LOADING:
      return {
        loading: true,
      };
    case ProductConstant.FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ProductConstant.FETCH_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Product view state...

export const ProductViewReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case ProductConstant.FETCH_VIEW_PRODUCT_LOADING:
      return {
        loading: true,
      };
    case ProductConstant.FETCH_VIEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ProductConstant.FETCH_VIEW_PRODUCT_FAIL:
      return {
        loading: false,
        product: null,
        error: action.payload,
      };
    case ProductConstant.FETCH_VIEW_PRODUCT_RESET:
      return {
        product: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export const ProductUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductConstant.PRODUCT_UPDATE_LOADING:
      return {
        loading: true,
      };
    case ProductConstant.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ProductConstant.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case ProductConstant.PRODUCT_UPDATE_RESET:
      return {
        success: false,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};



export const ProductCreateReducer = (state = {productNew:{}}, action) => {
  switch (action.type) {
    case ProductConstant.PRODUCT_CREATE_LOADING:
      return {
        loading: true,
      };
    case ProductConstant.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        productNew: action.payload
      };
    case ProductConstant.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        productNew: {},
        error: action.payload,
      };
    case ProductConstant.PRODUCT_CREATE_RESET:
      return {
        loading: false,
        success: false,
        productNew: {},
        error: null,
      };
    default:
      return state;
  }
};


export const ProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ProductConstant.PRODUCT_DELETE_LOADING:
      return {
        loading: true,
      };
    case ProductConstant.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ProductConstant.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const productCategoryReducer = (state = {} , action) => {
  
  switch (action.type) {
    case ProductConstant.PRODUCT_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case ProductConstant.PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload
      };
    case ProductConstant.PRODUCT_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}