/** @format */

import * as UserConstant from "../constants/User.constant";

export const UserReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case UserConstant.LOGIN_LOADING:
      return {
        loading: true,
      };
    case UserConstant.LOGIN_SUCCESS:
      return {
        loading: true,
        userInfo: action.payload,
      };
    case UserConstant.LOGIN_FAIL:
      return {
        loading: false,
        userInfo: null,
        error: action.payload,
      };
    case UserConstant.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const UserProfileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_PROFILE_DETAILS_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        userProfileDetail: action.payload,
      };
    case UserConstant.USER_PROFILE_DETAILS_FAIL:
      return {
        loading: false,
        userProfileDetail: null,
        error: action.payload,
      };
    case UserConstant.USER_PROFILE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const UserProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_PROFILE_UPDATE_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UserConstant.USER_PROFILE_UPDATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case UserConstant.USER_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const UserListReducer = (state = { userList: [] }, action) => {
  switch (action.type) {
    case UserConstant.USER_LIST_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_LIST_SUCCESS:
      return {
        loading: false,
        userList: action.payload,
      };
    case UserConstant.USER_LIST_FAIL:
      return {
        loading: false,
        userList: null,
        error: action.payload,
      };

    case UserConstant.USER_LIST_RESET:
      return { userList: [] };

    default:
      return state;
  }
};

export const UserListDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_LIST_DETAIL_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_LIST_DETAIL_SUCCESS:
      return {
        loading: false,
        userDetailList: action.payload,
      };
    case UserConstant.USER_LIST_DETAIL_FAIL:
      return {
        loading: false,
        userDetailList: null,
        error: action.payload,
      };

    case UserConstant.USER_LIST_DETAIL_RESET:
      return { userDetailList: null, error: null, loading: null };

    default:
      return state;
  }
};

export const UserListUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_LIST_UPDATE_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_LIST_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UserConstant.USER_LIST_UPDATE_FAIL:
      return {
        loading: false,
        success: null,
        error: action.payload,
      };
    case UserConstant.USER_LIST_UPDATE_RESET:
      return { success: null, error: null, loading: null };
    default:
      return state;
  }
};


//  User Delete Reducer....

export const UserListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConstant.USER_LIST_DELETE_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_LIST_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UserConstant.USER_LIST_DELETE_FAIL:
      return {
        loading: false,
        success: null,
        error: action.payload,
      };
    case UserConstant.USER_LIST_DELETE_RESET:
      return { success: null, error: null, loading: null };
    default:
      return state;
  }
};



export const TopSellerReducer = (state={},action) => {
  switch (action.type) {
    case UserConstant.USER_TOP_SELLER_LOADING:
      return {
        loading: true,
      };
    case UserConstant.USER_TOP_SELLER_SUCCESS:
      return {
        loading: false,
        topSeller: action.payload
      };
    case UserConstant.USER_TOP_SELLER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
