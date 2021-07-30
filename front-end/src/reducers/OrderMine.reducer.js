/** @format */

import * as OrderMineConstant from "../constants/Order.constant";

export const OrderMineReducer = (state = { orderMine: [] }, action) => {
  switch (action.type) {
    case OrderMineConstant.ORDER_MINE_LOADING:
      return {
        loading: true,
      };
    case OrderMineConstant.ORDER_MINE_SUCCESS:
      return {
        loading: false,
        orderMine: action.payload,
      };
    case OrderMineConstant.ORDER_MINE_FAIL:
      return {
        loading: false,
        orderMine: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
