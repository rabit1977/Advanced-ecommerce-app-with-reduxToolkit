// /lib/store/slices/cartSlice.ts
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
          // This is a perfectly fine way to remove the item
          state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.cartItemId !== action.payload);
    },
    // REFINED: Use findIndex and splice for a more performant, single operation.
    saveForLater: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex(item => item.cartItemId === action.payload);
      // Ensure the item exists before trying to move it
      if (itemIndex !== -1) {
        const [itemToMove] = state.cart.splice(itemIndex, 1); // Removes item and returns it
        state.savedForLater.push(itemToMove);
      }
    },
    // REFINED: Same pattern as above for efficiency.
    moveToCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.savedForLater.findIndex(item => item.cartItemId === action.payload);
      if (itemIndex !== -1) {
        const [itemToMove] = state.savedForLater.splice(itemIndex, 1);
        
        // Reuse the 'addToCart' logic to handle merging quantities correctly
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
    // NOTE: This is a useful utility but should be used with care, as it replaces the entire state.
    // It's great for debugging or specific state hydration scenarios.
    setCartState: (state, action: PayloadAction<CartState>) => {
      return action.payload; // Returning a new state is also a valid way to update in Immer
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