/** @format */

import * as OrderConstant from "../constants/Order.constant";

export const OrderDetailReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case OrderConstant.ORDER_DETAILS_LOADING:
      return {
        loading: true,
      };
    case OrderConstant.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };
    case OrderConstant.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        orderDetails: null,
        error: action.payload,
      };
    case OrderConstant.ORDER_DETAILS_RESET:
      return {
        loading: true, orderDetails: null
      }
    default:
      return state;
  }
};
