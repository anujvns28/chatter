import axios from "axios";
import { groupEndPoints } from "../api";

const { CREATE_GROUP_CHAT } = groupEndPoints;

export const createGroupChatHandler = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: CREATE_GROUP_CHAT,
      data: data,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      console.log("creating group api response", response.data);
    }
  } catch (err) {
    console.log("error occured in creaing group chat", err);
  }
};
