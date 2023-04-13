import React, { useContext, useState } from "react";
import axios from "axios";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";

function Register({ setShowNav }) {
  setShowNav(true);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    img: "",
  });
  const { register, error, message } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // Send the POST request to the backend
    try {
      // axios.put(url,body)
      // const { data } = await axios.post(
      //   "http://localhost:3000/api/auth/register",
      //   user
      // );
      // console.log(data);
      register(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          {error && error}
          {message && message}
          <div className="item">
            <label>first name</label>
            <input
              name="firstName"
              type="text"
              placeholder="first name"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>last name</label>
            <input
              name="lastName"
              type="text"
              placeholder="last name"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>email</label>
            <input
              name="email"
              type="text"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>password</label>
            <input
              name="password"
              type="text"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default Register;
