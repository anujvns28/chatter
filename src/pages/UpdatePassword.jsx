import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePassword } from "../service/operation/user";
import { useDispatch, useSelector } from "react-redux";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state) => state.auth);
  const [password, setPassword] = useState();
  const [confirmPss, setConfirmPass] = useState();
  const param = useParams();

  const token = param.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPss) {
      toast.error("Password not matched");
      return;
    }

    const data = { password: password, token: token };

    await updatePassword(data, navigate, dispatch);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Reset Password
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Remember your password?{" "}
        </p>
        <p
          onClick={() => navigate("/login")}
          className="text-indigo-600 cursor-pointer hover:text-indigo-800"
        >
          Login
        </p>
      </div>
    </div>
  );
};

export default UpdatePassword;
