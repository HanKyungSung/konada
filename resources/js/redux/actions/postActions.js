import axios from 'axios';
import {
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_INDEX_REQUEST,
    POST_INDEX_SUCCESS,
    POST_INDEX_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    PRODUCT_STORE_REQUEST,
    PRODUCT_STORE_SUCCESS,
    PRODUCT_STORE_FAIL
} from '../constants/postConstants';
import { createProduct, deleteProduct } from '../actions/productActions';

export const createPost = (inputData) => {
    return (dispatch, getState) => {
        const { userLoginReducer } = getState();
        const { token } = userLoginReducer.userInfo;

        dispatch({ type: POST_CREATE_REQUEST });

        return createPostApi(inputData, token).then(
            response => {
                const { data } = response;
                const post = data;

                dispatch({ type: POST_CREATE_SUCCESS, payload: post });

                return dispatch(createProduct(inputData, post.id)).then(
                    response => {
                        dispatch({ type: PRODUCT_STORE_SUCCESS, payload: { product: response } });
                    },
                    error => {
                        dispatch({ type: PRODUCT_STORE_FAIL, payload: error.message });
                    
                        return dispatch(deletePost(post.id));
                    }
                );
            },
            error => {
                dispatch({ type: POST_CREATE_FAIL, payload: error.message });
            }
        );
    };
};

export const deletePost = (postId) => {
    return (dispatch, getState) => {
        const { userLoginReducer } = getState();
        const { token } = userLoginReducer.userInfo;

        dispatch({ type: POST_DELETE_REQUEST });

        return deletePostApi(postId, token).then(
            response => {
                const { data } = response;

                dispatch({ type: POST_DELETE_SUCCESS, payload: data });
            },
            error => {
                dispatch({ type: POST_DELETE_FAIL, payload: error.message });
            }
        );
    };
};

export const fetchPosts = () => {
  return (dispatch, getState) => {
    const { userLoginReducer } = getState();

    dispatch({ type: POST_INDEX_REQUEST });

    return fetchPostsApi().then(
      (response) => {
        const { data } = response;

        dispatch({ type: POST_INDEX_SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: POST_INDEX_FAIL, payload: error.message });
      }
    );
  };
};

// Perhaps we can move below api methods to somewhere else.
export const createPostApi = (
    {
        title,
        description,
        location,
        file
    }, 
    token) => {
    let formData = new FormData();
    // TODO: Currently, 'file' is FileList object and I don't know how to handle array of files 
    // TODO: on the frontend and backend. For now, we will take only one file since input component
    // TODO: from react-bootstrap only accept one file at a time.
    formData.append('title', title);
    formData.append('description', description);
    // formData.append('product_id', product_id);
    formData.append('location', location);
    // formData.append('file', file[0]);

  return axios.post('api/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPostsApi = (token) => {
    return axios.get(
        'api/post/index',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    );
};

export const deletePostApi = (post_id, token) => {
    const data = { post_id: post_id };

    return axios.delete(
        '/api/post',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        }
    )
}
