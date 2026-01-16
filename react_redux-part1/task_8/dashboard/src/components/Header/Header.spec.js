import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer, { login } from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

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

test('should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
  const store = createMockStore();

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const headingElement = screen.getByRole('heading', {name: /school Dashboard/i});
  const imgElement = screen.getByAltText('holberton logo')

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({color: convertHexToRGBA('#e1003c') })
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  const store = createMockStore();

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const logoutSection = screen.queryByText(/logout/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const store = createMockStore({
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link dispatches logout action and sets isLoggedIn to false', () => {
  const store = createMockStore({
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  const state = store.getState();
  expect(state.auth.isLoggedIn).toBe(false);
});

test('should display welcome message with email when user is logged in', () => {
  const store = createMockStore();
  
  // Dispatch login action
  store.dispatch(login({ email: 'user@test.com', password: 'password123' }));

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(screen.getByText(/user@test.com/i)).toBeInTheDocument();
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
