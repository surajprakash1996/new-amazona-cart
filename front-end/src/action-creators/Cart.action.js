/** @format */

import axios from "axios";
import * as CartConstant from "../constants/Cart.constant";

export const fetchProductInCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(
      `http://localhost:4000/product/view/${id}`
    );

    const {cartItems} = getState().Cart;

    if(cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
      dispatch({type: CartConstant.CART_FAIL, payload: 'You cannot cart the product of another seller.'});
    } 
    else {
      dispatch({
        type: CartConstant.ADD_TO_CART,
        payload: {
          _id: data._id,
          name: data.name,
          brand: data.brand,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          description: data.description,
          seller: data.seller,
          qty,
        },
      });
    }


    localStorage.setItem("cart", JSON.stringify(getState().Cart.cartItems));
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: CartConstant.REMOVE_FROM_CART, payload: id });
    localStorage.setItem("cart", JSON.stringify(getState().Cart.cartItems));
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: CartConstant.SAVE_SHIPPING_ADDRESS,
      payload: {
        fullname: data.fullname,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        country: data.country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(getState().Cart.shippingAddress)
    );
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: CartConstant.SAVE_PAYMENT_METHOD,
      payload: data,
    });
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(getState().Cart.paymentMethod)
    );
  };
};
