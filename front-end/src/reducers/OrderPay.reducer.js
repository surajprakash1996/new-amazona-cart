/** @format */

import * as OrderPayConstant from "../constants/Order.constant";

export const OrderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderPayConstant.ORDER_PAY_LOADING:
      return {
        loading: true,
      };
    case OrderPayConstant.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case OrderPayConstant.ORDER_PAY_FAIL:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case OrderPayConstant.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
