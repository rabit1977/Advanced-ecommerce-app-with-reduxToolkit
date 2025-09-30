import { AppDispatch, RootState } from '../store';
import { setUser, addUser, setUsers, logout as logoutAction } from '../slices/userSlice';
import { showToast } from './uiThunks';
import { User } from '@/lib/types';
import { clearCart } from '../slices/cartSlice';
import { clearOrders } from '../slices/orderSlice';
import { clearWishlist } from '../slices/wishlistSlice';

/**
 * Login user with email and password
 * NOTE: This is for demonstration only. Never handle authentication client-side in production.
 */
export const login = (email: string, password: string) => (
  dispatch: AppDispatch, 
  getState: () => RootState
) => {
  const { users } = getState().user;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Set current user (cart/wishlist load from their own localStorage)
    dispatch(setUser(user));
    dispatch(showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success'));
    return { success: true };
  } else {
    dispatch(showToast('Invalid email or password.', 'error'));
    return { success: false, message: 'Invalid email or password.' };
  }
};

/**
 * Sign up new user
 */
export const signup = (name: string, email: string, password: string) => (
  dispatch: AppDispatch, 
  getState: () => RootState
) => {
  const { users } = getState().user;
  
  // Check if email already exists
  if (users.find(u => u.email === email)) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'An account with this email already exists.' };
  }

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    email,
    password,
    role: email === 'admin@example.com' ? 'admin' : 'customer',
    cart: [],
    savedForLater: [],
    wishlist: [],
    helpfulReviews: [],
    createdAt: new Date().toISOString(),
  };
  
  dispatch(addUser(newUser));
  dispatch(setUser(newUser));
  dispatch(showToast(`Welcome, ${name}!`, 'success'));

  return { success: true };
};

/**
 * Update user from admin panel
 */
export const updateUserFromAdmin = (
  userId: string, 
  values: { 
    name: string; 
    email: string; 
    role: 'admin' | 'customer'; 
    password?: string;
  }
) => (
  dispatch: AppDispatch, 
  getState: () => RootState
) => {
  const { users, user: currentUser } = getState().user;
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    dispatch(showToast('User not found.', 'error'));
    return { success: false, message: 'User not found.' };
  }

  // Check if email is already taken by another user
  const existingUser = users.find(u => u.email === values.email && u.id !== userId);
  if (existingUser) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'An account with this email already exists.' };
  }

  // Update user
  const updatedUser: User = {
    ...users[userIndex],
    name: values.name,
    email: values.email,
    role: values.role,
    ...(values.password && { password: values.password }),
  };

  const updatedUsers = [...users];
  updatedUsers[userIndex] = updatedUser;

  dispatch(setUsers(updatedUsers));
  
  // If updating current logged-in user, update them too
  if (currentUser?.id === userId) {
    dispatch(setUser(updatedUser));
  }
  
  dispatch(showToast(`User ${values.name} updated!`, 'success'));

  return { success: true };
};

/**
 * Delete user from admin panel
 */
export const deleteUserFromAdmin = (userId: string) => (
  dispatch: AppDispatch, 
  getState: () => RootState
) => {
  const { users, user: currentUser } = getState().user;
  
  // Prevent deleting yourself
  if (currentUser?.id === userId) {
    dispatch(showToast('You cannot delete your own account.', 'error'));
    return { success: false, message: 'Cannot delete your own account.' };
  }
  
  const updatedUsers = users.filter(u => u.id !== userId);
  dispatch(setUsers(updatedUsers));
  dispatch(showToast('User deleted!', 'success'));
  
  return { success: true };
};

/**
 * Create user from admin panel
 */
export const createUserFromAdmin = (
  name: string, 
  email: string, 
  password: string, 
  role: 'admin' | 'customer'
) => (
  dispatch: AppDispatch, 
  getState: () => RootState
) => {
  const { users } = getState().user;
  
  // Check if email already exists
  if (users.find(u => u.email === email)) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'An account with this email already exists.' };
  }

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    email,
    password,
    role,
    cart: [],
    savedForLater: [],
    wishlist: [],
    helpfulReviews: [],
    createdAt: new Date().toISOString(),
  };
  
  dispatch(addUser(newUser));
  dispatch(showToast(`User created for ${name}!`, 'success'));

  return { success: true };
};

/**
 * Logout current user
 * Note: Cart/wishlist persist in their own localStorage, not tied to user
 */
export const logout = () => (dispatch: AppDispatch) => {
  // Clear user session
  dispatch(logoutAction());
  
  // Clear cart and wishlist (or keep them - your choice)
  dispatch(clearCart());
  dispatch(clearWishlist());
  dispatch(clearOrders());
  
  dispatch(showToast("You've been logged out.", 'info'));
  
  return { success: true };
};