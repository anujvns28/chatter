import axios from "axios";
import { userEndPoints } from "../api";

const { SEARCH_USER_API } = userEndPoints;

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
