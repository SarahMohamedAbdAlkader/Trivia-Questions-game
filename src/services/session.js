import { http } from "http.js";

export const getSessionToken = () => {
  return http.get("/api_token.php?command=request");
};
