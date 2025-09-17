import { AppDispatch, RootState } from '../store';
import {
  addToCart as addToCartAction,
  updateCartQuantity as updateCartQuantityAction,
  removeFromCart as removeFromCartAction,
  saveForLater as saveForLaterAction,
  moveToCart as moveToCartAction,
  removeFromSaved as removeFromSavedAction,
} from '../slices/cartSlice';
import { toggleWishlistItem as toggleWishlistAction, clearWishlist as clearWishlistAction } from '../slices/wishlistSlice';
import { showToast } from './uiThunks';
import { CartItem, Product } from '@/lib/types';

export const addToCart = (item: Omit<CartItem, 'cartItemId' | 'image'>) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { products } = getState().products;
  const { cart } = getState().cart;

  const product = products.find((p) => p.id === item.id);
  if (!product) {
    dispatch(showToast('Product not found.', 'error'));
    return;
  }

  // If no options are provided, create a default set of options
  const selectedOptions = item.options ?? product.options?.reduce((acc, option) => {
    acc[option.name] = option.variants[0].value;
    return acc;
  }, {} as Record<string, string>) ?? {};

  const cartItemId = `${item.id}-${JSON.stringify(selectedOptions)}`;
  const existingItem = cart.find((i) => i.cartItemId === cartItemId);
  const quantityInCart = existingItem ? existingItem.quantity : 0;

  if (quantityInCart + item.quantity > product.stock) {
    dispatch(showToast(`No more in stock for ${item.title}. Only ${product.stock} available.`, 'error'));
    return;
  }

  const colorOption = product.options?.find((o) => o.name === 'Color');
  // Use the resolved selectedOptions to find the variant
  const selectedVariant = colorOption?.variants.find(
    (v) => v.value === selectedOptions.Color
  );
  const itemImage =
    selectedVariant?.image ||
    product.images?.[0] ||
    '/images/placeholder.jpg';

  // Create the new cart item with the resolved options
  const newItem: CartItem = { ...item, options: selectedOptions, cartItemId, image: itemImage };

  dispatch(addToCartAction(newItem));
  dispatch(showToast(`${item.title} added to cart`, 'success'));
};

export const updateCartQuantity = (cartItemId: string, newQuantity: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { cart } = getState().cart;
  const { products } = getState().products;

  const cartItem = cart.find((i) => i.cartItemId === cartItemId);
  if (!cartItem) return;

  const product = products.find((p) => p.id === cartItem.id);
  if (product && newQuantity > product.stock) {
    dispatch(showToast(`No more in stock. Only ${product.stock} available.`, 'error'));
    return;
  }

  dispatch(updateCartQuantityAction({ cartItemId, newQuantity }));
};

export const removeFromCart = (cartItemId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { cart } = getState().cart;
  const item = cart.find((i) => i.cartItemId === cartItemId);
  if (item) {
    dispatch(removeFromCartAction(cartItemId));
    dispatch(showToast(`'${item.title}' removed from cart.`, 'info'));
  }
};

export const saveForLater = (cartItemId: string) => (dispatch: AppDispatch) => {
  dispatch(saveForLaterAction(cartItemId));
  dispatch(showToast("Item moved to 'Saved for Later'.", 'info'));
};

export const moveToCart = (cartItemId: string) => (dispatch: AppDispatch) => {
  dispatch(moveToCartAction(cartItemId));
  dispatch(showToast('Item moved to cart.', 'info'));
};

export const removeFromSaved = (cartItemId: string) => (dispatch: AppDispatch) => {
  dispatch(removeFromSavedAction(cartItemId));
  dispatch(showToast('Item removed.', 'info'));
};

export const toggleWishlist = (productId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { itemIds } = getState().wishlist;
  const isInWishlist = itemIds.includes(productId);

  dispatch(toggleWishlistAction(productId));
  dispatch(showToast(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info'));
};

export const clearWishlist = () => (dispatch: AppDispatch) => {
    dispatch(clearWishlistAction());
    dispatch(showToast('Wishlist cleared', 'info'));
};