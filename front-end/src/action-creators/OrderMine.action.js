/** @format */

import * as OrderMineConstant from "../constants/Order.constant";

import axios from 'axios';

export const orderMineAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: OrderMineConstant.ORDER_MINE_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.get("http://localhost:4000/order/order-mine", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: OrderMineConstant.ORDER_MINE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: OrderMineConstant.ORDER_MINE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
};
