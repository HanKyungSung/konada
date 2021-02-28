import axios from 'axios';

import {
  LOAD_BIDS_REQUEST,
  LOAD_BIDS_SUCCESS,
  LOAD_BIDS_FAILURE,
  STORE_BID_REQUEST,
  STORE_BID_SUCCESS,
  STORE_BID_FAILURE,
  DELETE_BID_REQUEST,
  DELETE_BID_SUCCESS,
  DELETE_BID_FAILURE,
} from '../constants/bidConstants';

export const loadBids = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_BIDS_REQUEST,
    });

    const { data } = await axios.get('/api/bids');

    dispatch({
      type: LOAD_BIDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_BIDS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const storeBid = (bid) => async (dispatch, getState) => {
  try {
    dispatch({ type: STORE_BID_REQUEST });

    const { userLoginReducer } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLoginReducer.userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/bids/store', bid, config);

    dispatch({
      type: STORE_BID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORE_BID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const destroyBid = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_BID_REQUEST });

    const { userLoginReducer } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userLoginReducer.userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/bids/destroy',
      { bidId: id },
      config
    );

    dispatch({ type: DELETE_BID_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_BID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
