import { AppDispatch, RootState } from '../store';
import { setUser, addUser, saveDataToUser } from '../slices/userSlice';
import { showToast } from './uiThunks';
import { User } from '@/lib/types';
import { setCartState, clearCart } from '../slices/cartSlice';
import { clearOrders } from '../slices/orderSlice';
import { setWishlist } from '../slices/wishlistSlice';

// NOTE: This is for demonstration purposes only. In a real-world application,
// never handle authentication or sensitive data on the client-side.

export const login = (email: string, password: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { users } = getState().user;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Load user's data into the active state
    dispatch(setCartState({ cart: user.cart || [], savedForLater: user.savedForLater || [] }));
    dispatch(setWishlist(user.wishlist || []));
    
    // Set current user
    dispatch(setUser(user));
    dispatch(showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success'));
    return { success: true };
  } else {
    dispatch(showToast('Invalid email or password.', 'error'));
    return { success: false, message: 'Invalid email or password.' };
  }
};

export const signup = (name: string, email: string, password: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { users } = getState().user;
  if (users.find(u => u.email === email)) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser: User = {
    id: String(Date.now()),
    name,
    email,
    password,
    cart: [],
    savedForLater: [],
    wishlist: [],
  };
  
  dispatch(addUser(newUser));
  dispatch(showToast(`Account created for ${name}! Please log in.`, 'success'));
  return { success: true };
};

export const logout = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { user } = getState().user;
  const { cart, savedForLater } = getState().cart;
  const { itemIds: wishlist } = getState().wishlist;

  // Save the current cart/wishlist state back to the user object before logging out
  if (user) {
    dispatch(saveDataToUser({ userId: user.id, cart, savedForLater, wishlist }));
  }

  // Clear the active state
  dispatch(setUser(null));
  dispatch(clearCart());
  dispatch(clearOrders());
  dispatch(setWishlist([]));
  dispatch(showToast("You've been logged out.", 'info'));
};