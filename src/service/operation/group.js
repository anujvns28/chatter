import axios from "axios";
import { groupEndPoints } from "../api";
import { setAuthLoading } from "../../slice/authSlice";
import { setShowGroupCreationModal } from "../../slice/chatSlice";

const { CREATE_GROUP_CHAT, ACCEPT_GROUP_INVITE } = groupEndPoints;

export const createGroupChatHandler = async (data, token, dispatch) => {
  dispatch(setAuthLoading(true));
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
      dispatch(setShowGroupCreationModal(false));
    }
  } catch (err) {
    console.log("error occured in creaing group chat", err);
  }
  dispatch(setAuthLoading(false));
};

export const respondToGroupInviteHandler = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: ACCEPT_GROUP_INVITE,
      data: data,
      withCredentials: true,
    });

    if (response) {
      console.log("accepting group invite api response", response.data);
    }
  } catch (err) {
    console.log("error occured in accepting group invite chat", err);
  }
};