import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Faculty() {
  const navigate = useNavigate();
  const faculty = useSelector((state) => state.faculty);
  const [filteredFaculty, setFilteredFaculty] = useState([]);

  useEffect(() => {
    setFilteredFaculty(faculty);
  }, [faculty]);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-slate-700 mb-2">
            Faculty Members List
          </div>
          <div className="text-sm font-extralight text-slate-700 mb-4">
            To get full details of a faculty member, click on an <br />{" "}
            individual faculty member block below!
          </div>
        </div>
        <div
          className="select-none p-4 font-medium text-xl text-white bg-red-400 hover:shadow-lg shadow-xl rounded-xl cursor-pointer mb-6 transition-all flex items-center hover:scale-105"
          onClick={() => navigate("/faculty/enroll-new")}
        >
          <span>
            <FaPlus />
          </span>
          <span className="ml-4">Enroll Faculty Member</span>
        </div>
      </div>
      <div className="p-12 rounded-xl bg-white shadow-gray-300 shadow-xl transition-all">
        <div className="flex justify-between py-4">
          <input
            type="text"
            className="border-b-2 border-red-400 outline-none"
            placeholder="Search Anything.."
            onChange={(ev) =>
              setFilteredFaculty(
                faculty.filter((member) => {
                  if (ev.target.value.trim() == "") return true;
                  const specifcItems =
                    member.name +
                    "\u00A0" +
                    member.cnic +
                    "\u00A0" +
                    member.telephone +
                    "\u00A0" +
                    member.dateOfJoining +
                    "\u00A0" +
                    member.category +
                    "\u00A0" +
                    member.contractType +
                    "\u00A0" +
                    member.salary + 
                    "\u00A0";
                  return specifcItems
                    .toUpperCase()
                    .includes(ev.target.value.toUpperCase());
                })
              )
            }
          />
          <div className="cursor-pointer text-slate-700">Sort By</div>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {filteredFaculty?.length > 0 ? (
            filteredFaculty?.map((member, index) => (
              <li
                key={index}
                onClick={() => navigate("/faculty/" + member._id)}
                className="cursor-pointer select-none group flex justify-between gap-x-6 py-5 hover:shadow-xl px-4 transition-all hover:scale-105 hover:bg-red-400 hover:text-white rounded-xl shadow-xl text-slate-700"
              >
                <div key={index} className="rounded-lg p-3 w-[100%]">
                  <h3 className="text-xl font-semibold mb-2">
                    {member.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p>
                        <span className="font-semibold">
                          {"Telephone"}
                        </span>{" "}
                        {member.telephone}
                      </p>
                      <p>
                        <span className="font-semibold">CNIC:</span>{" "}
                        {member.cnic}
                      </p>
                      <p>
                        <span className="font-semibold">Date of Joining:</span>{" "}
                        {member.dateOfJoining}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Category:</span>{" "}
                        {member.category}
                      </p>
                      <p>
                        <span className="font-semibold">Contract Type:</span>
                        &nbsp;&nbsp;
                        {member.contractType}
                      </p>
                    </div>
                  </div>
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
