/** @format */

import axios from "axios";
import * as OrderDeliveredConstant from "../constants/Order.constant";

export const OrderDeliveredAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: OrderDeliveredConstant.ORDER_DELIVERED_LOADING });
    try {
    
      const { userInfo } = getState().User;
      const { data } = await axios.patch(`http://localhost:4000/order/${id}/order-delivered`, {},  {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: OrderDeliveredConstant.ORDER_DELIVERED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OrderDeliveredConstant.ORDER_DELIVERED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
};
