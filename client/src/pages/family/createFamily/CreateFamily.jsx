import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateFamily.scss";
function CreateFamily({ setShowNav }) {
  const navigate = useNavigate();
  const { user, createFamily, message, reset, error } = useContext(AuthContext);
  setShowNav(true);
  const [familyName, setFamilyName] = useState("");

  // const handleAddMember = () => {
  //   setMembers([...members, { email: "", idNumber: "" }]);
  // };
  // const handleMemberChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const newMembers = [...members];
  //   newMembers[index][name] = value;
  //   setMembers(newMembers);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const familyData = {
      parent: user?._id,
      familyName,
      // member,
    };
    console.log({ familyData });
    createFamily(familyData);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      reset();
      navigate("/profile");
    }
    if (error) {
      toast.error(error);
      navigate("/profile");
      reset();
    }
  }, [message, error]);

  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);
  return (
    <div className="page createFamily">
      <div className="container">
        <form>
          <div className="item">
            <input
              type="text"
              placeholder="family name"
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
        </form>
        {/* <button type="button" onClick={handleAddMember}>
          Add Member
        </button> */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="main-btn submit"
          disabled={familyName === ""}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateFamily;
