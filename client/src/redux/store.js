import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';
import studentsReducer from './slices/students';
import subjectsReducer from './slices/subjects';
import facultyReducer from './slices/faculty';
import userReducer from './slices/user';
import modalReducer from './slices/modal'
import membersSlice from './slices/members';
import activitiesSlice from './slices/activity';

export default configureStore({
  reducer: {
    categories: categoryReducer,
    activity: activitiesSlice,
    students: studentsReducer,
    subjects: subjectsReducer,
    faculty: facultyReducer,
    members: membersSlice,
    modal: modalReducer,
    user: userReducer
  },
});