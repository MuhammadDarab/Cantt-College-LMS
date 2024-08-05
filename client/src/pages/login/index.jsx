import { useEffect, useState } from "react";
import "./login.module.css";

const Login = () => {
  const [innerWidth, setInnerWidth] = useState(1024);

  useEffect(() => {
    window.onresize = (event) => {
      setInnerWidth(event.target.innerWidth)
    }
  }, []);

  return (
    <div className="login">
      <div 
        className="absolute z-10 justify-center flex text-left lg:justify-normal lg:items-center w-screen h-screen lg:w-[95vw] lg:h-[95vh] lg:bg-none bg-cover bg-no-repeat"
        style={{ backgroundImage: innerWidth < 1024 ? "url('small-tiles-gradient.png')" : "url('')" }}
      >
        <div className="block lg:flex lg:justify-start lg:align-middle lg:items-center lg:flex-col lg:flex-none flex-1 lg:mx-0 mx-12">
          <div className="text-white text-6xl font-extrabold mt-20 lg:mt-48 ml-0 lg:ml-12 lg:leading-relaxed leading-[60px]">
            <div className="lg:mb-0 lg:text-7xl text-[42px] lg:leading-none leading-10 whitespace-nowrap">
              Cantt College
              <img
                src="login-lines.svg"
                width={440}
                className="absolute -z-10 -mt-3 ml-2 hidden lg:block"
              />
            </div>
            <div className="mt-2 lg:mt-[-1.5rem] lg:text-7xl text-[42px] whitespace-nowrap lg:leading-[2.5] leading-10">
              For Girls
            </div>
          </div>
          <div className="mt-4 lg:-mt-4 lg:text-4xl text-xl font-thin ml-0 lg:-ml-28 text-white">
            Management and <br /> tracking system
          </div>
          <div className="mt-6 p-[0.5px] bg-white lg:hidden"></div>
          <div className="w-full flex justify-start whitespace-nowrap ml-0 lg:ml-24">
            {" "}
            <div
              className="lg:ml-1 transition-all cursor-pointer mt-12 mb-24 shadow-xl flex items-center font-light text-[#787878] bg-[#F0F0F0] lg:w-fit w-full px-4 py-2 rounded-xl hover:scale-110 hover:bg-red-400 hover:text-white hover:shadow-md group justify-center lg:justify-normal"
              onClick={() => {
                window.location.href = import.meta.env.VITE_BACKEND_APP_URL + "/auth/google";
              }}
            >
              <img
                src="google-logo.png"
                className="group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:grayscale"
                width={24}
              />
              <span className="ml-2 font-normal">Continue with Google</span>
            </div>
          </div>
        </div>
      </div>
      <img
        src="login-vector.svg"
        className="absolute max-w-screen max-h-screen hidden lg:block"
      />
      <div className="absolute bg-[#1E3A8A] block lg:hidden w-screen h-screen"></div>
      <img
        src="college.png"
        className="absolute -z-20 right-0 max-w-screen max-h-screen hidden lg:block bg-cover"
      />
    </div>
  );
};

export default Login;
