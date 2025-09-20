import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  searchQuery: string;
  isMenuOpen: boolean;
  quickViewProductId: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
}

const initialState: UIState = {
  theme: 'light',
  searchQuery: '',
  isMenuOpen: false,
  quickViewProductId: null,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setQuickViewProductId: (state, action: PayloadAction<string | null>) => {
      state.quickViewProductId = action.payload;
    },
    setToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' } | null>) => {
      state.toast = action.payload;
    },
     // NEW: A more flexible way to update multiple UI state properties
    setUiState: (state, action: PayloadAction<Partial<UIState>>) => {
        // Object.assign merges the new partial state into the existing state
        Object.assign(state, action.payload);
    }
  },
});

export const {
  setTheme,
  setSearchQuery,
  setIsMenuOpen,
  setQuickViewProductId,
  setToast,
  setUiState
} = uiSlice.actions;
export default uiSlice.reducer;