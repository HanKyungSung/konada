import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer } from './redux/reducers/productReducers';
import {
  userLoginReducer,
  googleUserLoginReducer,
  userRegisterReducer,
} from './redux/reducers/userReducers';

const reducer = combineReducers({
  productListReducer,
  userLoginReducer,
  googleUserLoginReducer,
  userRegisterReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
