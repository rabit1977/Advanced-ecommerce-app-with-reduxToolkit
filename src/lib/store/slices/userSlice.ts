import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, CartItem } from '@/lib/types';

interface UserState {
  user: User | null;
  users: User[];
}

const initialState: UserState = {
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
    },
    saveDataToUser: (state, action: PayloadAction<{ userId: string; cart: CartItem[]; savedForLater: CartItem[]; wishlist: string[]; helpfulReviews: string[] }>) => {
      const { userId, cart, savedForLater, wishlist, helpfulReviews } = action.payload;
      const userIndex = state.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex].cart = cart;
        state.users[userIndex].savedForLater = savedForLater;
        state.users[userIndex].wishlist = wishlist;
        state.users[userIndex].helpfulReviews = helpfulReviews;
      }
    },
    toggleHelpfulReview: (state, action: PayloadAction<string>) => {
      if (state.user) {
        const reviewId = action.payload;
        const helpfulReviews = state.user.helpfulReviews || [];
        const existingIndex = helpfulReviews.findIndex(id => id === reviewId);

        if (existingIndex >= 0) {
          state.user.helpfulReviews = helpfulReviews.filter(id => id !== reviewId);
        } else {
          state.user.helpfulReviews = [...helpfulReviews, reviewId];
        }
      }
    },
  },
});

export const { setUser, addUser, setUsers, saveDataToUser, toggleHelpfulReview } = userSlice.actions;
export default userSlice.reducer;