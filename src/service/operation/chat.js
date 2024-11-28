import axios from "axios";
import { chatEndPoints } from "../api";

const {
  FETCH_ALL_CHATS,
  FETCH_CHAT_DETAILS,
  SEND_MESSAGE_API,
  FETCH_MESSAGE_API,
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
      console.log(result, "this is chat response");
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
  try {
    const response = await axios({
      url: SEND_MESSAGE_API,
      method: "POST",
      data: data,
      withCredentials: true,
    });

    console.log(response.data, "message send response");
  } catch (err) {
    console.log("error occured in seding message", err);
  }
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

    console.log(response.data, "message fetching response");
  } catch (err) {
    console.log("error occured in fetching message", err);
  }
  return result;
};
