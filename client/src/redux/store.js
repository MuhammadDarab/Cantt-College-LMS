import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/students';
import subjectsReducer from './slices/subjects';
import facultyReducer from './slices/faculty';
import userReducer from './slices/user';

export default configureStore({
  reducer: {
    students: studentsReducer,
    subjects: subjectsReducer,
    faculty: facultyReducer,
    user: userReducer
  },
});