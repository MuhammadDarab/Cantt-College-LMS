import {
  FaHome,
  FaListUl,
  FaDollarSign,
  FaBookOpen,
  FaCalendar,
  FaShieldAlt,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import Modal from "../../components/modal";

export default function Home({ children, selectedTab }) {
  const user = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal(state) {}

  function onAction(action) {}

  useEffect(() => {
    const isDrawerOpenSaved = JSON.parse(localStorage.getItem("isDrawerOpen"));
    if (isDrawerOpenSaved == true || isDrawerOpenSaved == false) {
      setIsDrawerOpen(isDrawerOpenSaved);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1700) {
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(true);
      }
    });
  }, []);
  const navigate = useNavigate();

  let ROUTES = [];
  const COMMON_ROUTES = [
    { label: "Dashboard", icon: <FaHome size={30} /> },
    { label: "Attendance", icon: <FaCalendar size={30} /> },
    { label: "Students", icon: <FaListUl size={30} /> },
  ];
  if (user.role == "principal") {
    ROUTES = [
      ...COMMON_ROUTES,
      { label: "Faculty", icon: <FaBookOpen size={30} /> },
      { label: "Finances", icon: <FaDollarSign size={30} /> },
      { label: "Activity", icon: <FaHistory size={30} /> },
      { label: "Authorization", icon: <FaShieldAlt size={30} /> },
      { label: "Logout", icon: <TbLogout2 size={30} /> },
    ];
  } else if (user.role == "admin") {
    ROUTES = [
      ...COMMON_ROUTES,
      { label: "Faculty", icon: <FaBookOpen size={30} /> },
      { label: "Finances", icon: <FaDollarSign size={30} /> },
      { label: "Logout", icon: <TbLogout2 size={30} /> },
    ];
  } else if (user.role == "teacher") {
    ROUTES = [
      ...COMMON_ROUTES,
      { label: "Logout", icon: <TbLogout2 size={30} /> },
    ];
  }

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        onAction={onAction}
      />
      <div className="flex">
        <div
          className={`p-8 transition-all ${
            isDrawerOpen ? "w-[21%]" : "w-[118px]"
          } min-h-[100vh] bg-blue-900 fixed shadow-xl shadow-gray-600`}
        >
          <div className="p-2 flex items-center justify-center">
            <div
              className="text-white text-xl font-bold border-b-red-400 border-b-2 mb-4 whitespace-nowrap cursor-pointer"
              onClick={() => {
                if (!isDrawerOpen) {
                  if (window.innerWidth > 1700) {
                    setIsDrawerOpen(true);
                    localStorage.setItem("isDrawerOpen", true);
                  }
                }
              }}
            >
              {isDrawerOpen ? "Cantt College For Girls - CMS" : "CMS"}
            </div>
            {isDrawerOpen ? (
              <div className="text-white text-xl font-bold mb-4 ml-4">
                <GiHamburgerMenu
                  className="cursor-pointer"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    localStorage.setItem("isDrawerOpen", false);
                  }}
                  size={30}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-8 flex flex-col h-[85vh]">
            {ROUTES.map((route, index) => (
              <div key={index} className={`relative ${route.label.toLowerCase() == 'logout' ? 'mt-auto' : ''}`}>
                {route.label.toLowerCase() === "activity" ? (
                  <div className="absolute bg-red-600 p-2 rounded-full text-white font-black w-10 h-10 text-center shadow-md -top-2 -rotate-12">
                    3
                  </div>
                ) : (
                  ""
                )}
                <div
                  onClick={() => {
                    if (route.label.toLowerCase() != "logout")
                      navigate("/" + route.label.toLowerCase());
                    else
                      window.location.href =
                        import.meta.env.VITE_BACKEND_APP_URL + "/logout";
                  }}
                  className={`${
                    route.label == "Logout"
                      ? "mt-auto bg-red-400 p-2 hover:p-4 font-bold"
                      : "hover:bg-red-400 hover:p-3 hover:font-bold font-extralight"
                  } p-2 text-xl text-white hover:shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center ${
                    selectedTab === route.label ? "border-red-400" : ""
                  }`}
                >
                  <span>{route.icon}</span>
                  {isDrawerOpen ? (
                    <span className="ml-4">{route.label}</span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`pl-16 pr-16 pb-16 pt-12 w-[100%] ${
            isDrawerOpen ? "ml-[21%]" : "ml-[118px]"
          } bg-gray-100 min-h-[100vh] transition-all`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
