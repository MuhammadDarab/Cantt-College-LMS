import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaPen,
  FaPlus,
  FaReceipt,
  FaSave,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateStudentById } from "../../redux/slices/students";
import { toast } from "../../utils/notify";
import MultiSelectDropdown from "../../components/multiselect-dropdown";
import { checkPropertiesNotNull } from "../../utils/validation";
import html2pdf from "html2pdf.js";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const studentId = window.location.pathname.split("/students/")[1];
  const students = useSelector((state) => state.students);
  const [allowModification, setAllowModification] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const user = useSelector((state) => state.user);

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
    subjects: selectedStudent.subjects,
    fatherCnic: selectedStudent.fatherCnic,
    fatherPhoneNo: selectedStudent.fatherPhoneNo,
    previousBoard: selectedStudent.previousBoard,
    previousAcademicType: selectedStudent.previousAcademicType,
    previousAcademicMarks: selectedStudent.previousAcademicMarks,
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
        <div className="text-4xl text-slate-700 font-bold">
          Personal Information
        </div>
        <br />
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Name: </span>
            <br />
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
            <span className="text-slate-600 font-semibold">Father Name: </span>
            <br />
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
          <span className="text-slate-600 font-semibold">Address: </span>
          <br />
          <input
            disabled={!allowModification}
            placeholder="Enter Address"
            type="text"
            name="address"
            className="border-b-2 border-red-400 w-[42.3rem] outline-none bg-transparent"
            defaultValue={selectedStudent.address}
            onChange={updateFormData}
          />
        </div>
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Enrolled in: </span>
            <br />
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
            <span className="text-slate-600 font-semibold">Roll no: </span>
            <br />
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
        <div className="flex items-end">
          <div>
            <span className="text-slate-600 font-semibold">
              Date of birth:{" "}
            </span>
            <br />
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
          <div className="ml-16">
            <span className="text-slate-600 font-semibold">Subjects: </span>
            <br />
            <MultiSelectDropdown
              onChange={(subjects) => {
                updateFormData({
                  target: {
                    name: "subjects",
                    value: subjects.map((subject) => subject._id),
                  },
                });
              }}
              disabled={!allowModification}
              defaultValue={selectedStudent.subjects}
            />
          </div>
        </div>
        <br />
        <div className="flex">
          <div>
            <div className="text-slate-600 font-semibold">
              {"Father's CNIC: "}
            </div>
            <input
              placeholder="Enter father's CNIC"
              className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
              name="fatherCnic"
              onChange={updateFormData}
              disabled={!allowModification}
              defaultValue={selectedStudent.fatherCnic}
            />
          </div>
          <div className="ml-12">
            <div className="text-slate-600 font-semibold">
              {"Father's Phone Number: "}
            </div>
            <input
              placeholder="Enter father's Phone No"
              className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
              name="fatherPhoneNo"
              onChange={updateFormData}
              disabled={!allowModification}
              defaultValue={selectedStudent.fatherPhoneNo}
            />
          </div>
        </div>
        <br />
        <div className="flex">
          <div>
            <div className="text-slate-600 font-semibold">
              {"Previous Board: "}
            </div>
            {!allowModification ? (
              <input
                placeholder="Enter father's Phone No"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="previousBoard"
                onChange={updateFormData}
                disabled={!allowModification}
                defaultValue={selectedStudent.previousBoard}
              />
            ) : (
              <select
                name="previousBoard"
                className="border-b-2 border-red-400 outline-none bg-transparent"
                onChange={updateFormData}
              >
                <option value="" disabled selected>
                  Please select board
                </option>
                <option
                  value="Federal Board"
                  selected={selectedStudent.previousBoard == "Federal Board"}
                >
                  Federal Board
                </option>
                <option
                  value="Pindi Board"
                  selected={selectedStudent.previousBoard == "Pindi Board"}
                >
                  Pindi Board
                </option>
                <option
                  value="Others"
                  selected={selectedStudent.previousBoard == "Others"}
                >
                  Others
                </option>
              </select>
            )}
          </div>
          <div className="ml-12">
            <div className="text-slate-600 font-semibold">
              {"Previous Academic Type: "}
            </div>
            {!allowModification ? (
              <input
                placeholder="Enter father's Phone No"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                name="previousAcademicType"
                onChange={updateFormData}
                disabled={!allowModification}
                defaultValue={selectedStudent.previousAcademicType}
              />
            ) : (
              <select
                name="previousAcademicType"
                className="border-b-2 border-red-400 outline-none bg-transparent"
                onChange={updateFormData}
              >
                <option value="" disabled selected>
                  Please select board
                </option>
                <option
                  value="FA"
                  selected={selectedStudent.previousAcademicType == "FA"}
                >
                  F.A.
                </option>
                <option
                  value="Matriculation"
                  selected={
                    selectedStudent.previousAcademicType == "Matriculation"
                  }
                >
                  Matriculation
                </option>
              </select>
            )}
          </div>
          <div className="ml-12">
            <div className="text-slate-600 font-semibold">
              {"Previous Academic Marks: "}
            </div>
            <input
              placeholder="Enter Previous Marks here"
              className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
              name="previousAcademicMarks"
              onChange={updateFormData}
              disabled={!allowModification}
              defaultValue={selectedStudent.previousAcademicMarks}
            />
          </div>
        </div>
        <div
          onClick={() => {
            if (!allowModification) {
              setAllowModification(true);
            } else {
              if (
                checkPropertiesNotNull(formData) &&
                (formData.subjects == undefined ||
                  (Array.isArray(formData.subjects) &&
                    formData.subjects.length))
              ) {
                dispatch(
                  updateStudentById({
                    id: selectedStudent._id,
                    fields: formData,
                  })
                ).then(() => {
                  navigate("/students");
                  toast("Student Updated Successfully!");
                });
              } else {
                toast("Please fill all fields");
              }
            }
          }}
          className={`select-none p-4 font-medium text-xl text-white ${
            !allowModification ? "bg-red-400" : "bg-green-500"
          } hover:shadow-lg shadow-xl rounded-xl cursor-pointer transition-all flex items-center hover:scale-105 w-fit mt-12`}
        >
          <span>{!allowModification ? <FaPen /> : <FaSave />}</span>
          <span className="ml-4">
            {!allowModification
              ? "Update Student Info"
              : "Update Student Details"}
          </span>
        </div>
        <br />
        {(user.role == "principal" || user.role == "admin") && (
          <section>
            <hr className="mb-8 mt-4" />
            <div className="text-4xl text-slate-700 font-bold">
              Fee Information:{" "}
            </div>
            <br />
            <div className="flex">
              <div>
                <div className="text-slate-600 font-semibold">
                  Admission Fee:{" "}
                </div>
                <input
                  placeholder="Enter Admission fee"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  name="chargeDetails.admissionFee"
                  onChange={updateFormData}
                  // disabled={!allowModification}
                  // defaultValue={selectedStudent.chargeDetails.admissionFee}
                />
              </div>
              <div className="ml-12">
                <div className="text-slate-600 font-semibold">Tuiton Fee: </div>
                <input
                  placeholder="Enter Tuiton fee"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  name="chargeDetails.tuitonFee"
                  onChange={updateFormData}
                  // disabled={!allowModification}
                  // defaultValue={selectedStudent.chargeDetails.tuitonFee}
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
                  // disabled={!allowModification}
                  // defaultValue={selectedStudent.chargeDetails.annualCharges}
                />
              </div>
              <div className="ml-12">
                <div className="text-slate-600 font-semibold">Fine: </div>
                <input
                  placeholder="Enter Fine (Optional)"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  name="chargeDetails.fine"
                  onChange={updateFormData}
                  // disabled={!allowModification}
                  // defaultValue={selectedStudent.chargeDetails.fine}
                />
              </div>
            </div>
            <section className="flex">
              <div
                onClick={() => {}}
                className={`select-none p-4 font-medium text-xl text-white bg-red-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit mt-12 mr-8`}
              >
                <span>
                  <FaPen />
                </span>
                <span className="ml-4">Update Fee Information</span>
              </div>
              <div
                onClick={async () => {
                  try {
                    const BOY_NAME = "Faizan Ali";
                    const response = await fetch("/voucher-template.html"); // Path to your HTML file
                    let htmlContent = await response.text();

                    htmlContent = htmlContent.replace("<NAME_HERE>", BOY_NAME);

                    const options = {
                      filename: `downloaded-${BOY_NAME.replaceAll(
                        " ",
                        "-"
                      )}.pdf`,

                      image: { type: "jpeg", quality: 1 },
                      // html2canvas: { scale: 2 },
                      jsPDF: {
                        unit: "in",
                        orientation: "landscape",
                        format: [12, 24],
                      }, // A4 landscape, one page wide
                    };

                    html2pdf()
                      .set({
                        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
                      })
                      .from(htmlContent)
                      .set(options)
                      .save();
                  } catch (error) {
                    console.error("Error fetching HTML content:", error);
                  }
                }}
                className={`select-none p-4 font-medium text-xl text-white bg-red-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit mt-12 mr-8`}
              >
                <span>
                  <FaReceipt />
                </span>
                <span className="ml-4">Generate Fee Voucher</span>
              </div>
              <div
                onClick={() => {}}
                className={`select-none p-4 font-medium text-xl text-white bg-green-500 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit mt-12`}
              >
                <span>
                  <FaCheckCircle />
                </span>
                <span className="ml-4">Mark as Submitted</span>
              </div>
            </section>
          </section>
        )}
      </div>
    </>
  );
};

export default StudentDetails;
