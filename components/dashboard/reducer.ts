import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LayoutState } from '@/types';

const initialState: LayoutState = {
  analytics: {
    loading: true,
    data: {
      timeline: [],
      addon: [],
      summary: {
        one_time_payment_orders: 0,
        total_orders: 0,
        paid_orders: 0
      },
      revenue: {
        addon_total: 0,
        average: 0,
        total: 0
      },
      status: {
        delivered: 0,
        completed: 0,
        cancelled: 0,
        pending: 0
      },
      plan: {
        professional: {
          average_revenue: 0,
          total_revenue: 0,
          count: 0
        },
        enterprise: {
          average_revenue: 0,
          total_revenue: 0,
          count: 0
        },
        business: {
          average_revenue: 0,
          total_revenue: 0,
          count: 0
        },
        starter: {
          average_revenue: 0,
          total_revenue: 0,
          count: 0
        }
      }
    }
  },
  sidebar: {
		collapsedBeforeHover: false,
		collapsed: false
	},
  orders: {
    loading: true,
    list: []
  },
  users: {
    loading: true,
    list: []
  },
  order: {
    data: undefined,
    loading: true
  },
  user: {
    data: undefined,
    loading: true
  }
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<Partial<LayoutState['analytics']>>) => {
      state.analytics = {
        ...state.analytics,
        ...action.payload
      };
    },
    updateSidebar: (state, action: PayloadAction<Partial<LayoutState['sidebar']>>) => {
      state.sidebar = { ...state.sidebar, ...action.payload };
    },
    setOrders: (state, action: PayloadAction<Partial<LayoutState['orders']>>) => {
      state.orders = {
        ...state.orders,
        ...action.payload
      };
    },
    setUsers: (state, action: PayloadAction<Partial<LayoutState['users']>>) => {
      state.users = {
        ...state.users,
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
  setAnalytics,
  setOrders,
  setUsers,
  setOrder,
  setUser
} = actions;

export default reducer;