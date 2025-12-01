import { AppDispatch, RootState } from '../store';
import { setUser, addUser, setUsers, logout as logoutAction } from '../slices/userSlice';
import { showToast } from './uiThunks';
import { User } from '@/lib/types';
import { clearCart } from '../slices/cartSlice';
import { clearOrders } from '../slices/orderSlice';
import { clearWishlist } from '../slices/wishlistSlice';

// Type for thunk results
interface ThunkResult {
  success: boolean;
  message?: string;
}

// Helper function for ID generation
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Login user with email and password
 * WARNING: Demo only - never handle authentication client-side in production
 */
export const login = (email: string, password: string) => (
  dispatch: AppDispatch, 
  getState: () => RootState
): ThunkResult => {
  const { users } = getState().user;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    dispatch(setUser(user));
    dispatch(showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success'));
    return { success: true };
  }

  dispatch(showToast('Invalid email or password.', 'error'));
  return { success: false, message: 'Invalid email or password.' };
};

/**
 * Sign up new user
 */
export const signup = (name: string, email: string, password: string) => (
  dispatch: AppDispatch, 
  getState: () => RootState
): ThunkResult => {
  const { users } = getState().user;
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    dispatch(showToast('Please enter a valid email address.', 'error'));
    return { success: false, message: 'Invalid email format.' };
  }

  // Check if email already exists
  if (users.some(u => u.email === email)) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'Email already exists.' };
  }

  // Validate password strength (add your requirements)
  if (password.length < 6) {
    dispatch(showToast('Password must be at least 6 characters.', 'error'));
    return { success: false, message: 'Password too short.' };
  }

  const newUser: User = {
    id: generateUserId(),
    name,
    email,
    password,
    role: email === 'rabit@gmail.com' ? 'admin' : 'customer',
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
): ThunkResult => {
  const { users, user: currentUser } = getState().user;
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    dispatch(showToast('User not found.', 'error'));
    return { success: false, message: 'User not found.' };
  }

  // Check if email is already taken by another user
  if (users.some(u => u.email === values.email && u.id !== userId)) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'Email already exists.' };
  }

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
  
  dispatch(showToast(`User ${values.name} updated successfully!`, 'success'));

  return { success: true };
};

/**
 * Delete user from admin panel
 */
export const deleteUserFromAdmin = (userId: string) => (
  dispatch: AppDispatch, 
  getState: () => RootState
): ThunkResult => {
  const { users, user: currentUser } = getState().user;
  
  // Prevent deleting yourself
  if (currentUser?.id === userId) {
    dispatch(showToast('You cannot delete your own account.', 'error'));
    return { success: false, message: 'Cannot delete own account.' };
  }
  
  const updatedUsers = users.filter(u => u.id !== userId);
  dispatch(setUsers(updatedUsers));
  dispatch(showToast('User deleted successfully!', 'success'));
  
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
): ThunkResult => {
  const { users } = getState().user;
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    dispatch(showToast('An account with this email already exists.', 'error'));
    return { success: false, message: 'Email already exists.' };
  }

  const newUser: User = {
    id: generateUserId(),
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
  dispatch(showToast(`User ${name} created successfully!`, 'success'));

  return { success: true };
};

/**
 * Logout current user
 */
export const logout = () => (dispatch: AppDispatch): ThunkResult => {
  dispatch(logoutAction());
  dispatch(clearCart());
  dispatch(clearWishlist());
  dispatch(clearOrders());
  dispatch(showToast("You've been logged out.", 'info'));
  
  return { success: true };
};