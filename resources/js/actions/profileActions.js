import axios from "axios";
import {
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAIL,
  PROFILE_EDIT_FAIL,
} from "../constants/profileConstants";

export const loadProfile = (userId) => async (dispatch) => {
  try {
    dispathc({ PROFILE_LOAD_REQUEST });

    const { profileData } = await axios.get(`/api/profile/${userId}`);

    dispatch({
      type: PROFILE_LOAD_SUCCESS,
      payload: profileData,
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
