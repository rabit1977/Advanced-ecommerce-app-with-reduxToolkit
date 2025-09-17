import { addReview, placeOrder } from '@/lib/store/thunks/managementThunks';
import { Order, ReviewPayload } from '@/lib/types';
import { useCallback } from 'react';
import { updateReviewHelpfulCount } from '../store/slices/productSlice';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { orders } = useAppSelector((state) => state.orders);

  const handlePlaceOrder = useCallback(
    (orderDetails: Omit<Order, 'id' | 'date'>) => {
      return dispatch(placeOrder(orderDetails));
    },
    [dispatch]
  );

  const handleAddReview = useCallback(
    (productId: string, reviewData: ReviewPayload) => {
      dispatch(addReview(productId, reviewData));
    },
    [dispatch]
  );

  const handleUpdateReviewHelpfulCount = useCallback(
    (productId: string, reviewId: string) => {
      dispatch(updateReviewHelpfulCount(productId, reviewId));
    },
    [dispatch]
  );

  return {
    products,
    orders,
    placeOrder: handlePlaceOrder,
    addReview: handleAddReview,
    updateReviewHelpfulCount: handleUpdateReviewHelpfulCount,
  };
};
