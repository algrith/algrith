import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DashboardState } from '@/types';

const initialState: DashboardState = {
  presences: {},
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
  profile: {
    data: undefined,
    loading: false
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
  name: 'dashboard',
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<Partial<DashboardState['analytics']>>) => {
      state.analytics = {
        ...state.analytics,
        ...action.payload
      };
    },
    updateSidebar: (state, action: PayloadAction<Partial<DashboardState['sidebar']>>) => {
      state.sidebar = { ...state.sidebar, ...action.payload };
    },
    setProfile: (state, action: PayloadAction<Partial<DashboardState['profile']>>) => {
      state.profile = {
        ...state.profile,
        ...action.payload
      };
    },
    setOrders: (state, action: PayloadAction<Partial<DashboardState['orders']>>) => {
      state.orders = {
        ...state.orders,
        ...action.payload
      };
    },
    setUsers: (state, action: PayloadAction<Partial<DashboardState['users']>>) => {
      state.users = {
        ...state.users,
        ...action.payload
      };
    },
    setOrder: (state, action: PayloadAction<Partial<DashboardState['order']>>) => {
      state.order = {
        ...state.order,
        ...action.payload
      };
    },
    setUser: (state, action: PayloadAction<Partial<DashboardState['user']>>) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    setPresence: (state, action: PayloadAction<DashboardState['presences']>) => {
      state.presences = { ...state.presences, ...action.payload };
    }
  }
})

const { reducer, actions } = layoutSlice;

export const {
  updateSidebar,
  setAnalytics,
  setPresence,
  setProfile,
  setOrders,
  setUsers,
  setOrder,
  setUser
} = actions;

export default reducer;