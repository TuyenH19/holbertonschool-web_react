import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

// Initial state
const initialState = {
  notifications: [],
  displayDrawer: true,
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
    const notifications = response.data.notifications;
    
    // Update notification with id 3 to include the latest notification
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === 3) {
        return {
          ...notification,
          html: { __html: getLatestNotification() },
        };
      }
      return notification;
    });
    
    return updatedNotifications;
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
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

// Export actions
export const { markNotificationAsRead, showDrawer, hideDrawer } = notificationsSlice.actions;

// Export reducer as default
export default notificationsSlice.reducer;
