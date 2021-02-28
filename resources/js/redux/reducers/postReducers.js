import {
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_INDEX_SUCCESS,
    POST_INDEX_FAIL,
    POST_DELETE_SUCCESS,
    PRODUCT_STORE_REQUEST,
    PRODUCT_STORE_SUCCESS,
    PRODUCT_STORE_FAIL
} from '../constants/postConstants';

const initState = {
    loading: true,
    processing: false,
    posts: [],
    error: null
};

export const postReducer = (state = initState, action) => {
    const { payload } = action;

    switch (action.type) {
        case POST_CREATE_REQUEST: {
            return { ...state, processing: true };
        }

        case POST_CREATE_SUCCESS: {
            return { ...state, posts: [ payload, ...state.posts ] };
        }

        case POST_CREATE_FAIL: {
            return { ...state, error: payload };
        };

        case PRODUCT_STORE_SUCCESS: {
            const { product } = payload;
            const newPosts = state.posts.map(post => {
                if(post.id == product.post_id)
                {
                    post.product = product;
                    post.uploaded_files = product.uploaded_files;
                }

                return post;
            });
            
            return { ...state, processing: false, posts: newPosts };
        };

        case PRODUCT_STORE_FAIL: {
            const { error } = action;

            return { ...state, processing: false, error: error };
        };

        case POST_DELETE_SUCCESS: {
            const newPosts = state.posts.filter(post => {
                return post.id != payload;
            });

            return { ...state, processing: false, posts: newPosts };
        }

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
  