import axios from "axios";
import { CONFIGS } from "../config/Configs";

export const API = axios.create({ baseURL: CONFIGS.API_URL });

export const config = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
