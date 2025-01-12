import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    openInEditMode: false
  },
  reducers: {
    openEditing: (state, action) => {
      state.openInEditMode = action.payload;
    },
  },
});

export const { openEditing } = navigationSlice.actions;
export default navigationSlice.reducer;