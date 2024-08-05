import ActivityItem from "../../components/activity-item";

const ActivityMonitor = () => {
  const items = [
    {
      title: "Muhammad Darab added a new student Haseeb Ali",
      createdAt: new Date(2024, 7, 1, 10, 0),
      severity: "LOW",
    },
    {
      title: "Ahmed Qureshi archived faculty member Mr. Farooq",
      createdAt: new Date(2024, 7, 3, 14, 15),
      severity: "MEDIUM",
    },
    {
      title: "Usman Tariq archived faculty member Mr. Yaseen",
      createdAt: new Date(2024, 7, 6, 16, 30),
      severity: "MEDIUM",
    },
    {
      title: "Hamza Khan added a new student Imran Ali",
      createdAt: new Date(2024, 7, 7, 17, 45),
      severity: "LOW",
    },
    {
      title: "Saad Ahmed uploaded results for 3rd year",
      createdAt: new Date(2024, 7, 8, 8, 30),
      severity: "MEDIUM",
    },
    {
      title: "Ali Hassan gave role 'principal' to Muhammad Darab",
      createdAt: new Date(2024, 7, 4, 9, 45),
      severity: "HIGH",
    },
    {
      title: "Ibrahim Shah archived faculty member Mr. Rashid",
      createdAt: new Date(2024, 7, 10, 15, 0),
      severity: "HIGH",
    },
    {
      title: "Muhammad Darab added a new student Haseeb Ali",
      createdAt: new Date(2024, 7, 1, 10, 0),
      severity: "LOW",
    }
  ].reverse();
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
                isUnreadFromHere={index == 2}
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
