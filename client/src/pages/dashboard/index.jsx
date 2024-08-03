import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div className="text-4xl font-bold text-slate-700 mb-2">
        Welcome Back, {user.name}
      </div>
      <div className="text-xl font-extralight text-slate-700 mb-4">
        You account holds {" "}
        {user.role} rights.
      </div>
    </div>
  );
};

export default Dashboard;
