import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRestPasswordLink } from "../service/operation/user";
import { useDispatch, useSelector } from "react-redux";

const FrogotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state) => state.auth);
  const [mail, setMail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendRestPasswordLink(mail, dispatch);

    console.log(mail);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mt-2 mb-6">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setMail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:ring-4 focus:ring-blue-300"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
        </p>
        <p
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Log in
        </p>
      </div>
    </div>
  );
};

export default FrogotPassword;
