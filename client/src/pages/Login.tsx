import React, { useState } from "react";
import { getUserByMail } from "../Apis/users";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import Google from "../images/google";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formData.email === "") {
      setInputErrors({ ...inputErrors, email: true });
      return;
    }

    if (formData.password === "") {
      setInputErrors({ ...inputErrors, password: true });
      return;
    }

    try {
      const loggedInUser = await getUserByMail(formData);
      setUser(loggedInUser);
      setFormData({
        email: "",
        password: "",
      });
      if (!loggedInUser) {
        <Popup message="Please check your credentials" isVisible={true} />;
        window.alert("Please check your credentials");
      } else {
        localStorage.setItem("userIdGDSC", loggedInUser.userId);
        navigate("/Events", { state: { user: loggedInUser } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGoogleLogin = () => {
  //   const scope = encodeURIComponent("profile email");
  //   const authURL = `http://localhost:8000/auth?scope=${scope}`;
  //   console.log("Authentication URL:", authURL);
  //   window.open(authURL);
  // };

  return (
    <div>
       <h1 className="font-bold text-center text-2xl mt-16">Please Log in to access content</h1>
    <div className="flex mt-16 justify-center"> 
      <div className="p-8 rounded-xl shadow-lg items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="text-black">
          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full p-2 border rounded ${
                inputErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full p-2 border rounded ${
                inputErrors.password ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#0F71F2] p-2 rounded hover:ring-2 ring-offset-2 ring-[#F2A20C]"
          >
            Login
          </button>
          
        </div>
        <p className="cursor-pointer text-[#868686] hover:underline hover:text-[#318C07] pt-5 text-lg">
          New user? ‎ 
            <span
              className="font-bold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </span>
          </p>
      </div>
      {/* <button
        onClick={handleGoogleLogin}
        className="mt-4 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-300 flex gap-3 items-center"
      >
        <Google /> Continue with Google
      </button> */}
      
    </div>
    </div>
  );
};

export default Login;
