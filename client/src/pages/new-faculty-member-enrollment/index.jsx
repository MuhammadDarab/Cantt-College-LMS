import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "../../utils/notify";
import { checkPropertiesNotNull } from "../../utils/validation";
import { admitFacultyMember } from "../../redux/slices/faculty";

const NewFacultyMemberEnrollment = () => {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    telephone: "",
    dateOfJoining: "",
    category: "",
    salary: "",
    contractType: "",
  });

  const updateFormData = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div className="text-4xl font-bold text-slate-700 mb-2">
          Enroll a new faculty member
        </div>
        <div className="text-sm font-extralight text-slate-700 mb-4">
          After adding details and confirming the enrollment the faculty
          <br /> member will be shown on the faculty tab.
        </div>
      </div>
      <div className="font-light text-slate-700 p-12 rounded-xl bg-white shadow-gray-300 shadow-xl text-2xl">
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Name: </span>
            <br />
            <input
              placeholder="Enter Name"
              type="text"
              name="name"
              id=""
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            />
          </div>
          <div className="ml-12">
            <span className="text-slate-600 font-semibold">CNIC: </span>
            <br />
            <input
              placeholder="Enter CNIC"
              name="cnic"
              type="text"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Category: </span>
            <br />
            <select
              name="category"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            >
              <option value="" disabled selected>
                Select category
              </option>
              <option value="Teaching">Teaching</option>
              <option value="Non-teaching">Non-teaching</option>
            </select>
          </div>
          <div className="ml-12">
            <span className="text-slate-600 font-semibold">Telephone: </span>
            <br />
            <input
              placeholder="Enter Telephone"
              type="number"
              className="border-b-2 border-red-400 outline-none"
              name="telephone"
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="mb-8 flex">
          <div>
            <span className="text-slate-600 font-semibold">
              Date of Joining:{" "}
            </span>
            <br />
            <input
              placeholder="Enter Student's Date of birth"
              type="date"
              className="border-b-2 border-red-400 outline-none mt-[2px]"
              name="dateOfJoining"
              onChange={updateFormData}
            />
          </div>
          <div className="ml-20">
            <div className="text-slate-600 font-semibold">{"Salary: "}</div>
            <input
              placeholder="Enter salary"
              className="border-b-2 border-red-400 outline-none mt-[2px]"
              name="salary"
              onChange={updateFormData}
            />
          </div>
          <br />
        </div>
        <div className="text-slate-600 font-semibold">{"Contract Type: "}</div>
        <select
          name="contractType"
          className="border-b-2 border-red-400 outline-none"
          onChange={updateFormData}
        >
          <option value="" disabled selected>
            Select contract type
          </option>
          <option value="Permanent">Permanent</option>
          <option value="Visiting">Visiting</option>
        </select>
        <div
          className="select-none p-4 font-medium text-xl text-white bg-green-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit ml-auto"
          onClick={() => {
            if (checkPropertiesNotNull(formData)) {
              dispatch(admitFacultyMember(formData)).then(() => {
                navigate("/faculty");
                toast("Faculty Member Enrolled Successfully!");
              });
            } else {
              toast("Please fill all fields!");
            }
          }}
        >
          <span>
            <FaSave />
          </span>
          <span className="ml-4">Confirm Enrollment</span>
        </div>
      </div>
    </>
  );
};

export default NewFacultyMemberEnrollment;
