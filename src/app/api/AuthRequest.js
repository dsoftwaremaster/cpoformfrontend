import { API } from "./ApiConfig";
const URL_GRUPO = "/auth";
const URL_REGISTRO = "/registrar";
const URL_LOGIN = "/iniciarSesion";

//Provincias
export const RegistrarRequest = async (data) => {
  const request = await API.post(URL_GRUPO + URL_REGISTRO, data);
  const response = request.data;
  return response;
};

//Ciudades
export const LoginRequest = async (data) => {
  const request = await API.post(URL_GRUPO + URL_LOGIN, data);
  const response = request.data;
  return response;
};
