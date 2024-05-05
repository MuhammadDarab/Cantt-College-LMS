import Home from "./pages/home";
import Students from "./pages/students";
import ErrorHandler from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StudentDetails from "./pages/student-details";
import NewEnrollment from "./pages/new-enrollment";
import { useDispatch } from "react-redux";
import { fetchStudents } from "./redux/slices/students";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchStudents()), []);

  return (
    <Routes>
      <Route path="/" element={<Home selectedTab="Dashboard">Welcome To Dashboard</Home>} />
      <Route path="/dashboard" element={<Home selectedTab="Dashboard">Welcome To Dashboard</Home>} />
      <Route path="/students" element={<Home selectedTab="Students"><Students /></Home>} />
      <Route path="/attendance" element={<Home selectedTab="Attendance">Work in progress over here ~Attendance</Home>} />
      <Route path="/students/enroll-new" element={<Home selectedTab="Students"><NewEnrollment /></Home>} />
      <Route path="/students/*" element={<Home selectedTab="Students"><StudentDetails /></Home>} />
      <Route path="/teachers" element={<Home selectedTab="Teachers">Work in progress over here ~Teachers</Home>} />
      <Route path="/finances" element={<Home selectedTab="Finances">Work in progress over here ~Finances</Home>} />
      <Route path="*" element={<ErrorHandler />} />
    </Routes>
  );
}

export default App;
