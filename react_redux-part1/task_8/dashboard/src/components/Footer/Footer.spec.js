import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import authReducer from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';

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

test('It should render footer with copyright text', () => {
  const store = createMockStore();

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  )

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  const store = createMockStore();

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const store = createMockStore({
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
  });

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
