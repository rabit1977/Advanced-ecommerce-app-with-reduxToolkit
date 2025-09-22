// Create and configure the Redux store for the app.
// This file wires together Redux Toolkit with redux-persist so parts of the
// Redux state are saved to (and restored from) persistent storage (localStorage
// in a browser) across page reloads.
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  // Action constants used by redux-persist's lifecycle. We add these to
  // the middleware's serializableCheck ignore list because they include
  // non-serializable values that would otherwise trigger warnings.
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  // Helpers for creating a persisted reducer and persistor instance
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
// Default storage adapter which uses window.localStorage in the browser.
import storage from 'redux-persist/lib/storage';

// Import slice reducers for different parts of application state.
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import wishlistReducer from './slices/wishlistSlice';

// Configuration for redux-persist:
// - `key` is the top-level key used in storage
// - `storage` is the storage engine (localStorage)
// - `whitelist` lists reducer keys that should be persisted. Only those
//   slices will be saved/restored across reloads. Other slices remain
//   ephemeral (in-memory only).
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist', 'orders', 'user', 'ui'],
};

// Combine all slice reducers into a single root reducer. The keys here
// correspond to top-level state keys accessible as `state.cart`, `state.ui`, etc.
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productReducer,
  orders: orderReducer,
  user: userReducer,
  ui: uiReducer,
});

// Wrap the root reducer with redux-persist to enable persistence for the
// whitelisted slices. The returned reducer understands additional actions
// dispatched by redux-persist during rehydration and persistence.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store using Redux Toolkit's `configureStore` helper.
// We pass the `persistedReducer` so the store participates in persistence.
// Also, configure middleware to ignore redux-persist lifecycle actions in
// the serializable state invariant middleware. Those actions sometimes
// carry non-serializable fields and would otherwise trigger warnings.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types for serializability checks.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor which controls persisting and rehydrating the store.
// The persistor is used by the app (for example, in the provider setup) to
// delay rendering until persisted state has been rehydrated if desired.
export const persistor = persistStore(store);

// Type helpers for use throughout the app:
// - `RootState` is the full state tree type inferred from the store
// - `AppDispatch` is the store's dispatch type (useful with Thunks or
//   when typing `useDispatch`/`useAppDispatch` wrappers).
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
