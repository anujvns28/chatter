import axios from "axios";
import { chatEndPoints } from "../api";

const {
  FETCH_ALL_CHATS,
  FETCH_CHAT_DETAILS,
  SEND_MESSAGE_API,
  FETCH_MESSAGE_API,
  UPDATE_MESSAGE_READ_STATUS_API,
} = chatEndPoints;

export const fetchAllChatHandler = async (token) => {
  let result;
  try {
    const response = await axios({
      url: FETCH_ALL_CHATS,
      method: "POST",
      data: { token: token },
      withCredentials: true,
    });

    if (response) {
      result = response.data;
      console.log(response, "this is chats");
    }
  } catch (err) {
    console.log("error occured in fetching all chat", err);
  }
  return result;
};

export const fetchChatDetailsHandler = async (data, token) => {
  let result;
  try {
    const response = await axios({
      url: FETCH_CHAT_DETAILS,
      method: "POST",
      data: { chatId: data, token: token },
      withCredentials: true,
    });

    if (response) {
      result = response.data;
      console.log("chat details respose", result);
    }
  } catch (err) {
    console.log("error occred in fetching chat details", err);
  }
  return result;
};

export const sendMessageHandler = async (data) => {
  let result;
  try {
    const response = await axios({
      url: SEND_MESSAGE_API,
      method: "POST",
      data: data,
      withCredentials: true,
    });

    if (response) {
      result = response.data;
    }
  } catch (err) {
    console.log("error occured in seding message", err);
  }
  return result;
};

export const fetchMessageHandler = async (data, token, page) => {
  let result;
  try {
    const response = await axios({
      url: FETCH_MESSAGE_API,
      method: "POST",
      data: { chatId: data, token },
      params: { page },
      withCredentials: true,
    });

    if (response) {
      result = response.data;
    }
  } catch (err) {
    console.log("error occured in fetching message", err);
  }
  return result;
};

let loading = false;
export const updateMessageReadStatusHandler = async (data, token, info) => {
  try {
    if (!loading) {
      loading = true;
      const response = await axios({
        url: UPDATE_MESSAGE_READ_STATUS_API,
        method: "POST",
        data: { chatId: data, token, info },
        withCredentials: true,
      });

      console.log(response, "updating message resposnse");
      loading = false;
    } else {
      console.log("loading.. ho rha hai be");
    }
  } catch (err) {
    console.log("erroro occuring in updating message status", err);
  }
};

