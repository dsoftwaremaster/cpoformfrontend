import { API } from "./ApiConfig";
const URL_GRUPO = "/formulario";
const URL_PROVINCIAS = "/provincias";
const URL_CIUDADES = "/ciudades";

//Provincias
export const ProvinciasRequest = async () => {
  const request = await API.get(URL_GRUPO + URL_PROVINCIAS);
  const response = request.data;
  return response;
};

//Ciudades
export const CiudadesRequest = async () => {
  const request = await API.get(URL_GRUPO + URL_CIUDADES);
  const response = request.data;
  return response;
};
