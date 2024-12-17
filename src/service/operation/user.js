import axios from "axios";
import { userEndPoints } from "../api";
import { setUserLoading } from "../../slice/chatSlice";

const {
  SEARCH_USER_API,
  RESPOND_TO_FRAIND_REQUEST_API,
  SEND_FRIND_REQUEST_API,
  FETCH_ALL_REQUEST_API,
  UPDATE_USER_STATUS_API,
} = userEndPoints;

export const searchUserHandler = async (username) => {
  let result;
  try {
    const response = await axios({
      method: "POST",
      url: SEARCH_USER_API + `?name=${username}`,
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

export const sendFraindRequestHandler = async (data) => {
  let result;
  try {
    const response = await axios({
      method: "POST",
      url: SEND_FRIND_REQUEST_API,
      data: { receiverId: data },
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

export const fetchAllRequestHandler = async (isRead) => {
  let result;
  try {
    const data = await axios({
      url: FETCH_ALL_REQUEST_API,
      method: "POST",
      data: { isRead: isRead },
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

export const updateUserStatusHandler = async (data) => {
  try {
    const apiData = {
      status: "online",
      userId: data,
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

