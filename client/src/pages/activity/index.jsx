import { useSelector } from "react-redux";
import ActivityItem from "../../components/activity-item";

const ActivityMonitor = () => {
  const items = useSelector(state => state.activity);
  debugger;
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-slate-700 mb-2">
            Activity Monitor
          </div>
          <div className="text-sm font-extralight text-slate-700 mb-4">
            Any time a user performs an action inside <br />
            the application, it will be listed here!
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-xl p-12 max-h-[46rem] overflow-scroll">
        <div>
          {items && items.length ? (
            items.map((item, index) => (
              <ActivityItem
                {...item}
                isUnreadFromHere={index == 6}
                isFirstItem={index == items.length - 1}
                key={index}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl text-slate-700 font-semibold">
                  There hasn't been any major activity so far to be tracked yet!
                </div>
                <div className="text-slate-700 mt-4">Come back once there's some activity.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityMonitor;
