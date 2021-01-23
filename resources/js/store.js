import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';

// const persistedState = loadState();

const reducer = combineReducers({
  productList: productListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // persistedState: persistedState,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// store.subscribe(
//   throttle(() => {
//     saveState({
//       todos: store.getState().todos,
//     });
//   }, 600000)
// );

export default store;
