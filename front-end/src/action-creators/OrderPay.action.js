
import * as OrderPayConstant from '../constants/Order.constant';
import axios from 'axios'
export const payOrder = (order, paymentResult) => {
    return async (dispatch, getState) => {
      const userInfo = getState().User.userInfo;
      dispatch({type: OrderPayConstant.ORDER_PAY_LOADING, payload: {order, paymentResult}});
      try {
        const { data } = await axios.patch(
          `http://localhost:4000/order/${order._id}/order-pay`,
          paymentResult,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        )
        
        dispatch({type: OrderPayConstant.ORDER_PAY_SUCCESS, payload: data});
  
      } catch (err) {
        dispatch({
          type: OrderPayConstant.ORDER_PAY_FAIL, 
          payload: err.response && err.response.data.message
          ? err.response.data.message
          : err.response
        })
      }
    }
  }
  