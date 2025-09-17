import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/lib/types';

interface CartState {
  cart: CartItem[];
  savedForLater: CartItem[];
}

const initialState: CartState = {
  cart: [],
  savedForLater: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
        const newItem = action.payload;
        const existingItem = state.cart.find(item => item.cartItemId === newItem.cartItemId);
        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            state.cart.push(newItem);
        }
    },
    updateCartQuantity: (state, action: PayloadAction<{ cartItemId: string; newQuantity: number }>) => {
        const { cartItemId, newQuantity } = action.payload;
        const itemToUpdate = state.cart.find(item => item.cartItemId === cartItemId);
        if (itemToUpdate) {
            if (newQuantity > 0) {
                itemToUpdate.quantity = newQuantity;
            } else {
                state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
            }
        }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
        state.cart = state.cart.filter(item => item.cartItemId !== action.payload);
    },
    saveForLater: (state, action: PayloadAction<string>) => {
        const itemToMove = state.cart.find(item => item.cartItemId === action.payload);
        if (itemToMove) {
            state.cart = state.cart.filter(item => item.cartItemId !== action.payload);
            state.savedForLater.push(itemToMove);
        }
    },
    moveToCart: (state, action: PayloadAction<string>) => {
        const itemToMove = state.savedForLater.find(item => item.cartItemId === action.payload);
        if (itemToMove) {
            state.savedForLater = state.savedForLater.filter(item => item.cartItemId !== action.payload);
            const existingCartItem = state.cart.find(item => item.cartItemId === itemToMove.cartItemId);
            if (existingCartItem) {
                existingCartItem.quantity += itemToMove.quantity;
            } else {
                state.cart.push(itemToMove);
            }
        }
    },
    removeFromSaved: (state, action: PayloadAction<string>) => {
        state.savedForLater = state.savedForLater.filter(item => item.cartItemId !== action.payload);
    },
    clearCart: (state) => {
        state.cart = [];
    },
    setCartState: (state, action: PayloadAction<CartState>) => {
        state.cart = action.payload.cart;
        state.savedForLater = action.payload.savedForLater;
    }
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  saveForLater,
  moveToCart,
  removeFromSaved,
  clearCart,
  setCartState,
} = cartSlice.actions;

export default cartSlice.reducer;