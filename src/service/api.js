const BASE_URL = "http://localhost:4000/api/v1";

export const authEndPoints = {
  CHECK_USERNAME_API: BASE_URL + "/auth/checkUsernameExist",
  SUGGEST_USERNAME_API: BASE_URL + "/auth/suggestUsername",
  SIGNUP_API: BASE_URL + "/auth/signup/",
  LOGIN_API: BASE_URL + "/auth/login",
  LOGOUT_API: BASE_URL + "/auth/logout",
};
