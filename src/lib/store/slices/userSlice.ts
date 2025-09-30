import { User } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  users: User[];
}

const CURRENT_USER_KEY = 'currentUser';
const USERS_KEY = 'users';

/**
 * Load current user from localStorage
 */
const loadCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading current user:', error);
    return null;
  }
};

/**
 * Load all users from localStorage
 */
const loadUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

/**
 * Save current user to localStorage
 */
const saveCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Error saving current user:', error);
  }
};

/**
 * Save all users to localStorage
 */
const saveUsers = (users: User[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

const initialState: UserState = {
  user: loadCurrentUser(),
  users: loadUsers(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Set current logged-in user
     */
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      saveCurrentUser(action.payload);
      
      // Also update in users array if exists
      if (action.payload) {
        const userIndex = state.users.findIndex(u => u.id === action.payload.id);
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
          saveUsers(state.users);
        }
      }
    },

    /**
     * Register a new user
     */
    addUser: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;
      
      // Check if user already exists
      const existingIndex = state.users.findIndex(u => 
        u.email === newUser.email || u.id === newUser.id
      );
      
      if (existingIndex !== -1) {
        // Update existing user
        state.users[existingIndex] = newUser;
      } else {
        // Add new user
        state.users.push(newUser);
      }
      
      saveUsers(state.users);
    },

    /**
     * Update current user data
     */
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveCurrentUser(state.user);
        
        // Update in users array
        const userIndex = state.users.findIndex(u => u.id === state.user!.id);
        if (userIndex !== -1) {
          state.users[userIndex] = state.user;
          saveUsers(state.users);
        }
      }
    },

    /**
     * Replace all users (for admin or testing)
     */
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      saveUsers(state.users);
    },

    /**
     * Toggle helpful review for current user
     */
    toggleHelpfulReview: (state, action: PayloadAction<string>) => {
      if (!state.user) return;
      
      const reviewId = action.payload;
      const helpfulReviews = state.user.helpfulReviews || [];
      const existingIndex = helpfulReviews.findIndex(id => id === reviewId);

      if (existingIndex !== -1) {
        // Remove from helpful
        state.user.helpfulReviews = helpfulReviews.filter(id => id !== reviewId);
      } else {
        // Add to helpful
        state.user.helpfulReviews = [...helpfulReviews, reviewId];
      }
      
      saveCurrentUser(state.user);
      
      // Update in users array
      const userIndex = state.users.findIndex(u => u.id === state.user!.id);
      if (userIndex !== -1) {
        state.users[userIndex] = state.user;
        saveUsers(state.users);
      }
    },

    /**
     * Logout current user
     */
    logout: (state) => {
      state.user = null;
      saveCurrentUser(null);
    },

    /**
     * Clear all users (for testing/reset)
     */
    clearUsers: (state) => {
      state.users = [];
      state.user = null;
      saveCurrentUser(null);
      saveUsers([]);
    },
  },
});

export const {
  setUser,
  addUser,
  updateUser,
  setUsers,
  toggleHelpfulReview,
  logout,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;