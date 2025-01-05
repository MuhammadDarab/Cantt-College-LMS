import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { admitStudent } from "../../redux/slices/students";
import { toast } from "../../utils/notify";
import { checkPropertiesNotNull } from "../../utils/validation";

const NewEnrollment = () => {
  const categories = useSelector((state) => state.categories);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    address: "",
    rollNo: "",
    enrolledIn: "",
    dateOfBirth: null,
    category: "",
    fatherCnic: "",
    fatherPhoneNo: "",
    previousBoard: "",
    previousAcademicType: "",
    previousAcademicMarks: "",
    chargeDetails: {
      admissionFee: "",
      tuitonFee: "",
      annualCharges: "",
      bankName: "",
      bankNo: "",
    },
  });

  const updateFormData = (ev) => {
    const { name, value } = ev.target;
    const nestedProperties = name.split(".");

    if (nestedProperties.length > 1) {
      const parentProperty = nestedProperties[0];
      const nestedProperty = nestedProperties[1];
      setFormData({
        ...formData,
        [parentProperty]: {
          ...formData[parentProperty],
          [nestedProperty]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
          After adding details and confirming the enrollment <br /> the student
          will be shown on the students tab.
        </div>
      </div>
      <div className="font-light text-slate-700 p-12 rounded-xl bg-white shadow-gray-300 shadow-xl text-2xl">
        <div className="text-4xl text-slate-700 font-bold mb-8">
          Personal Information
        </div>
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Name: </span>
            <br />
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
            <span className="text-slate-600 font-semibold">Father Name: </span>
            <br />
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
          <span className="text-slate-600 font-semibold">Address: </span>
          <br />
          <input
            placeholder="Enter Address"
            type="text"
            name="address"
            className="border-b-2 border-red-400 w-[42.3rem] outline-none"
            onChange={updateFormData}
          />
        </div>
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Enrolled in: </span>
            <br />
            <select
              name="enrolledIn"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            >
              <option value="" disabled selected hidden>
                Please select batch
              </option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </select>
          </div>
          <div className="ml-12">
            <span className="text-slate-600 font-semibold">Roll no: </span>
            <br />
            <input
              placeholder="Enter Student's Roll no"
              type="number"
              className="border-b-2 border-red-400 outline-none"
              name="rollNo"
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="mb-8 flex">
          <div>
            <span className="text-slate-600 font-semibold">
              Date of birth:{" "}
            </span>
            <br />
            <input
              placeholder="Enter Student's Date of birth"
              type="date"
              className="border-b-2 border-red-400 outline-none mt-[2px]"
              name="dateOfBirth"
              onChange={updateFormData}
            />
          </div>
          <div className="ml-20">
            <span className="text-slate-600 font-semibold">Category: </span>
            <br />
            <select
              name="category"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            >
              <option value="" disabled selected hidden>
                Please select subjects
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title} -{" "}
                  {category.subjects
                    .map((subjects) => subjects.shortName)
                    .join(", ")}
                </option>
              ))}
            </select>
          </div>
          <br />
        </div>
        <div className="flex">
          <div>
            <div className="text-slate-600 font-semibold">
              {"Father's CNIC: "}
            </div>
            <input
              placeholder="Enter father's CNIC"
              className="border-b-2 border-red-400 outline-none mt-[2px]"
              name="fatherCnic"
              onChange={updateFormData}
            />
          </div>
          <div className="ml-24">
            <div className="text-slate-600 font-semibold">
              {"Father's Phone Number: "}
            </div>
            <input
              placeholder="Enter father's Phone No"
              className="border-b-2 border-red-400 outline-none mt-[2px]"
              name="fatherPhoneNo"
              onChange={updateFormData}
            />
          </div>
        </div>
        <br />
        <div className="flex">
          <div>
            <div className="text-slate-600 font-semibold">
              {"Previous Board: "}
            </div>
            <select
              name="previousBoard"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            >
              <option value="" disabled selected hidden>
                Please select board
              </option>
              <option value="Federal Board">Federal Board</option>
              <option value="Pindi Board">Pindi Board</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="ml-12">
            <div className="text-slate-600 font-semibold">
              {"Previous Academic Type: "}
            </div>
            <select
              name="previousAcademicType"
              className="border-b-2 border-red-400 outline-none"
              onChange={updateFormData}
            >
              <option value="" disabled selected hidden>
                Please select Type
              </option>
              <option value="FA">F.A.</option>
              <option value="Matriculation">Matriculation</option>
            </select>
          </div>
          <div className="ml-12">
            <div className="text-slate-600 font-semibold">
              {"Previous Academic Marks: "}
            </div>
            <input
              placeholder="Enter Previous Marks here"
              className="border-b-2 border-red-400 outline-none mt-[2px]"
              name="previousAcademicMarks"
              onChange={updateFormData}
            />
          </div>
        </div>
        <br />
        <section>
          <hr className="mb-8 mt-4" />
          <div className="text-4xl text-slate-700 font-bold">
            Fee Information:
          </div>
          <br />
          <div className="flex">
            <div>
              <div className="text-slate-600 font-semibold">Bank Name:</div>
              <input
                placeholder="Enter Bank Name"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="chargeDetails.bankName"
                onChange={updateFormData}
              />
            </div>
            <div className="ml-12">
              <div className="text-slate-600 font-semibold">Bank No: </div>
              <input
                placeholder="Enter Bank Number"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="chargeDetails.bankNo"
                onChange={updateFormData}
              />
            </div>
          </div>{" "}
          <br />
          <div className="flex">
            <div>
              <div className="text-slate-600 font-semibold">Admission Fee:</div>
              <input
                placeholder="Enter Admission fee"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="chargeDetails.admissionFee"
                onChange={updateFormData}
              />
            </div>
            <div className="ml-12">
              <div className="text-slate-600 font-semibold">Tuiton Fee: </div>
              <input
                placeholder="Enter Tuiton fee"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="chargeDetails.tuitonFee"
                onChange={updateFormData}
              />
            </div>
          </div>
          <br />
          <div className="flex">
            <div>
              <div className="text-slate-600 font-semibold">
                Annual Charges:{" "}
              </div>
              <input
                placeholder="Enter Annual Charges"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="chargeDetails.annualCharges"
                onChange={updateFormData}
              />
            </div>
          </div>
        </section>
        <div
          className="select-none p-4 font-medium text-xl text-white bg-green-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit ml-auto"
          onClick={() => {
            if (checkPropertiesNotNull(formData)) {
              dispatch(admitStudent(formData)).then(() => {
                navigate("/students");
                toast("Student Enrolled Successfully!");
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

export default NewEnrollment;
