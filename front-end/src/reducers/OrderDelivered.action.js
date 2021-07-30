/** @format */

import * as OrderDeliveredConstant from "../constants/Order.constant";

export const OrderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderDeliveredConstant.ORDER_DELIVERED_LOADING:
      return {
        loading: true,
      };
    case OrderDeliveredConstant.ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case OrderDeliveredConstant.ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case OrderDeliveredConstant.ORDER_DELIVERED_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
};
