import { useNavigate } from "react-router";

const ErrorHandler = () => {
  const navigate = useNavigate()

  return (
    <div
      className="flex items-center w-[100vw] h-[100vh] justify-center text-slate-700 text-3xl font-black bg-gray-100 flex-col"
    >
      <div className="text-8xl border-b-2 border-red-400">404</div>
      <div className="font-extralight text-center mt-4">
        Sorry, unable to find what you
        <br /> are looking for
      </div>
      <div className="cursor-pointer text-lg select-none px-4 py-2 rounded-lg mt-8 bg-red-400 text-white shadow-xl hover:shadow-lg font-extralight hover:scale-105 transition-all" onClick={() => {
        navigate('/dashboard')
      }}>
        Go Back
      </div>
    </div>
  );
};

export default ErrorHandler;
