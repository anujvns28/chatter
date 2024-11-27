const BASE_URL = "http://localhost:4000/api/v1";

export const authEndPoints = {
  CHECK_USERNAME_API: BASE_URL + "/auth/checkUsernameExist",
  SUGGEST_USERNAME_API: BASE_URL + "/auth/suggestUsername",
  SIGNUP_API: BASE_URL + "/auth/signup/",
  LOGIN_API: BASE_URL + "/auth/login",
  LOGOUT_API: BASE_URL + "/auth/logout",
};

export const userEndPoints = {
  SEARCH_USER_API: BASE_URL + "/user/searchUser",
  SEND_FRIND_REQUEST_API: BASE_URL + "/user/sendFriendRequest",
  RESPOND_TO_FRAIND_REQUEST_API: BASE_URL + "/user/respondToFraindRequest",
  FETCH_ALL_REQUEST_API: BASE_URL + "/user/fetchAllFraindRequests",
};

export const chatEndPoints = {
  FETCH_ALL_CHATS: BASE_URL + "/chat/fetchAllChats",
};
