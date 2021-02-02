import {
  USERINFO_LOAD_REQUEST,
  USERINFO_LOAD_SUCCESS,
  USERINFO_LOAD_FAIL,
} from '../constants/userInfoConstants';

export const loadUserInfoReducer = (
  state = {
    loading: null,
    error: null,
    userInfo: null,
  },
  action
) => {
  switch (action.type) {
    case USERINFO_LOAD_REQUEST:
      return {
        loading: true,
      };
    case USERINFO_LOAD_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USERINFO_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
