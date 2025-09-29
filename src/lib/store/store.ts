import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Simplified import

// Import slice reducers
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import wishlistReducer from './slices/wishlistSlice';

// Create no-op storage for SSR environments
const createNoopStorage = (): Storage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<string> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

// Get appropriate storage based on environment
const getStorage = (): Storage => {
  if (typeof window !== "undefined") {
    return storage;
  }
  return createNoopStorage();
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productReducer,
  orders: orderReducer,
  user: userReducer,
  ui: uiReducer,
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

const whitelistedSlices: string[] = ['cart', 'wishlist', 'user'];

const persistConfig = {
  key: 'root',
  storage: getStorage(),
  whitelist: whitelistedSlices,
  version: 1,
  timeout: 10000,
};

// Create persisted reducer with proper typing
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Optional: ignore specific paths if needed
        // ignoredPaths: ['some.nested.path'],
      },
    }),
  // Enable Redux DevTools in development only
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type AppDispatch = typeof store.dispatch;