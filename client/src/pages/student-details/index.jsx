import { useState, useEffect } from "react";
import { FaCheckCircle, FaPen, FaReceipt, FaSave } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateStudentById } from "../../redux/slices/students";
import { toast } from "../../utils/notify";
import { checkPropertiesNotNull } from "../../utils/validation";
import html2pdf from "html2pdf.js";
import JSConfetti from "js-confetti";
import InfoTip from "../../components/info-tip";
import { AnimatePresence, motion } from "framer-motion";

function getPopulatedVoucher(selectedStudent, htmlContent) {
  htmlContent = htmlContent.replaceAll(
    "--NAME-HERE--",
    selectedStudent.studentName
  );
  htmlContent = htmlContent.replaceAll(
    "--FATHERNAME-HERE--",
    selectedStudent.fatherName
  );
  let classMappings = "";
  if (selectedStudent.enrolledIn.includes("First")) {
    classMappings = "FA - I";
  } else if (selectedStudent.enrolledIn.includes("Second")) {
    classMappings = "FA - II";
  } else if (selectedStudent.enrolledIn.includes("Third")) {
    classMappings = "ADP - I";
  } else if (selectedStudent.enrolledIn.includes("Fourth")) {
    classMappings = "ADP - II";
  }

  classMappings += " " + selectedStudent.category.title;

  htmlContent = htmlContent.replaceAll("--CLASS-HERE--", classMappings);
  htmlContent = htmlContent.replaceAll(
    "--ROLLNO-HERE--",
    selectedStudent.rollNo
  );
  htmlContent = htmlContent.replaceAll(
    "--TUITON-FEE-HERE--",
    selectedStudent.chargeDetails.tuitonFee
  );
  htmlContent = htmlContent.replaceAll(
    "--ADMISSION-FEE-HERE--",
    selectedStudent.chargeDetails.admissionFee
  );
  htmlContent = htmlContent.replaceAll(
    "--ANNUAL-FEE-HERE--",
    selectedStudent.chargeDetails.annualCharges
  );
  htmlContent = htmlContent.replaceAll(
    "--BANKNAME-HERE--",
    selectedStudent.chargeDetails.bankName
  );
  htmlContent = htmlContent.replaceAll(
    "--BANKNO-HERE--",
    selectedStudent.chargeDetails.bankNo
  );
  htmlContent = htmlContent.replaceAll(
    "--TOTAL-HERE--",
    Number(selectedStudent.chargeDetails.tuitonFee) +
      Number(selectedStudent.chargeDetails.admissionFee)
  );
  return htmlContent;
}

