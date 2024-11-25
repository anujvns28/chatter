import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleUser } from "react-icons/fa6";
import {
  checkUserNameExist,
  signup,
  suggestUsername,
} from "../service/operation/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { authLoading } = useSelector((state) => state.auth);

  const [imagePreview, setImagePreview] = useState(null);
  const [suggestname, setSuggestname] = useState();
  const [isUsernameUnique, setIsUsernameUnique] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);

  const selectedImage = watch("image");
  const userEmail = watch("email");
  const userName = watch("username");

  //image preview
  if (selectedImage && selectedImage[0] && !imagePreview) {
    setImagePreview(URL.createObjectURL(selectedImage[0]));
  }

  // email blure
  const handleEmail = async () => {
    if (userEmail && userEmail.includes("@gmail.com")) {
      const result = await suggestUsername(userEmail);
      if (result) {
        setSuggestname(result.data);
      }
    }
  };

  // check user name exist or not
  const blurUsernameExist = async () => {
    if (userName && userName.length > 0) {
      const result = await checkUserNameExist({ username: userName });
      if (result) {
        if (result.success) setIsUsernameUnique(true);
      }
      setShowUsernameError(true);
    }
  };

  useEffect(() => {
    if (!userName) {
      setShowUsernameError(false);
    }
  }, [userName]);

  const handleSignup = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("image", selectedImage[0]);

    await signup(formData, dispatch, navigate);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center text-black justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="mb-2 ">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="w-full flex flex-col items-center justify-center">
              <label className="cursor-pointer flex-col rounded-full h-[120px] w-[120px] flex justify-center items-center border border-gray-300  shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {!imagePreview ? (
                  <p className="text-9xl">
                    <FaCircleUser />
                  </p>
                ) : (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
                <input
                  type="file"
                  className="hidden"
                  {...register("image", { required: true })}
                />
              </label>
              {errors.image && (
                <span className=" text-blue-800 ">image is required</span>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className=" text-blue-800">name is required</span>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your Email"
              {...register("email", { required: true })}
              onBlur={handleEmail}
            />
            {errors.email && (
              <span className=" text-blue-800">email is required</span>
            )}
          </div>

          <div className="mb-2 relative">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              {...register("username", { required: true })}
              onBlur={blurUsernameExist}
            />
            {errors.username && (
              <span className=" text-blue-800">username is required</span>
            )}
            {/* shoing exist or not */}
            {showUsernameError && (
              <span
                className={`${
                  isUsernameUnique ? "text-green-500" : "text-red-500"
                }`}
              >
                {isUsernameUnique ? "vallied username" : "not vallied username"}{" "}
              </span>
            )}
          </div>
          {/* suggest username section */}
          {suggestname && (
            <div className="flex justify-between w-[95%] items-center gap-1 text-xs">
              {suggestname.map((name, index) => {
                return (
                  <div
                    onClick={() => setValue("username", name)}
                    key={index}
                    className="border bg-gray-200 cursor-pointer px-3 py-1 rounded-md"
                  >
                    <p>{name}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-blue-800">password is required</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-800 font-bold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
