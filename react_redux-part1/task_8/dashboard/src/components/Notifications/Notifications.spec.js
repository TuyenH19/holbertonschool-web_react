import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from "./Notifications";
import authReducer from '../../features/auth/authSlice';
import notificationsReducer, { fetchNotifications, markNotificationAsRead, hideDrawer, showDrawer } from '../../features/notifications/notificationsSlice';
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
        displayDrawer: true,
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
        displayDrawer: true,
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
        displayDrawer: true,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: /close/i });
    fireEvent.click(buttonElement);

    const state = store.getState();
    expect(state.notifications.displayDrawer).toBe(false);
  });

  test("it should display 3 notification items as expected", () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
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

  test('it should not display a title, button and list items when displayDrawer is false', () => {
    const store = createMockStore({
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: false,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationsTitle = screen.queryByText(/here is the list of notifications/i);
    const notificationsButton = screen.queryByRole("button");
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsTitle).toBeNull();
    expect(notificationsButton).toBeNull();
    expect(notificationsListItems).toHaveLength(0);
  });

  test('it should display "No new notifications for now" when notifications array is empty', () => {
    const store = createMockStore({
      notifications: {
        notifications: [],
        displayDrawer: true,
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

    const store1 = createMockStore({
      notifications: {
        notifications: [],
        displayDrawer: false,
      },
    });

    const { rerender } = render(
      <Provider store={store1}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    const store2 = createMockStore({
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
    });

    rerender(
      <Provider store={store2}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    const store3 = createMockStore({
      notifications: {
        notifications: notificationsData,
        displayDrawer: true,
      },
    });

    rerender(
      <Provider store={store3}>
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
        displayDrawer: true,
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
        displayDrawer: false,
      },
    });

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationTitle = screen.getByText(/your notifications/i);
    fireEvent.click(notificationTitle);

    const state = store.getState();
    expect(state.notifications.displayDrawer).toBe(true);
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
