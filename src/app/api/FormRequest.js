import { API } from "./ApiConfig";

const URL_GUARDAR_FORMULARIO = "/formulario";
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
//productoMasVendido
export const saveFormularioRequest = async (data) => {
  const request = await API.post(URL_GUARDAR_FORMULARIO, data, config);
  const response = request.data;
  return response;
};
