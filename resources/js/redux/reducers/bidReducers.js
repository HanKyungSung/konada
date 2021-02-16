import {
  LOAD_BIDS_REQUEST,
  LOAD_BIDS_SUCCESS,
  LOAD_BIDS_FAIL,
  STORE_BID_REQUEST,
  STORE_BID_SUCCESS,
  STORE_BID_FAIL,
} from '../constants/bidConstants';

export const loadBidsReducer = (
  state = {
    loading_bid: false,
    error_bid: null,
    bids: [],
  },
  action
) => {
  switch (action.type) {
    case LOAD_BIDS_REQUEST:
      return {};
    case LOAD_BIDS_SUCCESS:
      return {};
    case LOAD_BIDS_FAIL:
      return {};
    default:
      return state;
  }
};
