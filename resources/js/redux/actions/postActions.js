import axios from 'axios';
import {
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_INDEX_REQUEST,
    POST_INDEX_SUCCESS,
    POST_INDEX_FAIL
} from '../constants/postConstants';
import { createProduct, deleteProduct } from '../actions/productActions';

export const createPost = (inputData) => {
    // Redux-Thunk below.
    return (dispatch, getState) => {
        return dispatch(createProduct(inputData)).then(
        (product) => {
            const { userLogin } = getState();
            const { token } = userLogin.userInfo;

            dispatch({ type: POST_CREATE_REQUEST });

            return createPostApi(inputData, product.id, token).then(
                (response) => {
                    const { data } = response;

                    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
                },
                (error) => {
                    // Should send the delete api to delete product
                    // TODO: I am not sure what to do with the error.
                    dispatch({ type: POST_CREATE_FAIL, payload: error.message });
                    return dispatch(deleteProduct(product.id));
                }
            );
        },
        (error) => {
            dispatch({ type: POST_CREATE_FAIL, payload: error.message });
        });
    };
};

export const fetchPosts = () => {
    return (dispatch, getState) => {
        const { userLogin } = getState();
        const { token } = userLogin.userInfo;

        dispatch({ type: POST_INDEX_REQUEST });

        return fetchPostsApi(token).then(
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
    product_id, 
    token) => {
    let formData = new FormData();
    // TODO: Currently, 'file' is FileList object and I don't know how to handle array of files 
    // TODO: on the frontend and backend. For now, we will take only one file since input component
    // TODO: from react-bootstrap only accept one file at a time.
    formData.append('title', title);
    formData.append('description', description);
    formData.append('product_id', product_id);
    formData.append('location', location);
    formData.append('file', file[0]);

    return axios.post(
        'api/post',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        }
    );
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