import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CourseList from './CourseList';
import authReducer, { logout } from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer, { fetchCourses } from '../../features/courses/coursesSlice';
import mockAxios from 'jest-mock-axios';

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

test('it should render the CourseList component with 5 rows', () => {
  const store = createMockStore({
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ],
      displayDrawer: true,
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  )

  const rowElements = screen.getAllByRole('row');

  expect(rowElements).toHaveLength(5)
})

test('it should render the CourseList component with 1 row', () => {
  const store = createMockStore();

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  )

  const rowElement = screen.getAllByRole('row');
  const rowText = screen.getByText(/No course available yet/i);

  expect(rowElement).toHaveLength(1)
  expect(rowText).toBeInTheDocument()
});

test('should display courses list after fetching', async () => {
  const store = createMockStore();

  store.dispatch(fetchCourses());

  mockAxios.mockResponse({
    data: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
      ]
    }
  });

  await waitFor(() => {
    const state = store.getState();
    expect(state.courses.courses).toHaveLength(2);
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  expect(screen.getByText('ES6')).toBeInTheDocument();
  expect(screen.getByText('Webpack')).toBeInTheDocument();
});

test('should reset courses array when logout action is dispatched', () => {
  const store = createMockStore({
    auth: {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
      ],
      displayDrawer: true,
    },
  });

  store.dispatch(logout());

  const state = store.getState();
  expect(state.courses.courses).toEqual([]);
});
