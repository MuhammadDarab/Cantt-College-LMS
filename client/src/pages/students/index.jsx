import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();
  const students = useSelector((state) => state.students);
  const user = useSelector((state) => state.user);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

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
        {user.role == "principal" ? (
          <div
            className="select-none p-4 font-medium text-xl text-white bg-red-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105"
            onClick={() => navigate("/students/enroll-new")}
          >
            <span>
              <FaPlus />
            </span>
            <span className="ml-4">Enroll Student</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="p-12 rounded-xl bg-white shadow-gray-300 shadow-xl transition-all">
        <div className="flex justify-between py-4">
          <input
            type="text"
            className="border-b-2 border-red-400 outline-none"
            placeholder="Search Anything.."
            onChange={(ev) =>
              setFilteredStudents(
                students.filter((student) => {
                  if (ev.target.value.trim() == "") return true;
                  const specifcItems =
                    student.studentName +
                    "\u00A0" +
                    student.fatherName +
                    "\u00A0" +
                    student.dateOfBirth +
                    "\u00A0" +
                    student.enrolledIn +
                    "\u00A0" +
                    student.rollNo +
                    "\u00A0" +
                    student.subjects.map((item) => item.name).join("\u00A0");
                  return specifcItems
                    .toUpperCase()
                    .includes(ev.target.value.toUpperCase());
                })
              )
            }
          />
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {filteredStudents?.length > 0 ? (
            filteredStudents?.map((student, index) => (
              <li
                key={index}
                onClick={() => navigate("/students/" + student._id)}
                className="cursor-pointer select-none group flex justify-between gap-x-6 py-5 hover:shadow-xl px-4 transition-all hover:scale-105 hover:bg-red-400 hover:text-white rounded-xl shadow-xl text-slate-700"
              >
                <div key={index} className="rounded-lg p-3 w-[100%]">
                  <h3 className="text-xl font-semibold mb-2">
                    {student.studentName}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p>
                        <span className="font-semibold">
                          {"Father's Name:"}
                        </span>{" "}
                        {student.fatherName}
                      </p>
                      <p>
                        <span className="font-semibold">Roll No:</span>{" "}
                        {student.rollNo}
                      </p>
                      <p>
                        <span className="font-semibold">Date of Birth:</span>{" "}
                        {student.dateOfBirth}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Class:</span>{" "}
                        {student.enrolledIn}
                      </p>
                      <p>
                        <span className="font-semibold">Subjects:</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {student.subjects.map((subject) => (
                          <span
                            key={subject._id}
                            className="inline-block bg-red-200 text-red-800 px-2 py-1 rounded-md text-sm mr-2 mb-2 group-hover:bg-gray-200"
                          >
                            {subject.name}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  {(user.role == "principal" || user.role == "admin") && (
                    <>
                      <hr />
                      <div className="group-hover:text-white mt-2 text-xl font-semibold">
                        Fee Information:
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-green-500 font-semibold group-hover:text-white text-3xl">
                          Fee Status: Paid
                        </span>
                        <FaCheckCircle
                          className="text-green-500 ml-2 group-hover:text-white"
                          size={30}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-slate-600 font-medium group-hover:text-white">
                          Submitted On: 12th May, 2024
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-slate-600 font-medium group-hover:text-white">
                          Submitted From: IBAN - PK0024556889123
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <div className="text-center">
              <div className="text-xl font-bold text-slate-600">
                Oops - No records found
              </div>
              <div className="text-sm font-light text-slate-600">
                Try adding a student by clicking on the enroll student button
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
