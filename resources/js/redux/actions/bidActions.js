import axios from 'axios';

import {
  LOAD_BIDS_REQUEST,
  LOAD_BIDS_SUCCESS,
  LOAD_BIDS_FAIL,
  STORE_BID_REQUEST,
  STORE_BID_SUCCESS,
  STORE_BID_FAIL,
} from '../constants/bidConstants';

export const loadBids = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_BIDS_REQUEST,
    });

    const { data } = await axios.get('/api/bids/load');

    dispatch({
      type: LOAD_BIDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_BIDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const storeBid = ({ bid }) => async (dispatch) => {
  try {
    dispatch({ type: STORE_BID_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/bids/store', { bid }, config);

    dispatch({
      type: STORE_BID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORE_BID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
