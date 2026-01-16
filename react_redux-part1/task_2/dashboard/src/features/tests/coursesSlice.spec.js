import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('coursesSlice', () => {
  describe('initial state', () => {
    test('should return the correct initial state by default', () => {
      const initialState = coursesReducer(undefined, { type: '@@INIT' });
      
      expect(initialState).toEqual({
        courses: [],
        displayDrawer: true,
      });
    });
  });

  describe('fetchCourses', () => {
    test('should fetch courses data correctly', async () => {
      const mockCourses = {
        data: {
          courses: [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 40 },
          ],
        },
      };

      const initialState = {
        courses: [],
        displayDrawer: true,
      };

      const action = {
        type: fetchCourses.fulfilled.type,
        payload: mockCourses.data.courses,
      };

      const newState = coursesReducer(initialState, action);

      expect(newState.courses).toHaveLength(3);
      expect(newState.courses[0]).toEqual({
        id: 1,
        name: 'ES6',
        credit: 60,
      });
      expect(newState.courses[1]).toEqual({
        id: 2,
        name: 'Webpack',
        credit: 20,
      });
      expect(newState.courses[2]).toEqual({
        id: 3,
        name: 'React',
        credit: 40,
      });
    });
  });

  describe('logout action', () => {
    test('should reset courses state to initial value when logout action is dispatched', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ],
        displayDrawer: false,
      };

      const action = logout();
      const newState = coursesReducer(stateWithCourses, action);

      expect(newState).toEqual({
        courses: [],
        displayDrawer: true,
      });
    });
  });
});
