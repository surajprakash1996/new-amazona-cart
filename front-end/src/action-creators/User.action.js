/** @format */

import * as UserConstant from "../constants/User.constant";
import axios from "axios";

// 1. User SignIn Action.

export const userSignInAction = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UserConstant.LOGIN_LOADING,
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:4000/user/sign-in",
      data: {
        email: email,
        password: password,
      },
    };
    try {
      const { data } = await axios(options);
      dispatch({ type: UserConstant.LOGIN_SUCCESS, payload: data });
      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().User.userInfo)
      );
    } catch (err) {
      dispatch({
        type: UserConstant.LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

// 2. Logout Action

export const Logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    localStorage.removeItem("shippingAddress");
    dispatch({ type: UserConstant.LOGOUT });
  };
};

// 3. User Profile Action.

export const UserProfileDetailsAction = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_PROFILE_DETAILS_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.get(
        `http://localhost:4000/user/user-profile-detail/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: UserConstant.USER_PROFILE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UserConstant.USER_PROFILE_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

//  4. User Profile Update Action

export const UserProfileUpdateAction = (user) => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_PROFILE_UPDATE_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.patch(
        `http://localhost:4000/user/user-update-profile`,
        user,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: UserConstant.USER_PROFILE_DETAILS_SUCCESS });
      dispatch({ type: UserConstant.LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: UserConstant.USER_PROFILE_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

// 5. User list loading.

export const UserListAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_LIST_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.get(`http://localhost:4000/user/user-list`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: UserConstant.USER_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserConstant.USER_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

// 4. UserDetailList Action

export const UserDetailListAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_LIST_DETAIL_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.get(
        `http://localhost:4000/user/user-list-detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: UserConstant.USER_LIST_DETAIL_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserConstant.USER_LIST_DETAIL_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

// UserUpdateList Action

export const userListUpdateAction = (userUpdate) => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_LIST_UPDATE_LOADING });

    try {
      const { userInfo } = getState().User;
      const { data } = await axios.patch(
        `http://localhost:4000/user/user-list-update/${userUpdate._id}`,
        userUpdate,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: UserConstant.USER_LIST_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserConstant.USER_LIST_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};


// UserList Delete Action


export const userListDeleteAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_LIST_DELETE_LOADING });
    try {
      const { userInfo } = getState().User;
      const { data } = await axios.delete(
        `http://localhost:4000/user/user-list-delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: UserConstant.USER_LIST_DELETE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserConstant.USER_LIST_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
}


export const topSellerAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: UserConstant.USER_TOP_SELLER_LOADING });
    try {

      const { data } = await axios.get(
        `http://localhost:4000/user/top-sellers`,
      );
      dispatch({ type: UserConstant.USER_TOP_SELLER_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: UserConstant.USER_TOP_SELLER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
}