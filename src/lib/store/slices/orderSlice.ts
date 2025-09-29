import { Order } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const updated = action.payload;
      const idx = state.orders.findIndex(o => o.id === updated.id);
      if (idx >= 0) {
        state.orders[idx] = updated;
      }
    },
  },
});


export const { addOrder, clearOrders, setSelectedOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
