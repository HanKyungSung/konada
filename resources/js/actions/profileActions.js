import axios from 'axios';
import {
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAIL,
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_FAIL,
} from '../constants/profileConstants';

export const loadProfile = (userId) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_LOAD_REQUEST });

    // const { profileData } = await axios.get(`/api/profile/${userId}`);
    const profileData = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    // const profile = profileData.find((p) => p.id === userId);
    const profile = profileData.data[userId - 1];

    dispatch({
      type: PROFILE_LOAD_SUCCESS,
      payload: profile,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_LOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editProfile = () => async (dispatch) => {
  try {
    dispatch({ PROFILE_EDIT_REQUEST });
  } catch (error) {
    dispatch({
      type: PROFILE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
