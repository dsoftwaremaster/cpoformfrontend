import { API } from "./ApiConfig";

const URL_GUARDAR_FORMULARIO = "/formulario";

//productoMasVendido
export const saveFormularioRequest = async (data) => {
  const request = await API.post(URL_GUARDAR_FORMULARIO, data);
  const response = request.data;
  return response;
};
