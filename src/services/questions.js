import { http } from "http.js";

export const getCategoryQuestions = (payload) => {
  return http.get("https://opentdb.com/api.php", payload);
};
