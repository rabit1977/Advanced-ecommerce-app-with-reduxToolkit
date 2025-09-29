import { AppDispatch, RootState } from '../store';
import { showToast } from './uiThunks';
import { Order } from '@/lib/types';
import { updateOrder } from '../slices/orderSlice';

export const updateOrderStatusInStore = (orderId: string, newStatus: Order['status']) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { orders } = getState().orders;
  const orderToUpdate = orders.find(o => o.id === orderId);

  if (!orderToUpdate) {
    dispatch(showToast('Order not found.', 'error'));
    return;
  }

  const updatedOrder = { ...orderToUpdate, status: newStatus };
  dispatch(updateOrder(updatedOrder));
  dispatch(showToast(`Order ${orderId} status updated to ${newStatus}.`, 'success'));
};