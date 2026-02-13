import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  notifications: [],
  loading: false,
};

// API Configuration
const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const notifications = response.data.notifications || [];

    // Keep only unread notifications and return required fields
    const unread = notifications
      .filter((n) => !(n.context && n.context.isRead))
      .map((n) => ({
        id: n.id,
        type: n.type,
        isRead: !!(n.context && n.context.isRead),
        value: n.value || null,
      }));

    return unread;
  }
);

// Create the notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload;
      console.log(`Notification ${id} has been marked as read`);
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions
export const { markNotificationAsRead } = notificationsSlice.actions;

// Export reducer as default
export default notificationsSlice.reducer;
