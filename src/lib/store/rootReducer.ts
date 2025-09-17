
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  ui: uiReducer,
  user: userReducer,
  products: productReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
