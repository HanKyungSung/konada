import {
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAIL,
} from '../constants/profileConstants';

export const loadProfileReducer = (
  state = {
    loading: null,
    error: null,
    profile: null,
  },
  action
) => {
  switch (action.type) {
    case PROFILE_LOAD_REQUEST:
      return {
        loading: true,
      };
    case PROFILE_LOAD_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
      };
    case PROFILE_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
