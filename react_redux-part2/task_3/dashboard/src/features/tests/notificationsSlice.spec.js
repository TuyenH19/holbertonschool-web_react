import notificationsReducer, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  describe('initial state', () => {
    test('should return the correct initial state by default', () => {
      const initialState = notificationsReducer(undefined, { type: '@@INIT' });
      
      expect(initialState).toEqual({
        notifications: [],
        loading: false,
      });
    });
  });

  describe('markNotificationAsRead', () => {
    test('should remove a notification correctly when the markNotificationAsRead action is dispatched', () => {
      const initialState = {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
        ],
      };

      const action = markNotificationAsRead(2);
      const newState = notificationsReducer(initialState, action);

      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications).toEqual([
        { id: 1, type: 'default', value: 'New course available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ]);
    });

    test('should not modify state if notification id does not exist', () => {
      const initialState = {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
        ],
      };

      const action = markNotificationAsRead(999);
      const newState = notificationsReducer(initialState, action);

      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications).toEqual(initialState.notifications);
    });
  });

  describe('fetchNotifications', () => {
    test('should fetch notifications data correctly', async () => {
      const mockNotifications = {
        data: {
          notifications: [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', value: 'Urgent notification' },
          ],
        },
      };

      const initialState = {
        notifications: [],
      };

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: mockNotifications.data.notifications.map((notification) => {
          if (notification.id === 3) {
            return {
              ...notification,
              html: { __html: getLatestNotification() },
            };
          }
          return notification;
        }),
      };

      const newState = notificationsReducer(initialState, action);

      expect(newState.notifications).toHaveLength(3);
      expect(newState.notifications[0]).toEqual({
        id: 1,
        type: 'default',
        value: 'New course available',
      });
      expect(newState.notifications[1]).toEqual({
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      });
      expect(newState.notifications[2]).toEqual({
        id: 3,
        type: 'urgent',
        value: 'Urgent notification',
        html: { __html: getLatestNotification() },
      });
    });

    test('should update notification with id 3 to include latest notification html', async () => {
      const mockNotifications = {
        data: {
          notifications: [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 3, type: 'urgent', value: 'Original value' },
          ],
        },
      };

      const initialState = {
        notifications: [],
      };

      const updatedNotifications = mockNotifications.data.notifications.map(
        (notification) => {
          if (notification.id === 3) {
            return {
              ...notification,
              html: { __html: getLatestNotification() },
            };
          }
          return notification;
        }
      );

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: updatedNotifications,
      };

      const newState = notificationsReducer(initialState, action);

      const notification3 = newState.notifications.find((n) => n.id === 3);
      expect(notification3).toBeDefined();
      expect(notification3.html).toEqual({
        __html: '<strong>Urgent requirement</strong> - complete by EOD',
      });
    });

    test('should replace existing notifications when fetching new ones', async () => {
      const initialState = {
        notifications: [
          { id: 100, type: 'default', value: 'Old notification' },
        ],
      };

      const newNotifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: newNotifications,
      };

      const newState = notificationsReducer(initialState, action);

      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications).toEqual(newNotifications);
    });
  });
});
