import { AppDispatch, RootState } from '../store';
import { addOrder } from '../slices/orderSlice';
import { clearCart } from '../slices/cartSlice';
import { updateStock } from '../slices/productSlice';
import { showToast } from './uiThunks';
import { Order } from '@/lib/types';

export const placeOrder = (orderDetails: Omit<Order, 'id' | 'date'>) => (dispatch: AppDispatch, getState: () => RootState) => {
  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    ...orderDetails,
  };

  dispatch(addOrder(newOrder));

  newOrder.items.forEach((item) => {
    dispatch(
      updateStock({ productId: item.id, quantity: item.quantity })
    );
  });

  dispatch(clearCart());
  dispatch(showToast('Order placed successfully!', 'success'));
  
  // In a real app, you might want to return the order ID and let the component handle navigation.
  return newOrder.id;
};