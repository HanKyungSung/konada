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

const initState = {
	loading: true,
	products: [],
}

export const productListReducer = (state = initState, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST: {
			return {
				loading: true,
				products: []
			};
		};

		case PRODUCT_LIST_SUCCESS: {
			return {
				loading: false,
				products: action.payload,
			};
		};

		case PRODUCT_LIST_FAIL: {
			return {
				loading: false,
				error: action.payload
			};
		};
		
		case PRODUCT_CREATE_REQUEST: {
			return state;
		};

		case PRODUCT_CREATE_SUCCESS: {
			const { payload } = action;

			return {
				loading: false,
				products: [ payload, ...state.products ],
			};
		};

		case PRODUCT_CREATE_FAIL: {
			return state;
		};

		case PRODUCT_DELETE_SUCCESS: {
			return state;
		};

		case PRODUCT_DELETE_FAIL: {
			return state;
		};

		default:
			return state;
	}
};
