import React, { useState } from "react";
import { createUser } from "../Apis/users";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = await createUser(formData);
      setUser(user);
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      if (!user) {
        window.alert("User already exists");
      } else {
        localStorage.setItem("userIdGDSC", user.userId);
        navigate("/Events", { state: { user: user } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign-up</h2>
        <form onSubmit={handleSubmit} className="text-black">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-2 bg-grey-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-4 bg-grey-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#0F71F2] p-2 rounded hover:ring-2 ring-offset-2 ring-[#F2A20C]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
