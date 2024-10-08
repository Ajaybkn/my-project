import React, { useState } from "react";
import * as Yup from "yup";
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password  is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must be same")
      .required("Password is required"),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("form submitted successfully");
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setError(newError);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="text-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border-2 border-solid p-4">
        <h2 className="text-2xl text-center block bg-blue-400 p-2">Sign Up</h2>
        <br />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <label className="w-full max-w-xs">
            First Name
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="focus:bg-gray-200 block mt-1 border-2 border-solid border-sky-500 w-full p-2"
            />
            {error.firstName && (
              <div className="text-red-600 text-sm">{error.firstName}</div>
            )}
          </label>
          <label className="w-full max-w-xs">
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="focus:bg-gray-200 block mt-1 border-2 border-solid border-sky-500 w-full p-2"
            />
            <div className="text-red-600 text-sm">{error.lastName}</div>
          </label>
          <label className="w-full max-w-xs">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="focus:bg-gray-200 block mt-1 border-2 border-solid border-sky-500 w-full p-2"
            />
            <div className="text-red-600 text-sm">{error.email}</div>
          </label>
          <label className="w-full max-w-xs">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="focus:bg-gray-200 block mt-1 border-2 border-solid border-sky-500 w-full p-2"
            />
            <div className="text-red-600 text-sm">{error.password}</div>
          </label>
          <label className="w-full max-w-xs">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="focus:bg-gray-200 block mt-1 border-2 border-solid border-sky-500 w-full p-2"
            />
            <div className="text-red-600 text-sm">{error.confirmPassword}</div>
          </label>
          <div className="flex w-full max-w-xs justify-between">
            <button
              type="submit"
              className="bg-blue-400 border-2 border-solid border-red-300 px-4 py-2"
            >
              Sign Up
            </button>
            <button className="bg-red-300 border-2 border-solid border-blue-600 px-4 py-2">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
