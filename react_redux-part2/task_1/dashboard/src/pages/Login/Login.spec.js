import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event'
import Login from './Login';
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

test('testing signin form elements', () => {
  const store = createMockStore();
  const { container } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const inputElements = container.querySelectorAll('input[type="email"], input[type="text"], input[type="password"]');

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: 'OK' })

  expect(inputElements.length).toBeGreaterThanOrEqual(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElementText).toBeInTheDocument();
});

test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  )

  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');

  userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
})

test('it should check that the password input element will be focused whenver the associated label is clicked', async () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  )

  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');

  userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();
});

test('submit button is enabled only with a valid email and password of at least 8 characters', () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).not.toBeDisabled();
});

test('should dispatch login action on form submission with valid credentials', () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.click(submitButton);

  const state = store.getState();
  expect(state.auth.isLoggedIn).toBe(true);
  expect(state.auth.user.email).toBe('test@test.com');
});

test('isLoggedIn should remain false with invalid credentials (empty form)', () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const state = store.getState();
  expect(state.auth.isLoggedIn).toBe(false);
});
