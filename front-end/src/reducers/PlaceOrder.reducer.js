/** @format */

import * as OrderConstant from "../constants/Order.constant";

export const PlaceOrderReducer = (state = {} , action) => {
  switch (action.type) {
    case OrderConstant.ORDER_CREATE_LOADING:
      return {
        loading: true,
      };
    case OrderConstant.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        placeOrder: action.payload,
      };
    case OrderConstant.ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        placeOrder: null,
        error: action.payload,
      };
    case OrderConstant.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};