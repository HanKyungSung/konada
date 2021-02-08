import axios from 'axios';

import { saveState, loadState } from '../../localStorage';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USERINFO_EDIT_REQUEST,
  USERINFO_EDIT_SUCCESS,
  USERINFO_EDIT_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/login',
      { email, password },
      config
    );

    // saveState(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    saveState('userInfo', data);
    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  // localStorage.removeItem('state');

  dispatch({ type: USER_LOGOUT });
  document.location.href = '/login';
};

export const isLoggedIn = () => (dispatch) => {
  if (loadState('userInfo')) {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: loadState('userInfo'),
    });
  }
};

export const register = (
  name,
  username,
  address,
  phone_number,
  email,
  password,
  password_confirmation
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/register',
      {
        name,
        username,
        address,
        phone_number,
        email,
        password,
        password_confirmation,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    saveState('userInfo', data);

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editUserInfo = (newUserInfo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERINFO_EDIT_REQUEST,
    });

    const { userLoginReducer } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLoginReducer.userInfo.token}`,
      },
    };

    const response = await axios.put(`/api/user/update`, newUserInfo, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });
    // TODO: need to change the name of constant. combine login and edit.

    saveState('userInfo', response.data);
    // localStorage.setItem('uesrInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === 'Not authroized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: USERINFO_EDIT_FAIL,
      payload: message,
    });
  }
};
