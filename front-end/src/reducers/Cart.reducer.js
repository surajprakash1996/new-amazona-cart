
import * as CartConstant from "../constants/Cart.constant";

const initialState = {
  cartItems: [],
  shippingAddress: {
    fullname: '',
    address: '',
    city: '',
    pincode: '',
    country: ''
  },
  paymentMethod: 'paypal'
}


export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartConstant.ADD_TO_CART:
      let item = action.payload;
      let isExist = state.cartItems.find((x) => x._id === item._id);
      if (isExist) {
        return {
          ...state,
          error: null,
          cartItems: state.cartItems.map((x) =>
            x._id === isExist._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          error: null,
          cartItems: [...state.cartItems, item],
        };
      }
    case CartConstant.REMOVE_FROM_CART:
      return {
        ...state,
        error:null,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      }
    case CartConstant.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: {
          fullname: action.payload.fullname,
          address: action.payload.address,
          city: action.payload.city,
          pincode: action.payload.pincode,
          country: action.payload.country,
        },
      }
      case CartConstant.SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload
        }
      case CartConstant.CART_EMPTY:
        return {
          ...state,
          error:null,
          cartItems: []
        }
      case CartConstant.CART_FAIL:
        return {
          ...state,
          error: action.payload
        }
    
    default:
      return state;
  }
};
