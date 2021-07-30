/** @format */

import * as OrderListConstant from "../constants/Order.constant";

export const OrderListWithUserReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case OrderListConstant.ORDER_LIST_LOADING:
      return {
        loading: true,
      };
    case OrderListConstant.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orderList: action.payload,
      };
    case OrderListConstant.ORDER_LIST_FAIL:
      return {
        loading: false,
        orderList: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const OrderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderListConstant.ORDER_DELETE_LOADING:
      return {
        loading: true,
      };
    case OrderListConstant.ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case OrderListConstant.ORDER_DELETE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case OrderListConstant.ORDER_DELETE_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
};
