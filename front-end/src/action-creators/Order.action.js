
import * as OrderConstant from "../constants/Order.constant";
import axios from 'axios';


export const  OrderDetailsAction = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({type: OrderConstant.ORDER_DETAILS_LOADING});
    try {
      const {userInfo} = getState().User;
      const { data } = await axios.get(
        `http://localhost:4000/order/order-details/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: OrderConstant.ORDER_DETAILS_SUCCESS,
        payload: data
      });

    } catch(error) {
      dispatch({
        type: OrderConstant.ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  }
}