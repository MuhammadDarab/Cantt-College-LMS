const ActivityItem = ({
  title,
  createdAt,
  severity,
  isUnreadFromHere = false,
  isFirstItem = false,
}) => {

  const breakOnSpace = title.split(' ');
  const ActivistsName = breakOnSpace[0] + " " + breakOnSpace[1] + " ";
  const restOfTitle = breakOnSpace.slice(2).join(' ');

  return (
    <>
      <div className="flex">
        <div
          className={`rounded-full w-14 h-14 ml-1 mt-[2px] bg-cover bg-center ${
            severity == "LOW"
              ? "bg-green-500"
              : severity == "MEDIUM"
              ? "bg-yellow-400"
              : severity == "HIGH" ? 
              "bg-red-500" : "bg-black"
          }`}
        ></div>
        <div className="ml-4">
          <div className="text-xl text-gray-600">
            <span className="font-semibold">{ActivistsName}</span>
            <span>{restOfTitle}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {createdAt.toDateString()} {createdAt.toLocaleTimeString()}
          </div>
        </div>
      </div>
      {!isFirstItem ? (
        !isUnreadFromHere ? (
          <>
            <div className="py-6 bg-gray-300 w-[2px] ml-[30px] my-3"></div>
          </>
        ) : (
          <>
            <div className="flex items-center my-3">
              <div className="p-[1px] bg-red-500 flex-1"></div>
              <div className="text-red-500 text-lg mx-8">New activity</div>
              <div className="p-[1px] bg-red-500 flex-1"></div>
            </div>
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default ActivityItem;