const StudentDetails = () => {
  const dispatch = useDispatch();
  const studentId = window.location.pathname.split("/students/")[1];
  const students = useSelector((state) => state.students);
  const [celebrations, setCelebrations] = useState(null);
  const [allowModification, setAllowModification] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [transactionHistoryOpened, setTransactionHistoryOpened] = useState(-1);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (!celebrations) {
      setCelebrations(new JSConfetti());
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (students.length) {
      const studentSelected = students.find(
        (student) => student._id === studentId
      );
      if (studentSelected) {
        setSelectedStudent(studentSelected);
      } else {
        navigate("/students");
      }
    }
  }, [students]);

  const [formData, setFormData] = useState({
    studentName: selectedStudent.studentName,
    fatherName: selectedStudent.fatherName,
    address: selectedStudent.address,
    rollNo: selectedStudent.rollNo,
    enrolledIn: selectedStudent.enrolledIn,
    dateOfBirth: selectedStudent.dateOfBirth,
    subjects: selectedStudent.category,
    fatherCnic: selectedStudent.fatherCnic,
    fatherPhoneNo: selectedStudent.fatherPhoneNo,
    previousBoard: selectedStudent.previousBoard,
    previousAcademicType: selectedStudent.previousAcademicType,
    previousAcademicMarks: selectedStudent.previousAcademicMarks,
    chargeDetails: selectedStudent.chargeDetails,
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
        <div className="flex ml-auto items-center">
          <div className="text-4xl text-slate-700 font-bold flex-1">
            Personal Information
          </div>
          {user.role == "principal" || user.role == "admin" ? (
            <div
              onClick={() => {
                if (!allowModification) {
                  setAllowModification(true);
                  toast("You are now editing the student record..");
                } else {
                  if (
                    checkPropertiesNotNull(formData) &&
                    (formData.category == undefined ||
                      (Array.isArray(formData.category) &&
                        formData.category.length))
                  ) {
                    toast("Saving..");
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
              } hover:shadow-lg shadow-xl rounded-xl cursor-pointer transition-all flex items-center hover:scale-105 w-fit`}
            >
              <span>{!allowModification ? <FaPen /> : <FaSave />}</span>
              <span className="ml-4">
                {" "}
                {!allowModification
                  ? "Update Student Info"
                  : "Update Student Details"}
              </span>
            </div>
          ) : (
            <></>
          )}
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
                <option
                  selected={selectedStudent.enrolledIn == "Third Year"}
                  value="Third Year"
                >
                  Third Year
                </option>
                <option
                  selected={selectedStudent.enrolledIn == "Fourth Year"}
                  value="Fourth Year"
                >
                  Fourth Year
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
                <option
                  key={category._id}
                  value={category._id}
                  selected={selectedStudent.category?._id == category._id}
                >
                  {category.title} -{" "}
                  {category.subjects
                    .map((subjects) => subjects.shortName)
                    .join(", ")}
                </option>
              ))}
            </select>
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
                <option value="" disabled selected hidden>
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
                <option value="" disabled selected hidden>
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
                <div className="text-slate-600 font-semibold">Bank Name: </div>
                <input
                  placeholder="Enter Bank Name"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  name="chargeDetails.bankName"
                  onChange={updateFormData}
                  disabled={!allowModification}
                  defaultValue={selectedStudent.chargeDetails?.bankName ?? ""}
                />
              </div>
              <div className="ml-12">
                <div className="text-slate-600 font-semibold">Bank No: </div>
                <input
                  placeholder="Enter Bank No here"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  name="chargeDetails.bankNo"
                  onChange={updateFormData}
                  disabled={!allowModification}
                  defaultValue={selectedStudent.chargeDetails?.bankNo ?? ""}
                />
              </div>
            </div>
            <br />
            <div className="flex">
              <div>
                <div className="text-slate-600 font-semibold flex items-center">
                  <div className="mr-2">Tuiton Fee: </div>
                  <InfoTip text="This field is only allowed to be updated at the start of the year before the student submits any fee of that year" />
                </div>
                <input
                  placeholder="Enter Tuiton Fee:"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  // name="chargeDetails.bankName"
                  onChange={updateFormData}
                  disabled={!allowModification}
                  // defaultValue={selectedStudent.chargeDetails?.bankName ?? ""}
                />
              </div>
              <div className="ml-12">
                <div className="text-slate-600 font-semibold flex items-center">
                  <div className="mr-2">Annual Charges: </div>
                  <InfoTip text="This field is only allowed to be updated at the start of the year before the student submits any fee of that year" />
                </div>
                <input
                  placeholder="Enter Annual Charges here"
                  className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                  // name="chargeDetails.bankNo"
                  onChange={updateFormData}
                  disabled={!allowModification}
                  // defaultValue={selectedStudent.chargeDetails?.bankNo ?? ""}
                />
              </div>
            </div>
            <br />
            <div>
              <div className="text-slate-600 font-semibold flex items-center">
                <div className="mr-2">Admission Fee: </div>
                <InfoTip text="This field is only allowed to be updated at the start of the year before the student submits any fee of that year" />
              </div>
              <input
                placeholder="Enter Admission fee here"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
                // name=""
                onChange={updateFormData}
                disabled={!allowModification}
                // defaultValue={}
              />
            </div>
            <div className="text-slate-600 font-bold mt-10 mb-2">
              Transaction History
            </div>
            {selectedStudent.chargeDetails?.transactionHistory?.map(
              (item, index) => (
                <section
                  key={index}
                  onClick={() => {
                    if (transactionHistoryOpened == index) {
                      setTransactionHistoryOpened(-1);
                      return;
                    }
                    setTransactionHistoryOpened(index);
                  }}
                  className="cursor-pointer"
                >
                  <div
                    className={`border-red-400 transition-all ${
                      transactionHistoryOpened === index
                        ? "p-4 border-2 border-slate-500 my-2"
                        : "border-b-2 p-2 hover:bg-red-400 group"
                    }`}
                  >
                    <div className="flex items-center">
                      {transactionHistoryOpened === index ? (
                        <RiArrowDropDownLine
                          size={40}
                          className="text-slate-600 group-hover:text-white"
                        />
                      ) : (
                        <RiArrowDropRightLine
                          size={40}
                          className="text-slate-600 group-hover:text-white"
                        />
                      )}
                      <div className="font-medium text-slate-600 my-4 group-hover:text-white">
                        {item.month}'s Transaction History
                      </div>
                    </div>
                    <AnimatePresence>
                      {transactionHistoryOpened === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
                        >
                          <table className="w-full">
                            <thead className="bg-red-400 text-white font-bold">
                              <tr className="border-b">
                                <th className="text-left p-4">
                                  Submission Date
                                </th>
                                <th className="text-right p-4">
                                  Payment Amount
                                </th>
                                <th className="text-right p-4 w-fit">
                                  Remaining
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {item?.installments?.map((installment, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="border-b-2 text-slate-600 justify-between border-red-400"
                                  >
                                    <td className="text-left p-4 font-semibold">
                                      {installment.datePaid +
                                        " " +
                                        item.month +
                                        ", " +
                                        item.year}
                                    </td>
                                    <td className="text-right p-4">
                                      {installment.paidAmount}
                                    </td>
                                    <td className="text-right p-4 w-fit">
                                      {installment.remaining}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className="m-8">
                            <div className="flex justify-end text-slate-600 font-semibold">
                              <div className="flex flex-col mr-12">
                                <div>Total Paid:</div>
                                <div>April Remaining Charges:</div>
                                <div>April Payment status:</div>
                              </div>
                              <div className="flex flex-col text-left">
                                <div className="text-green-600">
                                  {item.totalPaid}/- PKR
                                </div>
                                <div className="text-red-600">
                                  {Number(item.totalPaid) -
                                    Number(item.totalDue)}
                                  /- PKR
                                </div>
                                <div
                                  className={`text-${
                                    item.status == "Paid"
                                      ? "green"
                                      : item.status == "Partial"
                                      ? "yellow"
                                      : "red"
                                  }-500 font-bold`}
                                >
                                  {item.status}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="p-[1px] text-red-400 bg-red-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              )
            )}
            <section className="flex">
              <div
                onClick={async () => {
                  if (allowModification) return;
                  try {
                    const populatedVoucherHTML = getPopulatedVoucher(
                      selectedStudent,
                      await (await fetch("/voucher-template.html")).text()
                    );
                    const options = {
                      filename: `fee-voucher-${selectedStudent.rollNo}.pdf`,
                      image: { type: "jpeg", quality: 1 },
                      jsPDF: {
                        unit: "in",
                        orientation: "landscape",
                        format: [10.69, 16],
                      },
                    };

                    html2pdf()
                      .set({
                        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
                      })
                      .from(populatedVoucherHTML)
                      .set(options)
                      .save();
                  } catch (error) {
                    console.error("Error fetching HTML content:", error);
                  }
                }}
                className={`select-none p-4 font-medium text-xl text-white ${
                  !allowModification
                    ? "bg-red-400 hover:scale-105 hover:shadow-lg"
                    : "bg-gray-600"
                } shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center w-fit mt-12 mr-8`}
              >
                <span>
                  <FaReceipt />
                </span>
                <span className="ml-4">Generate Fee Voucher</span>
              </div>
              <div
                onClick={() => {
                  if (allowModification) return;
                  dispatch(
                    updateStudentById({
                      id: selectedStudent._id,
                      fields: {
                        ...selectedStudent,
                        chargeDetails: {
                          ...selectedStudent.chargeDetails,
                          areDuesCleared: true,
                        },
                      },
                    })
                  ).then(() => {
                    navigate("/students");
                    toast("Student dues submitted!");
                    celebrations.addConfetti();
                  });
                }}
                className={`select-none p-4 font-medium text-xl text-white ${
                  !allowModification
                    ? "bg-green-500 hover:shadow-lg hover:scale-105"
                    : "bg-gray-600"
                } shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center w-fit mt-12`}
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
