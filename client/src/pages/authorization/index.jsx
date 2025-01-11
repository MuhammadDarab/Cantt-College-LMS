import { useEffect, useState } from "react";
import { FaArchive, FaEdit, FaSave } from "react-icons/fa";
import { displayModal } from "../../utils/modal";
import { toast } from "../../utils/notify";
import { useDispatch, useSelector } from "react-redux";
import {
  authorizeUserAsMember,
  removeAuthorizedMembers,
} from "../../redux/slices/members";
import { useNavigate } from "react-router";
import JSConfetti from "js-confetti";

const Authorization = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });

  const [celebrations, setCelebrations] = useState(null);
  useEffect(() => {
    if (!celebrations) {
      setCelebrations(new JSConfetti());
    }
  }, []);

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-slate-700 mb-2">
            Authorize Faculty Members
          </div>
          <div className="text-sm font-extralight text-slate-700 mb-6">
            If any user wants to acces this portal, a principal needs to allow
            them first!
            <br />
            Once added, They are able to access the application with the given
            role!
          </div>
        </div>
      </div>
      <div className="p-12 rounded-xl bg-white shadow-gray-300 shadow-xl transition-all">
        <div className="flex text-xl mb-8">
          <div>
            <span className="text-slate-600 font-semibold">Email: </span>
            <br />
            <input
              name="rollNo"
              placeholder="Enter User's Email Address."
              type="email"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              onChange={(ev) =>
                setFormData({ ...formData, email: ev.target.value })
              }
            />
          </div>
          <div className="ml-12">
            <span className="text-slate-600 font-semibold">Role: </span>
            <br />
            <select
              name="edIn"
              className="border-b-2 border-red-400 outline-none bg-transparent"
              onChange={(ev) =>
                setFormData({ ...formData, role: ev.target.value })
              }
            >
              <option value="" disabled hidden selected>
                Select {"User's"} Role
              </option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="principal">Principal</option>
            </select>
          </div>
          <div className="ml-auto">
            <div
              className={`select-none p-4 font-medium text-xl text-white ${isButtonLoading ? 'bg-gray-400' : 'bg-green-400'} hover:shadow-lg shadow-xl rounded-xl cursor-pointer transition-all flex items-center hover:scale-105`}
              onClick={() => {
                if (formData.email?.trim() && formData.role?.trim() && isButtonLoading == false) {
                  setIsButtonLoading(true);
                  toast("Saving..");
                  dispatch(authorizeUserAsMember(formData)).then(() => {
                    navigate("/authorization");
                    celebrations.addConfetti();
                    toast("Member Authoirzed Successfully!");
                    setIsButtonLoading(false);
                  });
                } else {
                  toast("Please fill all fields");
                }
              }}
            >
              <span>
                <FaSave />
              </span>
              <span className="ml-4">Authorize User</span>
            </div>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {members?.length > 0 ? (
            members?.map((member, index) => (
              <li
                key={index}
                className="cursor-pointer select-none group flex justify-between gap-x-6 py-5 hover:shadow-xl px-4 transition-all hover:scale-105 hover:bg-red-400 hover:text-white rounded-xl shadow-xl text-slate-700"
              >
                <div key={index} className="rounded-lg p-3 w-[100%] text-xl">
                  <p>
                    <span className="font-semibold">Email:</span> {member.email}
                  </p>
                  <p>
                    <span className="font-semibold">Role:</span> {member.role}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-400 px-4 py-3 text-white rounded-md shadow-md transition-all hover:scale-110 mr-2">
                    <FaEdit size={20} />
                  </div>
                  <div
                    className="bg-red-400 px-4 py-3 text-white rounded-md shadow-md group-hover:bg-white  group-hover:text-red-400 transition-all hover:scale-110"
                    onClick={async (event) => {
                      event.stopPropagation();
                      const result = await displayModal({
                        title:
                          "Are you sure you want to remove authroization from this member?",
                        subTitle:
                          "You will need to add them again once removed, are you sure you want to proceed with this action?",
                        primaryButton: "Accept",
                        secondaryButton: "Cancel",
                      });
                      if (result === "accept") {
                        // Handle account delete.
                        toast("Account archived Successfully!");
                        dispatch(
                          removeAuthorizedMembers({ email: member.email })
                        );
                      }
                    }}
                  >
                    <FaArchive size={20} />
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
};

export default Authorization;
