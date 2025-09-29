import { addReview, placeOrder, toggleHelpfulReview } from '@/lib/store/thunks/managementThunks';
import { Order, ReviewPayload } from '@/lib/types';
import { useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

/**
 * Custom hook for product and order management
 * 
 * Provides access to products, orders, and related actions
 * with proper loading and error states
 */
export const useProducts = () => {
  const dispatch = useAppDispatch();
  
  // Select products state with loading and error
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const error = useAppSelector((state) => state.products.error);
  
  // Select orders state
  const orders = useAppSelector((state) => state.orders.orders);

  /**
   * Place a new order
   */
  const handlePlaceOrder = useCallback(
    (orderDetails: Omit<Order, 'id' | 'date'>) => {
      return dispatch(placeOrder(orderDetails));
    },
    [dispatch]
  );

  /**
   * Add a review to a product
   */
  const handleAddReview = useCallback(
    (productId: string, reviewData: ReviewPayload) => {
      dispatch(addReview(productId, reviewData));
    },
    [dispatch]
  );

  /**
   * Toggle helpful count on a review
   */
  const handleUpdateReviewHelpfulCount = useCallback(
    (productId: string, reviewId: string) => {
      dispatch(toggleHelpfulReview(productId, reviewId));
    },
    [dispatch]
  );

  return {
    products,
    orders,
    isLoading,
    error,
    placeOrder: handlePlaceOrder,
    addReview: handleAddReview,
    updateReviewHelpfulCount: handleUpdateReviewHelpfulCount,
  };
};