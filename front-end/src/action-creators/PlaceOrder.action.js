/** @format */

import axios from "axios";
import * as OrderConstant from "../constants/Order.constant";
import * as CartConstant from "../constants/Cart.constant";

export const placeOrderAction = (order) => {
  return async (dispatch, getState) => {
    dispatch({ type: OrderConstant.ORDER_CREATE_LOADING });
    try {
      const userToken = getState().User.userInfo.token;
      const { data } = await axios.post(
        `http://localhost:4000/order/create-order`,
        order,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch({
        type: OrderConstant.ORDER_CREATE_SUCCESS,
        payload: data.order,
      });
      dispatch({ type: CartConstant.CART_EMPTY });
      localStorage.removeItem("cart");
    } catch (error) {
      dispatch({
        type: OrderConstant.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
};


