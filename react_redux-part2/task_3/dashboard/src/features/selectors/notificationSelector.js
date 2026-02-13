import { createSelector } from '@reduxjs/toolkit';

// Base selector to retrieve notifications array from Redux state
const selectNotificationsArray = (state) => state.notifications.notifications;

// Memoized selector to get filtered notifications based on filter type
export const getFilteredNotifications = createSelector(
  [selectNotificationsArray, (_, filter) => filter],
  (notifications, filter) => {
    if (filter === 'all') {
      return notifications;
    }
    return notifications.filter((notification) => notification.type === filter);
  }
);
