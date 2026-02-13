import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

// Initial state
const initialState = {
  courses: [],
  displayDrawer: true,
};

// API Configuration
const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get(ENDPOINTS.courses);
    const courses = response.data.courses;
    return courses;
  }
);

// Create the courses slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      const courseId = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.isSelected = true;
      }
    },
    unSelectCourse: (state, action) => {
      const courseId = action.payload;
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.isSelected = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload.map((course) => ({
          ...course,
          isSelected: false,
        }));
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

// Export actions
export const { selectCourse, unSelectCourse } = coursesSlice.actions;

// Export reducer as default
export default coursesSlice.reducer;
