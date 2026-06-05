import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LayoutState } from '@/types';

const initialState: LayoutState = {
  sidebar: {
		collapsedBeforeHover: false,
		collapsed: false
	},
  orders: {
    loading: false,
    list: []
  },
  order: {
    data: undefined,
    loading: false
  },
  user: {
    data: undefined,
    loading: false
  }
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateSidebar: (state, action: PayloadAction<Partial<LayoutState['sidebar']>>) => {
      state.sidebar = { ...state.sidebar, ...action.payload };
    },
    setOrders: (state, action: PayloadAction<Partial<LayoutState['orders']>>) => {
      state.orders = {
        ...state.orders,
        ...action.payload
      };
    },
    setOrder: (state, action: PayloadAction<Partial<LayoutState['order']>>) => {
      state.order = {
        ...state.order,
        ...action.payload
      };
    },
    setUser: (state, action: PayloadAction<Partial<LayoutState['user']>>) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    }
  }
})

const { reducer, actions } = layoutSlice;

export const {
  updateSidebar,
  setOrders,
  setOrder,
  setUser
} = actions;

export default reducer;