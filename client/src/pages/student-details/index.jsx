import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateStudentById } from "../../redux/slices/students";
import dayjs from 'dayjs';

const StudentDetails = () => {
  const dispatch = useDispatch();
  const studentId = window.location.pathname.split("/students/")[1];
  const students = useSelector((state) => state.students);
  const [allowModification, setAllowModification] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (students.length) {
      setSelectedStudent(students.find((student) => student._id === studentId));
    }
  }, [students]);

  const [formData, setFormData] = useState({
    studentName: selectedStudent.studentName,
    fatherName: selectedStudent.fatherName,
    address: selectedStudent.address,
    rollNo: selectedStudent.rollNo,
    enrolledIn: selectedStudent.enrolledIn,
    dateOfBirth: selectedStudent.dateOfBirth,
  });

  const updateFormData = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <div className="text-4xl font-bold text-slate-700 mb-2">
          {!allowModification ? "Student Details" : "Update Student"}
        </div>
        <div className="text-sm font-extralight text-slate-700 mb-4">
          {!allowModification
            ? "To see the full list of students, you may navigate \nto the students tab!"
            : "Please update the details and press \nupdate once you are done!"}
        </div>
      </div>
      <div className="font-light text-slate-700 p-12 rounded-xl bg-white shadow-gray-300 shadow-xl text-2xl">
        <div className="flex mb-8">
          <div>
            Name: <br />
            <input
              disabled={!allowModification}
              placeholder="Enter Student Name"
              type="text"
              name="studentName"
              id=""
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedStudent.studentName}
              onChange={updateFormData}
            />
          </div>
          <div className="ml-12">
            Father Name: <br />
            <input
              disabled={!allowModification}
              placeholder="Enter Father's Name"
              type="text"
              name="fatherName"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedStudent.fatherName}
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="mb-8">
          Address: <br />
          <input
            disabled={!allowModification}
            placeholder="Enter Address"
            type="text"
            name="address"
            className="border-b-2 border-red-400 w-[39.5rem] outline-none bg-transparent"
            defaultValue={selectedStudent.address}
            onChange={updateFormData}
          />
        </div>
        <div className="flex mb-8">
          <div>
            Enrolled in: <br />
            {allowModification ? (
              <select
                name="enrolledIn"
                className="border-b-2 border-red-400 outline-none bg-transparent"
                onChange={updateFormData}
              >
                <option
                  selected={selectedStudent.enrolledIn == "First Year"}
                  value="First Year"
                >
                  First Year
                </option>
                <option
                  selected={selectedStudent.enrolledIn == "Second Year"}
                  value="Second Year"
                >
                  Second Year
                </option>
              </select>
            ) : (
              <input
                placeholder="Enrolled in.."
                className="border-b-2 border-red-400 outline-none bg-transparent"
                defaultValue={selectedStudent.enrolledIn}
                disabled
              />
            )}
          </div>
          <div className="ml-12">
            Roll no: <br />
            <input
              name="rollNo"
              disabled={!allowModification}
              placeholder="Enter Student's Roll no"
              type="number"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedStudent.rollNo}
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="mb-8">
          Date of birth: <br />
          <input
            name="dateOfBirth"
            disabled={!allowModification}
            placeholder="Enter Student's Date of birth"
            type="date"
            className="border-b-2 border-red-400 outline-none bg-transparent"
            defaultValue={selectedStudent.dateOfBirth}
            onChange={updateFormData}
          />
        </div>
        <div
          onClick={() => {
            if (!allowModification) {
              setAllowModification(true);
            } else {
              dispatch(
                updateStudentById({
                  id: selectedStudent._id,
                  fields: formData,
                })
              ).then(() => {
                navigate("/students");
              });
            }
          }}
          className={`select-none p-4 font-medium text-xl text-white ${
            !allowModification ? "bg-red-400" : "bg-green-400"
          } hover:shadow-lg shadow-xl ${
            !allowModification
              ? "hover:shadow-red-400 shadow-red-400"
              : "hover:shadow-green-400 hshadow-green-400"
          }  rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit ml-auto`}
        >
          <span>
            <FaPlus />
          </span>
          <span className="ml-4">
            {!allowModification
              ? "Modify Student Details"
              : "Update Student Details"}
          </span>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
