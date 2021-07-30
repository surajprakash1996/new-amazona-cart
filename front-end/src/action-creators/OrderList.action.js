/** @format */

import axios from "axios";
import * as OrderListConstant from "../constants/Order.constant";

export const OrderListAction = ({seller = ''}) => {
  return async (dispatch, getState) => {
    dispatch({ type: OrderListConstant.ORDER_LIST_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.get(
        `http://localhost:4000/order/order-list?seller=${seller}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: OrderListConstant.ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: OrderListConstant.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
};



export const OrderDeleteAction = (id) => {
    return async (dispatch, getState) => {
      dispatch({type: OrderListConstant.ORDER_DELETE_LOADING});
      try {
        const { userInfo } = getState().User;
        const { data } = await axios.delete(`http://localhost:4000/order/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        })
        dispatch({type: OrderListConstant.ORDER_DELETE_SUCCESS, payload: data});
      } catch (err) {
        dispatch({
          type:  OrderListConstant.ORDER_DELETE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    }
  }