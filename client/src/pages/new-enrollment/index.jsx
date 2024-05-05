import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { admitStudent } from "../../redux/slices/students";
// import { createStudent } from "../../service";

const NewEnrollment = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    address: '',
    rollNo: '',
    enrolledIn: '',
    dateOfBirth: new Date(),
  });

  const updateFormData = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div className="text-4xl font-bold text-slate-700 mb-2">
          Enroll a new student
        </div>
        <div className="text-sm font-extralight text-slate-700 mb-4">
          After adding details and confirming the enrollment <br /> the
          student will be shown on the students tab.
        </div>
      </div>
      <div className="font-light text-slate-700 p-12 rounded-xl bg-white shadow-gray-300 shadow-xl text-2xl">
        <div className="flex mb-8">
          <div>
            Name: <br />
            <input
              placeholder="Enter Student Name"
              type="text"
              name="studentName"
              id=""
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            />
          </div>
          <div className="ml-12">
            Father Name: <br />
            <input
              placeholder="Enter Father's Name"
              name="fatherName"
              type="text"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="mb-8">
          Address: <br />
          <input
            placeholder="Enter Address"
            type="text"
            name="address"
            className="border-b-2 border-red-400 w-[39.5rem] outline-none"
            onChange={updateFormData}
          />
        </div>
        <div className="flex mb-8">
          <div>
            Enrolled in: <br />
            <select name="enrolledIn" className="border-b-2 border-red-400 outline-none" onChange={updateFormData}>
              <option value="" disabled selected>
                Please select batch
              </option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
            </select>
          </div>
          <div className="ml-12">
            Roll no: <br />
            <input
              placeholder="Enter Student's Roll no"
              type="number"
              className="border-b-2 border-red-400 outline-none"
              name="rollNo"
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="mb-8">
          Date of birth: <br />
          <input
            placeholder="Enter Student's Date of birth"
            type="date"
            className="border-b-2 border-red-400 outline-none"
            name="dateOfBirth"
            onChange={updateFormData}
          />
        </div>
        <div className="select-none p-4 font-medium text-xl text-white bg-green-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit ml-auto" onClick={() => {
          dispatch(admitStudent(formData)).then(() => navigate('/students'));
        }}>
        <span>
          <FaSave />
        </span>
        <span className="ml-4">Confirm Enrollment</span>
      </div>
      </div>
    </>
  );
};

export default NewEnrollment;
