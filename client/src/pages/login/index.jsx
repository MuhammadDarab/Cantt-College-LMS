import "./login.module.css";

const Login = () => {
  return (
    <div className="login">
      <div className="absolute z-10">
        <div className="text-white text-[92px] font-extrabold mt-48 ml-12">
          <div>Cantt College</div>
          <div className="mt-[-1.5rem]">For Girls</div>
        </div>
        <div className="text-[60px] font-thin ml-12 text-white">
          Management System
        </div>
        <div
          className="transition-all cursor-pointer mt-12 mb-24 shadow-xl flex items-center text-[24px] font-light ml-12 text-[#787878] bg-[#F0F0F0] w-fit px-4 py-2 rounded-xl hover:px-4 hover:py-2"
          onClick={() => {
            window.location.href = "http://localhost:8000/auth/google";
          }}
        >
          <img src="google-logo.png" />
          <span className="ml-2">Continue with Google</span>
        </div>
      </div>
      <img src="login-vector.svg" className="absolute" />
      <img src="login-lines.svg" className="absolute mt-[17.7rem] ml-16" />
      <img src="gradient-overlay.png" className="absolute ml-72 -z-10" />
      <img src="college.png" className="absolute ml-72 -z-20" />
    </div>
  );
};

export default Login;
