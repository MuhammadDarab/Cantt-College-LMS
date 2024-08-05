import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '../../redux/slices/modal';

const Modal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);

  if (!modalState.isOpen) return null;

  return (
    <div className="fixed w-full h-full backdrop-blur-md flex justify-center items-center z-30">
      <div className="bg-white w-[40%] rounded-xl shadow-xl">
        <div className="mt-8 mx-10 flex justify-between">
          <div>
            <div className="font-bold text-4xl text-slate-700">
              {modalState.title}
            </div>
            <div className="text-xl text-slate-700 mt-10 mr-24">
              {modalState.subTitle}
            </div>
          </div>
          <MdClose
            className="text-slate-700 cursor-pointer"
            size={40}
            onClick={() => {
              modalState.onClose();
              dispatch(closeModal());
            }}
          />
        </div>
        <div className="w-full flex justify-end items-end mb-12 mt-20">
          <div
            className="w-fit text-center select-none px-4 py-3 font-medium text-xl bg-white text-red-400 border-red-400 border-2 hover:shadow-lg shadow-xl rounded-xl cursor-pointer transition-all hover:scale-105 mr-4"
            onClick={() => {
              modalState.onClose();
              dispatch(closeModal());
            }}
          >
            {modalState.secondaryButton || "Skip"}
          </div>
          <div
            className="w-fit text-center select-none px-4 py-3 font-medium text-xl text-white bg-red-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer transition-all hover:scale-105 mr-8"
            onClick={() => {
              modalState.onPrimaryClick();
              dispatch(closeModal());
            }}
          >
            {modalState.primaryButton || "Proceed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
