import { useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();
  const students = useSelector(state => state.students);
  console.log(students, '<<<----');

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-slate-700 mb-2">
            Students List
          </div>
          <div className="text-sm font-extralight text-slate-700 mb-4">
            To get full details of a student, click on the an <br /> individual
            student block below!
          </div>
        </div>
        <div
          className="select-none p-4 font-medium text-xl text-white bg-red-400 hover:shadow-lg shadow-xl hover:shadow-[#f87171bf] shadow-[#f87171bf] rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105"
          onClick={() => navigate("/students/enroll-new")}
        >
          <span>
            <FaPlus />
          </span>
          <span className="ml-4">Enroll Student</span>
        </div>
        {/* <div>
          <input className="bg-transparent p-2 m-2 border-b-2 border-b-red-400 placeholder:text-red-300 focus:outline-0" type="text" name="" id="" placeholder="Search Student" />
        </div> */}
      </div>
      <div className="p-12 rounded-xl bg-white shadow-gray-300 shadow-xl">
        <ul role="list" className="divide-y divide-gray-100">
          {students?.map((student, index) => (
            <li
              key={index}
              onClick={() => navigate("/students/" + student._id)}
              className="select-none group flex justify-between gap-x-6 py-5 hover:shadow-xl hover:shadow-red-400 px-4 transition-all hover:scale-105 hover:bg-red-400 hover:text-white rounded-xl border-red-400"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-lg font-semibold leading-6 text-slate-700 group-hover:text-white">
                    {student.studentName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-slate-500 group-hover:text-white">
                    {student.fatherName}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end group-hover:text-white">
                <p className="text-2xl font-extralight leading-6 text-slate-600 group-hover:text-white">
                  {student.enrolledIn}
                </p>
                <div className="mt-1">
                  <p className="text-xs leading-5 text-gray-400 group-hover:text-white">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
