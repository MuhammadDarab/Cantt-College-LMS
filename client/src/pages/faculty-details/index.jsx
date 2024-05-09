import { useState, useEffect } from "react";
import { FaPen, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "../../utils/notify";
import { checkPropertiesNotNull } from "../../utils/validation";
import { updateFacultyMemberById } from "../../redux/slices/faculty";

const FacultyDetails = () => {
  const dispatch = useDispatch();
  const facultyMemberId = window.location.pathname.split("/faculty/")[1];
  const faculty = useSelector((state) => state.faculty);
  const [allowModification, setAllowModification] = useState(false);
  const [selectedFacultyMember, setSelectedFacultyMember] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (faculty.length) {
      setSelectedFacultyMember(
        faculty.find((member) => member._id === facultyMemberId)
      );
    }
  }, [faculty]);

  const [formData, setFormData] = useState({
    name: selectedFacultyMember.name,
    cnic: selectedFacultyMember.cnic,
    telephone: selectedFacultyMember.telephone,
    dateOfJoining: selectedFacultyMember.dateOfJoining,
    category: selectedFacultyMember.category,
    contractType: selectedFacultyMember.contractType,
    salary: selectedFacultyMember.salary,
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
          {!allowModification ? "Faculty Member Details" : "Update Faculty Member"}
        </div>
        <div className="text-sm font-extralight text-slate-700 mb-4">
          {!allowModification
            ? "To see the full list of faculty members, you may navigate \nto the faculty tab!"
            : "Please update the details and press \nupdate once you are done!"}
        </div>
      </div>
      <div className="font-light text-slate-700 p-12 rounded-xl bg-white shadow-gray-300 shadow-xl text-2xl">
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Name: </span>
            <br />
            <input
              disabled={!allowModification}
              placeholder="Enter Name"
              type="text"
              name="name"
              id=""
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedFacultyMember.name}
              onChange={updateFormData}
            />
          </div>
          <div className="ml-12">
            <span className="text-slate-600 font-semibold">CNIC: </span>
            <br />
            <input
              disabled={!allowModification}
              placeholder="Enter Father's Name"
              type="text"
              name="cnic"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedFacultyMember.cnic}
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="flex mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Category: </span>
            <br />
            {allowModification ? (
              <select
                name="category"
                className="border-b-2 border-red-400 outline-none bg-transparent"
                onChange={updateFormData}
              >
                <option
                  selected={selectedFacultyMember.category == "Teaching"}
                  value="Teaching"
                >
                  Teaching
                </option>
                <option
                  selected={selectedFacultyMember.category == "Non-teaching"}
                  value="Non-teaching"
                >
                  Non-teaching
                </option>
              </select>
            ) : (
              <input
                placeholder="Category.."
                className="border-b-2 border-red-400 outline-none bg-transparent w-40"
                defaultValue={selectedFacultyMember.category}
                disabled
              />
            )}
          </div>
          <div className="ml-12">
            <span className="text-slate-600 font-semibold">Telephone: </span>
            <br />
            <input
              name="telephone"
              disabled={!allowModification}
              placeholder="Enter telephone"
              type="number"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedFacultyMember.telephone}
              onChange={updateFormData}
            />
          </div>
        </div>
        <div className="flex items-end">
          <div>
            <span className="text-slate-600 font-semibold">
              Date of Joining:{" "}
            </span>
            <br />
            <input
              name="dateOfJoining"
              disabled={!allowModification}
              placeholder="Enter Date of Joining"
              type="date"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              defaultValue={selectedFacultyMember.dateOfJoining}
              onChange={updateFormData}
            />
          </div>
          <div className="ml-16">
            <span className="text-slate-600 font-semibold">Salary: </span>
            <br />
            <input
              placeholder="Enter salary"
              className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent"
              name="salary"
              onChange={updateFormData}
              disabled={!allowModification}
              defaultValue={selectedFacultyMember.salary}
            />
          </div>
        </div>
        <br />
        <div className="flex">
          <div>
            <div className="text-slate-600 font-semibold">
              {"Contract Type: "}
            </div>
            {!allowModification ? (
              <input
                placeholder="Contract Type"
                className="border-b-2 border-red-400 outline-none mt-[2px] bg-transparent w-60"
                name="contractType"
                onChange={updateFormData}
                disabled={!allowModification}
                defaultValue={selectedFacultyMember.contractType}
              />
            ) : (
              <select
                name="contractType"
                className="border-b-2 border-red-400 outline-none bg-transparent"
                onChange={updateFormData}
              >
                <option value="" disabled selected>
                  Select contract type
                </option>
                <option
                  value="Permanent"
                  selected={selectedFacultyMember.contractType == "Permanent"}
                >
                  Permanent
                </option>
                <option
                  value="Visiting"
                  selected={selectedFacultyMember.contractType == "Visiting"}
                >
                  Visiting
                </option>
              </select>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            if (!allowModification) {
              setAllowModification(true);
            } else {
              if (checkPropertiesNotNull(formData)) {
                dispatch(
                  updateFacultyMemberById({
                    id: selectedFacultyMember._id,
                    fields: formData,
                  })
                ).then(() => {
                  navigate("/faculty");
                  toast("Faculty Member Updated Successfully!");
                });
              } else {
                toast("Please fill all fields");
              }
            }
          }}
          className={`select-none p-4 font-medium text-xl text-white ${
            !allowModification ? "bg-red-400" : "bg-green-400"
          } hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105 w-fit ml-auto`}
        >
          <span>
            {!allowModification
              ? <FaPen />
              : <FaSave />}
          </span>
          <span className="ml-4">
            {!allowModification
              ? "Edit Record"
              : "Save Changes"}
          </span>
        </div>
      </div>
    </>
  );
};

export default FacultyDetails;
