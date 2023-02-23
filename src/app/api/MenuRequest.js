import { API } from "./ApiConfig";
const URL_GRUPO = "/menu";

//Menu
export const MenuRequest = async () => {
  const request = await API.get(URL_GRUPO + "/");
  const response = request.data;
  return response;
};

