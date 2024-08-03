import { MdError } from "react-icons/md";
import { useNavigate } from "react-router";

const NotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-blue-900 flex items-center justify-center text-center">
      <div>
        <MdError size={200} className="mx-auto text-white" />
        <h1 className="text-3xl lg:text-6xl text-white font-black">
          Sorry, but you are not authorized
        </h1>
        <div className="text-xl lg:text-3xl text-white mt-4 font-extralight">
          Contact the administraton and ask them to invite you first!
        </div>
        <div
          className="text-sm lg:text-xl text-white mt-8 font-medium px-4 py-2 bg-red-400 w-fit mx-auto rounded-xl hover:scale-110 shadow-md transition-all cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Retry
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
