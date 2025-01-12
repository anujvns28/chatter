const BASE_URL = "http://localhost:4000/api/v1";
// const BASE_URL = "https://chatter-server-c8kd.onrender.com/api/v1";

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
  UPDATE_USER_STATUS_API: BASE_URL + "/user/updateUserStatus",
  SEND_RESET_PASSWORD_API: BASE_URL + "/user/sendResetLink",
  UPDATE_PASSWORD_API: BASE_URL + "/user/updatePassword",
  TYPING_STATUS_API: BASE_URL + "/user/typingStatus",
};

export const chatEndPoints = {
  FETCH_ALL_CHATS: BASE_URL + "/chat/fetchAllChats",
  FETCH_CHAT_DETAILS: BASE_URL + "/chat/fetchChatDetails",
  SEND_MESSAGE_API: BASE_URL + "/chat/sendMessage",
  FETCH_MESSAGE_API: BASE_URL + "/chat/getMessages",
  UPDATE_MESSAGE_READ_STATUS_API: BASE_URL + "/chat/updateMessageStatus",
};

export const groupEndPoints = {
  CREATE_GROUP_CHAT: BASE_URL + "/group/createGroup",
  ACCEPT_GROUP_INVITE: BASE_URL + "/group/acceptInvite",
};
