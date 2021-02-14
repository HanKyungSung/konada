import {
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_INDEX_SUCCESS,
    POST_INDEX_FAIL,
} from '../constants/postConstants';

const initState = {
    loading: true, 
    posts: [],
    error: null
};

export const postReducer = (state = initState, action) => {
    const { payload } = action;

    switch (action.type) {
        case POST_CREATE_SUCCESS: {
            return { ...state, posts: [ payload, ...state.posts ] };
        }

        case POST_CREATE_FAIL: {
            return { ...state, error: payload };
        };

        case POST_INDEX_SUCCESS: {
            return { ...state, loading: false, posts: [ ...payload ] };
        }

        case POST_INDEX_FAIL: {
            return { ...state, error: payload };
        };

        default:
            return state;
    }
};
  