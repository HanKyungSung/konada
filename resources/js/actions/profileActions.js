import axios from 'axios';
import {
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAIL,
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAIL,
} from '../constants/profileConstants';
import { login, logout } from './userActions';
import { saveState, loadState } from '../localStorage';

export const loadProfile = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_LOAD_REQUEST });

    // const { profileData } = await axios.get(`/api/user/profile/${userId}`);
    // const profileData = await axios.get(
    //   'https://jsonplaceholder.typicode.com/users'
    // );

    const { token } = userInfo;
    
    const response = await axios.get(
      `/api/user`,
      {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const profile = profileData.find((p) => p.id === userId);
    // const profile = profileData.data[userId - 1];

  dispatch({
    type: PROFILE_LOAD_SUCCESS,
    payload: response.data,
  });
  
  } catch (error) {
    // dispatch({
    //   type: PROFILE_LOAD_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const editProfile = (newProfile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_EDIT_REQUEST,
    });
    const { userLogin } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/user/update`,
      newProfile,
      config
    );

    dispatch({
      type: PROFILE_EDIT_SUCCESS,
      data
    });

    saveState('userInfo', data);
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
      type: PROFILE_EDIT_FAIL,
      payload: message,
    });
  }
};
