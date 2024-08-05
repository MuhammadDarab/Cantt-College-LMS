import Home from "./pages/home";
import Students from "./pages/students";
import Faculty from "./pages/faculty";
import ErrorHandler from "./pages/error-handler";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StudentDetails from "./pages/student-details";
import NewEnrollment from "./pages/new-enrollment";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./redux/slices/students";
import { useEffect, useState } from "react";
import { fetchSubjects } from "./redux/slices/subjects";
import { fetchUser } from "./redux/slices/user";
import { fetchFacultyMembers } from "./redux/slices/faculty";
import NewFacultyMemberEnrollment from "./pages/new-faculty-member-enrollment";
import FacultyDetails from "./pages/faculty-details";
import Login from "./pages/login";
import Loading from "./pages/loading";
import Dashboard from "./pages/dashboard";
import ActivityMonitor from "./pages/activity";
import { fetchCategories } from "./redux/slices/categories";
import NotAuthorized from "./pages/not-authorized";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);
  const [loginState, setLoginState] = useState("loading");
  const LoginComponent = () => loginState == 'loading' ? <Loading /> : <Login />

  useEffect(() => {
    console.log('Login State', loginState);
  }, [loginState]);

  useEffect(() => {
    // Dispatch necessary items here!
    dispatch(fetchUser()).then((userState) => setLoginState(userState.meta.requestStatus));
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchCategories());
    dispatch(fetchFacultyMembers());
  }, []);

  let RoleBasedRoutes = <></>;

  if (loggedInUser && loggedInUser.role == "principal") {
    RoleBasedRoutes = (
      <>
        <Route
          path="/dashboard"
          element={
            <Home selectedTab="Dashboard">
              <Dashboard />
            </Home>
          }
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
          path="/activity"
          element={
            <Home selectedTab="Activity">
              <ActivityMonitor />
            </Home>
          }
        />
        <Route
          path="/authorization"
          element={
            <Home selectedTab="Authorization">
              <b className="text-gray-700">Authorization Tab</b>
              <br />
              <p className="text-gray-700">
                You may add, allow and authorize user over here!
              </p>
            </Home>
          }
        />
        <Route
          path="/*"
          element={
            <Home selectedTab="Dashboard">
              <Dashboard />
            </Home>
          }
        />
        <Route path="*" element={<ErrorHandler />} />
      </>
    );
  } else if (loggedInUser && loggedInUser.role == "teacher") {
    RoleBasedRoutes = (
      <>
        <Route
          path="/dashboard"
          element={
            <Home selectedTab="Dashboard">
              <Dashboard />
            </Home>
          }
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
          element={
            <Home selectedTab="Dashboard">
              <Dashboard />
            </Home>
          }
        />
        <Route path="*" element={<ErrorHandler />} />
      </>
    );
  } else if (loggedInUser && loggedInUser.role == "admin") {
    RoleBasedRoutes = (
      <>
        <Route
          path="/dashboard"
          element={
            <Home selectedTab="Dashboard">
              <Dashboard />
            </Home>
          }
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
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<LoginComponent />} />
      </>
    );
  }

  return <Routes>
    {RoleBasedRoutes}
  </Routes>;
}

export default App;
