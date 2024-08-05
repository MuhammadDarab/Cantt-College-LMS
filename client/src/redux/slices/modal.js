// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    title: '',
    subTitle: '',
    primaryButton: '',
    secondaryButton: '',
    onPrimaryClick: null,
    onClose: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
      state.primaryButton = action.payload.primaryButton;
      state.secondaryButton = action.payload.secondaryButton;
      state.onPrimaryClick = action.payload.onPrimaryClick;
      state.onClose = action.payload.onClose;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = '';
      state.subTitle = '';
      state.primaryButton = '';
      state.secondaryButton = '';
      state.onPrimaryClick = null;
      state.onClose = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
