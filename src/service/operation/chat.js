import axios from "axios";
import { chatEndPoints } from "../api";

const { FETCH_ALL_CHATS } = chatEndPoints;

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
