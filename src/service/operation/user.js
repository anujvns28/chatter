import axios from "axios";
import { userEndPoints } from "../api";
import { setUserLoading } from "../../slice/chatSlice";
import { setAuthLoading } from "../../slice/authSlice";
import { toast } from "react-toastify";

const {
  SEARCH_USER_API,
  RESPOND_TO_FRAIND_REQUEST_API,
  SEND_FRIND_REQUEST_API,
  FETCH_ALL_REQUEST_API,
  UPDATE_USER_STATUS_API,
  SEND_RESET_PASSWORD_API,
  UPDATE_PASSWORD_API,
} = userEndPoints;

export const searchUserHandler = async (username, token) => {
  let result;
  try {
    const response = await axios({
      method: "POST",
      url: SEARCH_USER_API + `?name=${username}`,
      data: { token: token },
      withCredentials: true,
    });

    if (response) {
      result = response.data;
      console.log(response);
    }
  } catch (error) {
    console.log("error occured in search user api", error);
  }
  return result;
};

export const sendFraindRequestHandler = async (data, token) => {
  let result;
  try {
    const response = await axios({
      method: "POST",
      url: SEND_FRIND_REQUEST_API,
      data: { receiverId: data, token },
      withCredentials: true,
    });

    if (response) {
      result = response.data;
      console.log(response, "sending fraind request");
    }
  } catch (error) {
    console.log("error occured in sending fraind request api", error);
  }

  return result;
};

export const respondToFraindRequestHandler = async (data) => {
  let result;
  try {
    const response = await axios({
      method: "POST",
      url: RESPOND_TO_FRAIND_REQUEST_API,
      data: data,
      withCredentials: true,
    });

    if (response) {
      result = response.data;
    }
  } catch (error) {
    console.log("error occured in Responding to fraind request api", error);
  }
  return result;
};

export const fetchAllRequestHandler = async (isRead, token) => {
  let result;
  try {
    const data = await axios({
      url: FETCH_ALL_REQUEST_API,
      method: "POST",
      data: { isRead: isRead, token: token },
      withCredentials: true,
    });

    if (data) {
      result = data.data;
    }
  } catch (err) {
    conosle.log("error occured in fetching all request");
  }
  return result;
};

export const updateUserStatusHandler = async (data, token) => {
  try {
    const apiData = {
      status: "online",
      userId: data,
      token: token,
    };

    const response = await axios({
      method: "POST",
      url: UPDATE_USER_STATUS_API,
      data: apiData,
      withCredentials: true,
    });

    if (response) {
      console.log("status updated response", response);
    }
  } catch (err) {
    console.log("error in updating user status ali", err);
  }
};

export const sendRestPasswordLink = async (data, dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: SEND_RESET_PASSWORD_API,
      data: { mail: data },
    });

    if (response) {
      console.log("reseme mail send successfully");
      toast.success("Reset link sent");
    }
  } catch (err) {
    console.log(err, "error occured in sending reset link");
    toast.error("Email is not registered");
  }
  dispatch(setAuthLoading(false));
};

export const updatePassword = async (data, navigate, dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const response = await axios({
      method: "POST",
      url: UPDATE_PASSWORD_API,
      data: data,
    });

    if (response) {
      console.log("reset mail successfully");
      navigate("/login");
    }
  } catch (err) {
    console.log(err, "error occured in updating reset mail");
  }
  dispatch(setAuthLoading(false));
};

