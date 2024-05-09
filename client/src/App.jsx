import Home from "./pages/home";
import Students from "./pages/students";
import Faculty from "./pages/faculty";
import ErrorHandler from "./pages/error";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StudentDetails from "./pages/student-details";
import NewEnrollment from "./pages/new-enrollment";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./redux/slices/students";
import { useEffect } from "react";
import { fetchSubjects } from "./redux/slices/subjects";
import { fetchUser } from "./redux/slices/user";
import { fetchFacultyMembers } from "./redux/slices/faculty";
import NewFacultyMemberEnrollment from "./pages/new_faculty_member_enrollment";
import FacultyDetails from "./pages/faculty-details";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchStudents());
    dispatch(fetchFacultyMembers());
    dispatch(fetchSubjects());
  }, []);

  let RoleBasedRoutes = <></>;

  if (loggedInUser && loggedInUser.role == "principal") {
    RoleBasedRoutes = (
      <>
        <Route
          path="/dashboard"
          element={<Home selectedTab="Dashboard"><Dashboard /></Home>}
        />
        <Route
          path="/students"
          element={
            <Home selectedTab="Students">
              <Students />
            </Home>
          }
        />
        <Route
          path="/attendance"
          element={
            <Home selectedTab="Attendance">
              Work in progress over here ~Attendance
            </Home>
          }
        />
        <Route
          path="/students/enroll-new"
          element={
            <Home selectedTab="Students">
              <NewEnrollment />
            </Home>
          }
        />
        <Route
          path="/students/*"
          element={
            <Home selectedTab="Students">
              <StudentDetails />
            </Home>
          }
        />
        <Route
          path="/faculty"
          element={
            <Home selectedTab="Faculty">
              <Faculty />
            </Home>
          }
        />
        <Route
          path="/faculty/enroll-new"
          element={
            <Home selectedTab="Faculty">
              <NewFacultyMemberEnrollment />
            </Home>
          }
        />
        <Route
          path="/faculty/*"
          element={
            <Home selectedTab="Faculty">
              <FacultyDetails />
            </Home>
          }
        />
        <Route
          path="/finances"
          element={
            <Home selectedTab="Finances">
              Work in progress over here ~Finances
            </Home>
          }
        />
        <Route
          path="/*"
          element={<Home selectedTab="Dashboard"><Dashboard /></Home>}
        />
        <Route path="*" element={<ErrorHandler />} />
      </>
    );
  } else if (loggedInUser && loggedInUser.role == "teacher") {
    RoleBasedRoutes = (
      <>
        <Route
          path="/dashboard"
          element={<Home selectedTab="Dashboard"><Dashboard /></Home>}
        />
        <Route
          path="/students"
          element={
            <Home selectedTab="Students">
              <Students />
            </Home>
          }
        />
        <Route
          path="/attendance"
          element={
            <Home selectedTab="Attendance">
              Work in progress over here ~Attendance
            </Home>
          }
        />
        <Route
          path="/students/*"
          element={
            <Home selectedTab="Students">
              <StudentDetails />
            </Home>
          }
        />
        <Route
          path="/*"
          element={<Home selectedTab="Dashboard"><Dashboard /></Home>}
        />
        <Route path="*" element={<ErrorHandler />} />
      </>
    );
  } else if (loggedInUser && loggedInUser.role == "admin") {
    RoleBasedRoutes = (
      <>
        <Route
          path="/dashboard"
          element={<Home selectedTab="Dashboard"><Dashboard /></Home>}
        />
        <Route
          path="/students"
          element={
            <Home selectedTab="Students">
              <Students />
            </Home>
          }
        />
        <Route
          path="/attendance"
          element={
            <Home selectedTab="Attendance">
              Work in progress over here ~Attendance
            </Home>
          }
        />
        <Route
          path="/students/enroll-new"
          element={
            <Home selectedTab="Students">
              <NewEnrollment />
            </Home>
          }
        />
        <Route
          path="/students/*"
          element={
            <Home selectedTab="Students">
              <StudentDetails />
            </Home>
          }
        />
        <Route
          path="/faculty"
          element={
            <Home selectedTab="Faculty">
              <Faculty />
            </Home>
          }
        />
        <Route
          path="/faculty/enroll-new"
          element={
            <Home selectedTab="Faculty">
              <NewFacultyMemberEnrollment />
            </Home>
          }
        />
        <Route
          path="/faculty/*"
          element={
            <Home selectedTab="Faculty">
              <FacultyDetails />
            </Home>
          }
        />
        <Route
          path="/finances"
          element={
            <Home selectedTab="Finances">
              Work in progress over here ~Finances
            </Home>
          }
        />
        <Route path="*" element={<ErrorHandler />} />
      </>
    );
  } else {
    RoleBasedRoutes = (
      <>
        <Route path="*" element={<Login />} />
      </>
    );
  }

  return <Routes>{RoleBasedRoutes}</Routes>;
}

export default App;
