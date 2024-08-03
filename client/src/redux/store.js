import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';
import studentsReducer from './slices/students';
import subjectsReducer from './slices/subjects';
import facultyReducer from './slices/faculty';
import userReducer from './slices/user';

export default configureStore({
  reducer: {
    categories: categoryReducer,
    students: studentsReducer,
    subjects: subjectsReducer,
    faculty: facultyReducer,
    user: userReducer
  },
});