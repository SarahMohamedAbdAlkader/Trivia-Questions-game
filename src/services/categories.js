import { http } from "http.js";

export const getCategories = () => {
  return http.get("/api_category.php");
};
