import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from "./Notifications";
import authReducer from '../../features/auth/authSlice';
import notificationsReducer, { fetchNotifications, markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';
import { getLatestNotification } from "../../utils/utils";
import mockAxios from 'jest-mock-axios';

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

afterEach(() => {
  mockAxios.reset();
});

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      notifications: notificationsReducer,
      courses: coursesReducer,
    },
    preloadedState: initialState,
  });
};

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("hides drawer when close button is clicked", () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: /close/i });
    fireEvent.click(buttonElement);

    // Check UI visibility instead of Redux state
    const notificationsTitle = screen.queryByText(/here is the list of notifications/i);
    expect(notificationsTitle).toBeNull();
  });

  test("it should display 3 notification items as expected", () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(3);
  });

  test('it should display "No new notifications for now" when notifications array is empty', () => {
    const store = createMockStore({
      notifications: {
        notifications: [],
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationsTitle = screen.getByText(/no new notifications for now/i);
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsListItems).toHaveLength(0);
    expect(notificationsTitle).toBeInTheDocument();
  });

  test('it should display "Your notifications" in all cases', () => {
    const notificationsData = [
      { id: 1, type: "default", value: "New course available" },
    ];

    const store = createMockStore({
      notifications: {
        notifications: notificationsData,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("should mark notification as read and remove it from list", () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    let listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    fireEvent.click(listItems[0]);

    const state = store.getState();
    expect(state.notifications.notifications).toHaveLength(1);
  });

  test('should open drawer when "Your notifications" is clicked', () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
      },
    });

    const { rerender } = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    // First, close the drawer
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    
    // Verify drawer is closed
    expect(screen.queryByText(/here is the list of notifications/i)).toBeNull();

    // Now click to reopen
    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);

    // Check UI visibility instead of Redux state
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('should fetch and display notifications on mount', async () => {
    const store = createMockStore();

    store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
        ]
      }
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.notifications.notifications).toHaveLength(2);
    });
  });
});
