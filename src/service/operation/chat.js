import axios from "axios";
import { chatEndPoints } from "../api";

const {
  FETCH_ALL_CHATS,
  FETCH_CHAT_DETAILS,
  SEND_MESSAGE_API,
  FETCH_MESSAGE_API,
  UPDATE_MESSAGE_READ_STATUS_API,
} = chatEndPoints;

export const fetchAllChatHandler = async () => {
  let result;
  try {
    const response = await axios({
      url: FETCH_ALL_CHATS,
      method: "GET",
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

export const fetchChatDetailsHandler = async (data) => {
  let result;
  try {
    const response = await axios({
      url: FETCH_CHAT_DETAILS,
      method: "POST",
      data: { chatId: data },
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

export const fetchMessageHandler = async (data) => {
  let result;
  try {
    const response = await axios({
      url: FETCH_MESSAGE_API,
      method: "POST",
      data: { chatId: data },
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

export const updateMessageReadStatusHandler = async (data) => {
  try {
    const response = await axios({
      url: UPDATE_MESSAGE_READ_STATUS_API,
      method: "POST",
      data: { chatId: data },
      withCredentials: true,
    });

    console.log(response, "updating message resposnse");
  } catch (err) {
    console.log("erroro occuring in updating message status", err);
  }
};
