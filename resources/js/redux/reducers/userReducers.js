import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  SHOWED_MODAL,
  GOOGLE_USER_LOGIN_REQUEST,
  GOOGLE_USER_LOGIN_SUCCESS,
  GOOGLE_USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (
  state = {
    loading_login: null,
    error_login: null,
    userInfo: null,
    showedModal: false,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading_login: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading_login: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading_login: false, error_login: action.payload };
    case USER_LOGOUT:
      return {};
    case SHOWED_MODAL:
      return { ...state, showedModal: true };
    default:
      return state;
  }
};

export const googleUserLoginReducer = (
  state = {
    googleUserInfo: null,
    redirectURL: null,
  },
  action
) => {
  switch (action.type) {
    case GOOGLE_USER_LOGIN_REQUEST:
      return { ...state };
    case GOOGLE_USER_LOGIN_SUCCESS:
      return { ...state, redirectURL: action.payload };
    case GOOGLE_USER_LOGIN_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = {
    loading: null,
    error: null,
    userInfo: null,
  },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
