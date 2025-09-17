import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/lib/types';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;