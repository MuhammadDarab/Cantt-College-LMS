import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div className="text-4xl font-bold text-slate-700 mb-2">
        Welcome Back, {user.name}
      </div>
      <div className="text-lg font-extralight text-slate-700 mb-4">
        You are currently logged in as{" "}
        {user.role == "admin" ? "an admin" : "a " + user.role}
      </div>
    </div>
  );
};

export default Dashboard;
