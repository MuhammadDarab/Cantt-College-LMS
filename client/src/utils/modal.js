// modalUtils.js
import { showModal } from '../redux/slices/modal';
import store from '../redux/store'

export const displayModal = ({ title, subTitle, primaryButton, secondaryButton }) => {
  return new Promise((resolve) => {
    const handlePrimaryClick = () => resolve('accept');
    const handleClose = () => resolve('close');

    store.dispatch(
      showModal({
        title,
        subTitle,
        primaryButton,
        secondaryButton,
        onPrimaryClick: handlePrimaryClick,
        onClose: handleClose,
      })
    );
  });
};