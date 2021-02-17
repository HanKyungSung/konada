import {
  LOAD_BIDS_REQUEST,
  LOAD_BIDS_SUCCESS,
  LOAD_BIDS_FAILURE,
  STORE_BID_REQUEST,
  STORE_BID_SUCCESS,
  STORE_BID_FAILURE,
} from '../constants/bidConstants';

const initState = {
  loading_bid: false,
  error_bid: null,
  bids: [],
};

export const loadBidsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_BIDS_REQUEST:
      return { loading_bid: true };
    case LOAD_BIDS_SUCCESS:
      return { ...state, loading_bid: false, bids: action.payload };
    case LOAD_BIDS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const storeBidReducer = (state = initState, action) => {
  switch (action.type) {
    case STORE_BID_REQUEST:
      return { ...state, loading_bid: true };
    case STORE_BID_SUCCESS:
      return { ...state, loading_bid: false, bids: [ ...state.bids, action.payload ]};
    case STORE_BID_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
