import { AppDispatch, RootState } from '../store';
import { addOrder } from '../slices/orderSlice';
import { addReview as addReviewAction, deleteReview as deleteReviewAction, updateReviewHelpfulCount } from '../slices/productSlice';
import { clearCart } from '../slices/cartSlice';
import { updateStock } from '../slices/productSlice';
import { showToast } from './uiThunks';
import { Order, ReviewPayload } from '@/lib/types';
import { toggleHelpfulReview as toggleHelpfulReviewAction } from '../slices/userSlice';

export const placeOrder = (orderDetails: Omit<Order, 'id' | 'date'>) => (dispatch: AppDispatch) => {
  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    ...orderDetails,
  };

  dispatch(addOrder(newOrder));

  // Update stock for each item in the order
  newOrder.items.forEach(item => {
    dispatch(updateStock({ productId: item.id, quantity: item.quantity }));
  });

  dispatch(clearCart());
  dispatch(showToast('Order placed successfully!', 'success'));
  
  return newOrder.id;
};

export const addReview = (productId: string, reviewData: ReviewPayload) => (dispatch: AppDispatch) => {
  dispatch(addReviewAction({ productId, reviewData }));
  dispatch(showToast(reviewData.id ? 'Review updated!' : 'Thank you for your review!', 'success'));
};

export const deleteReview = (productId: string, reviewId: string) => (dispatch: AppDispatch) => {
  dispatch(deleteReviewAction({ productId, reviewId }));
  dispatch(showToast('Review deleted', 'info'));
};

export const toggleHelpfulReview = (productId: string, reviewId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().user;
    if (!user) {
        dispatch(showToast('You must be logged in to do that.', 'error'));
        return;
    }

    const hasBeenMarkedHelpful = user.helpfulReviews?.includes(reviewId);

    dispatch(toggleHelpfulReviewAction(reviewId));
    dispatch(updateReviewHelpfulCount({
        productId,
        reviewId,
        direction: hasBeenMarkedHelpful ? 'decrement' : 'increment',
    }));
};