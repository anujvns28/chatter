import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../service/operation/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authLoading } = useSelector((state) => state.auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = async (data) => {
    await login(data, dispatch, navigate);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center w-full">
      {authLoading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="sm:w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className=" text-blue-800">username is required</span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.username && (
                <span className=" text-blue-800">password is required</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <span
                onClick={() => navigate("/forgot-password")}
                className="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Forgot Password?
              </span>
            </div>
            <div className="mt-6 text-center">
              <p onClick={() => navigate("/signup")} className="text-gray-700">
                Don't have an account?
                <span className="text-blue-500 hover:text-blue-800 font-bold cursor-pointer">
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
