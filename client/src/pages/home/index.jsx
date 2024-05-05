import {
  FaHome,
  FaListUl,
  FaDollarSign,
  FaBookOpen,
  FaCalendar,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Home({ children, selectedTab }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const ROUTES = [
    { label: "Dashboard", icon: <FaHome size={30} /> },
    { label: "Attendance", icon: <FaCalendar size={30} /> },
    { label: "Students", icon: <FaListUl size={30} /> },
    { label: "Teachers", icon: <FaBookOpen size={30} /> },
    { label: "Finances", icon: <FaDollarSign size={30} /> },
  ];

  return (
    <div className="flex">
      <div
        className={`p-8 transition-all ${
          isDrawerOpen ? "w-[21%]" : "w-[118px]"
        } min-h-[100vh] bg-blue-900 fixed shadow-xl shadow-gray-600`}
      >
        <div className="p-2 flex items-center justify-center">
          <div className="text-white text-xl font-bold border-b-red-400 border-b-2 mb-4 whitespace-nowrap cursor-pointer" onClick={() => {
            if (!isDrawerOpen) {
              setIsDrawerOpen(true);
            }
          }}>
            {isDrawerOpen ? "Cantt College For Girls" : "LMS"}
          </div>
          {isDrawerOpen ? (
            <div className="text-white text-xl font-bold mb-4 ml-4">
              <GiHamburgerMenu
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
                size={30}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-8">
          {ROUTES.map((route, index) => (
            <div
              key={index}
              onClick={() => navigate("/" + route.label.toLowerCase())}
              className={`p-2 font-extralight text-xl text-white hover:bg-red-400 hover:p-3 hover:shadow-xl hover:shadow-[#f87171bf] rounded-xl cursor-pointer mb-6 transition-all flex items-center ${
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
          ))}
        </div>
      </div>
      <div className={`pl-16 pr-16 pb-16 pt-12 w-[100%] ${isDrawerOpen ? 'ml-[21%]' : 'ml-[118px]'} bg-gray-100 min-h-[100vh] transition-all`}>
        {children}
      </div>
    </div>
  );
}
