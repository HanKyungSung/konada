import axios from 'axios';

import product from '../../product';

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		// const { data } = await axios.get('/api/products');
		const data = product;

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

/**
 * This is using Redux-Thunk and somehow handle error handled by Thunk (ex. have try catch block in there.)
 */
export const createProduct = (inputData) => {
	return (dispatch, getState) => {
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		const { userLoginReducer } = getState();
		const { token } = userLoginReducer.userInfo;

		return createProductApi(inputData, token).then(
			(response) => {
				const { data } = response;

				dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
				return data; // Apparently, we can return data.
			},
			(error) => {
				dispatch({
					type: PRODUCT_CREATE_FAIL,
					payload: error.response && error.response.data.message
						? error.response.data.message
						: error.message,
				});

				throw error;
			}
		);
	};
};

export const deleteProduct = (productId) => {
	return (dispatch, getState) => {
		dispatch({ type: PRODUCT_DELETE_REQUEST });

		const { userLoginReducer } = getState();
		const { token } = userLoginReducer.userInfo;

		return deleteProductApi(productId, token).then(
			(response) => {
				const { data } = response;

				dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
			},
			(error) => {
				dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
			}
		);
	};
};

// Perhaps we can move below api methods to somewhere else.
export const createProductApi = ({ item_name, price }, token) => {
	const data = {
		item_name: item_name,
		price: price
	};

	return axios.post(
		'/api/product',
		data,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		},
	);
};

export const deleteProductApi = (product_id, token) => {
	const data = {
		product_id: product_id
	};

	return axios.delete(
		'/api/product',
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			data: data
		},
		// data
	);
};