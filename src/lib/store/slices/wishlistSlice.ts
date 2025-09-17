import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  itemIds: string[];
}

const initialState: WishlistState = {
  itemIds: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingIndex = state.itemIds.findIndex((id) => id === productId);

      if (existingIndex >= 0) {
        state.itemIds.splice(existingIndex, 1);
      } else {
        state.itemIds.push(productId);
      }
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.itemIds = action.payload;
    },
    clearWishlist: (state) => {
      state.itemIds = [];
    },
  },
});

export const { toggleWishlistItem, setWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;