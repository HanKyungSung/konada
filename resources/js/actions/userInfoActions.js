import axios from 'axios';
import {
  USERINFO_LOAD_REQUEST,
  USERINFO_LOAD_SUCCESS,
  USERINFO_LOAD_FAIL,
  USERINFO_EDIT_REQUEST,
  USERINFO_EDIT_SUCCESS,
  USERINFO_EDIT_FAIL,
} from '../constants/userInfoConstants';
import { login, logout } from './userActions';
import { saveState, loadState } from '../localStorage';

export const loadUserInfo = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USERINFO_LOAD_REQUEST });

    const { token } = userInfo;

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `/api/user`,
      config
    );

    dispatch({
      type: USERINFO_LOAD_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: USERINFO_LOAD_FAIL,
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

    const { userLogin } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const response = await axios.put(
      `/api/user/update`,
      newUserInfo,
      config
    );

    dispatch({
      type: USERINFO_EDIT_SUCCESS,
      payload: response.data,
    });

    saveState('userInfo', response.data);
    // localStorage.setItem('uesrInfo', JSON.stringify(data));
  } catch (error) {
    const message = error.response && error.response.data.message
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
