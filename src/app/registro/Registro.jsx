import React, { useState } from "react";
import { Button, Container, Form, Radio, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveFormularioRequest } from "../../api/FormRequest";
import Documentos from "./Documentos";
import ImagenComponent from "./ImagenComponent";
import idfront from "./img/id-Card-front.png";
import idback from "./img/id-Card-back.png";
import selfie from "./img/Selfie_cedula_Ejemplo.png";
import cartaAutorizacion from "./img/Carta_autorizacion_icon.jpg";
import { sub } from "date-fns/fp";
import { useEffect } from "react";
import { CiudadesRequest, ProvinciasRequest } from "../../api/CatalogoRequest";

const Registro = () => {
  const [contenedor, setContenedor] = useState(false);
  const [tipoIdentificacion, setTipoIdentificacion] = useState();
  const [maxLengthIdentificacion, setMaxLengthIdentificacion] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [provincias, setProvincias] = useState();
  const [selectedProvincia, setSelectedProvincia] = useState();
  const [ciudadesTodas, setCiudadesTodas] = useState();
  const [ciudades, setCiudades] = useState();

  const IdentificacionOption = [
    { key: 1, value: "CEDULA", text: "CEDULA" },
    { key: 2, value: "RUC", text: "RUC" },
  ];

  const Nacionalidad = [
    { key: 13, value: "COLOMBIANA", text: "COLOMBIANA" },
    { key: 19, value: "ECUATORIANA", text: "ECUATORIANA" },
    { key: 73, value: "VENEZOLANA", text: "VENEZOLANA" },
  ];

  const Sexo = [
    { key: 1, value: "HOMBRE", text: "HOMBRE" },
    { key: 2, value: "MUJER", text: "MUJER" },
  ];

  const Formato = [
    { key: 1, value: "FIRMA EN LA NUBE", text: "FIRMA EN LA NUBE" },
    { key: 2, value: "ARCHIVO .P12", text: "ARCHIVO .P12" },
    { key: 3, value: "EN TOKEN", text: "EN TOKEN" },
  ];

  const Vigencia = [
    { key: 1, value: "1 año", text: "1 año" },
    { key: 2, value: "2 años", text: "2 años" },
    { key: 3, value: "3 años", text: "3 años" },
    { key: 4, value: "4 años", text: "4 años" },
    { key: 5, value: "5 años", text: "5 años" },
    { key: 6, value: "7 días", text: "7 días" },
  ];

  useEffect(() => {
    ProvinciasRequest()
      .then((res) => {
        let provincias = [];
        res.response.forEach((provincia) => {
          provincias.push({
            key: provincia.id,
            value: provincia.id,
            text: provincia.nombre,
          });
        });
        setProvincias(provincias);
      })
      .catch((error) => {
        console.log("Error Provincias Request: ", error);
      });
    CiudadesRequest()
      .then((res) => {
        setCiudadesTodas(res.response);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (selectedProvincia) {
      let tempCiudades = ciudadesTodas.filter(
        (ciudad) => ciudad.provincia_id === selectedProvincia
      );
      let ciudadesProvincia = [];
      tempCiudades.forEach((ciudad) => {
        ciudadesProvincia.push({
          key: ciudad.id,
          value: ciudad.id,
          text: ciudad.nombre,
        });
      });
      setCiudades(ciudadesProvincia);
    }
  }, [selectedProvincia]);

  const validacionSchema = Yup.object({
    nombreCompleto: Yup.string().required("Campo obligatorio"),
    fechaNacimiento: Yup.date()
      .required("Campo obligatorio")
      .max(sub({ years: 18 }, new Date()), "Mínimo debe tener 18 años"),
    tipoIdentificacion: Yup.string().required("Campo obligatorio"),
    identificacion: Yup.string("Ingrese sólo números")
      .required("Campo obligatorio")
      .when("tipoIdentificacion", {
        is: "CEDULA",
        then: (schema) =>
          schema.max(10, "La cédula debe tener máximo 10 dígitos"),
      })
      .when("tipoIdentificacion", {
        is: "RUC",
        then: (schema) => schema.max(13, "El RUC debe tener máximo 13 dígitos"),
      }),
    nacionalidad: Yup.string().required("Campo obligatorio"),
    apellidoUno: Yup.string().required("Campo obligatorio"),
    apellidoDos: Yup.string().required("Campo obligatorio"),
    codigoDactilar: Yup.string().required("Campo obligatorio").max(10),
    sexo: Yup.string().required("Campo obligatorio"),
    celular: Yup.string()
      .required("Campo obligatorio")
      .min(10, "Faltan dígitos")
      .max(10, "El número de celular debe ser máximo de 10 dígitos"),
    celularDos: Yup.string()
      .min(10, "Faltan dígitos")
      .max(10, "El número de celular debe ser máximo de 10 dígitos"),
    mail: Yup.string()
      .email("No es un correo válido")
      .required("Campo obligatorio"),
    mailDos: Yup.string().email("No es un correo válido"),
    provincias: Yup.string().required("Campo obligatorio"),
    ciudades: Yup.string().required("Campo obligatorio"),
    direccion: Yup.string().required("Campo obligatorio"),
    formato: Yup.string().required("Campo obligatorio"),
    vigencia: Yup.string().required("Campo obligatorio"),
    express: Yup.bool(),
  });

  useEffect(() => {
    switch (tipoIdentificacion) {
      case "CEDULA":
        setMaxLengthIdentificacion(10);
        break;
      case "RUC":
        setMaxLengthIdentificacion(13);
      default:
        break;
    }
  }, [tipoIdentificacion]);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  useEffect(() => {
    if (showAlertError) {
      setTimeout(() => {
        setShowAlertError(false);
      }, 5000);
    }
  }, [showAlertError]);

  const formik = useFormik({
    initialValues: {
      nombreCompleto: "",
      fechaNacimiento: "",
      tipoIdentificacion: "",
      identificacion: "",
      nacionalidad: "",
      apellidoUno: "",
      apellidoDos: "",
      codigoDactilar: "",
      sexo: "",
      celular: "",
      celularDos: "",
      mail: "",
      mailDos: "",
      conRuc: 0,
      provincias: "",
      ciudades: "",
      direccion: "",
      formato: "",
      vigencia: "",
      express: 0,
      fileFront: "",
      fileBack: "",
      fileCarta: "",
      fileSelfie: "",
    },
    onSubmit: (formData) => {
      save(formData);
    },
    validationSchema: validacionSchema,
  });

  const save = async (formData) => {
    await saveFormularioRequest(formData)
      .then((res) => {
        console.log(res);
        setShowAlert(true);
        formik.handleReset();
        regresar();
      })
      .catch((error) => {
        setShowAlertError(true);
      });
  };
  const regresar = () => {
    setContenedor(false);
  };
  const handleFileChange = (e, nombre) => {
    if (e.target.files) {
      // setFile(e.target.files[0]);
      formik.setFieldValue(nombre, e.target.files[0]);
    }
  };
  const dismiss = () => {
    setShowAlert(false);
  };

  const dismissError = () => {
    setShowAlertError(false);
  };

  return (
    <Container>
      <br />
      <h1 style={{ textAlign: "center" }}>INGRESE SUS DATOS</h1>
      <h4 style={{ textAlign: "center" }}>
        Con esta información generaremos tu firma electrónica
      </h4>
      <Form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        {contenedor ? (
          // <Documentos setContenedor={setContenedor} formik={formik} />
          <>
            <h3 style={{ textAlign: "center" }}>DOCUMENTOS NECESARIOS</h3>
            {showAlertError && (
              <>
                <Message floating negative onDismiss={dismissError}>
                  <Message.Header>¡Error!</Message.Header>
                  <p>Ocurrió un error, intente más tarde.</p>
                </Message>
              </>
            )}
            <div className="ui two column grid">
              <div className="column">
                <div className="ui segment">
                  <>
                    <a className="ui medium image">
                      {/* <img src={idfront} /> */}
                      <Form.Input
                        id="fileFront"
                        type="file"
                        name="fileFront"
                        onChange={(e) => handleFileChange(e, "fileFront")}
                      ></Form.Input>
                    </a>
                  </>
                  {/* <input type="file" onChange={handleFileChange} /> */}
                </div>
              </div>
              <div className="column">
                <div className="ui segment">
                  <>
                    <a className="ui medium image">
                      {/* <img src={idback} /> */}
                      <Form.Input
                        type="file"
                        name="fileBack"
                        onChange={(e) => handleFileChange(e, "fileBack")}
                      />
                    </a>
                  </>
                </div>
              </div>
            </div>
            <div className="ui two column grid">
              <div className="column">
                <div className="ui segment">
                  <>
                    <a className="ui medium image">
                      {/* <img src={selfie} /> */}
                      <Form.Input
                        type="file"
                        name="fileSelfie"
                        onChange={(e) => handleFileChange(e, "fileSelfie")}
                      />
                    </a>
                  </>
                </div>
              </div>
              <div className="column">
                <div className="ui segment">
                  <>
                    <a className="ui medium image">
                      {/* <img src={cartaAutorizacion} /> */}
                      <Form.Input
                        type="file"
                        name="fileCarta"
                        onChange={(e) => handleFileChange(e, "fileCarta")}
                      />
                    </a>
                  </>
                </div>
              </div>
            </div>
            <button className="ui secondary button" onClick={() => regresar()}>
              Regresar
            </button>
          </>
        ) : (
          <>
            <h3 style={{ textAlign: "center" }}>DATOS PERSONALES</h3>
            {showAlert && (
              <>
                <Message floating info onDismiss={dismiss}>
                  <Message.Header>¡Exito!</Message.Header>
                  <p>Información almacenada con éxito</p>
                </Message>
              </>
            )}
            <div className="ui three column grid">
              <div className="column">
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={IdentificacionOption}
                  name="tipoIdentificacion"
                  selection
                  error={formik.errors.tipoIdentificacion}
                  value={formik.values.tipoIdentificacion}
                  onChange={(_, data) => {
                    formik.setFieldValue("tipoIdentificacion", data.value);
                    setTipoIdentificacion(data.value);
                  }}
                />
                <Form.Input
                  type="text"
                  placeholder="Nombres completos"
                  name="nombreCompleto"
                  onChange={formik.handleChange}
                  error={formik.errors.nombreCompleto}
                  value={formik.values.nombreCompleto}
                />
                <Form.Input
                  type="date"
                  name="fechaNacimiento"
                  onChange={formik.handleChange}
                  error={formik.errors.fechaNacimiento}
                  value={formik.values.fechaNacimiento}
                />
              </div>
              <div className="column">
                <Form.Input
                  type="text"
                  placeholder="Identificación"
                  name="identificacion"
                  onChange={formik.handleChange}
                  error={formik.errors.identificacion}
                  value={formik.values.identificacion}
                  maxLength={maxLengthIdentificacion}
                />
                <Form.Group>
                  <></>
                </Form.Group>
                <Form.Input
                  type="text"
                  placeholder="Primer apellido"
                  name="apellidoUno"
                  onChange={formik.handleChange}
                  error={formik.errors.apellidoUno}
                  value={formik.values.apellidoUno}
                />
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={Nacionalidad}
                  name="nacionalidad"
                  selection
                  error={formik.errors.nacionalidad}
                  value={formik.values.nacionalidad}
                  onChange={(_, data) =>
                    formik.setFieldValue("nacionalidad", data.value)
                  }
                />
              </div>
              <div className="column">
                <Form.Input
                  type="text"
                  placeholder="Código Dactilar"
                  name="codigoDactilar"
                  onChange={formik.handleChange}
                  error={formik.errors.codigoDactilar}
                  value={formik.values.codigoDactilar}
                  maxLength={10}
                />
                <Form.Input
                  type="text"
                  placeholder="Segundo apellido"
                  name="apellidoDos"
                  onChange={formik.handleChange}
                  error={formik.errors.apellidoDos}
                  value={formik.values.apellidoDos}
                />
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={Sexo}
                  name="sexo"
                  selection
                  error={formik.errors.sexo}
                  value={formik.values.sexo}
                  onChange={(_, data) =>
                    formik.setFieldValue("sexo", data.value)
                  }
                />
              </div>
            </div>
            <div className="ui two column grid">
              <div className="column">
                <Form.Input
                  type="text"
                  placeholder="Celular"
                  name="celular"
                  onChange={formik.handleChange}
                  error={formik.errors.celular}
                  value={formik.values.celular}
                  maxLength={10}
                />
                <Form.Input
                  type="text"
                  placeholder="Otro número Celular"
                  name="celularDos"
                  onChange={formik.handleChange}
                  error={formik.errors.celularDos}
                  value={formik.values.celularDos}
                  maxLength={10}
                />
              </div>
              <div className="column">
                <Form.Input
                  type="text"
                  placeholder="Email"
                  name="mail"
                  onChange={formik.handleChange}
                  error={formik.errors.mail}
                  value={formik.values.mail}
                />
                <Form.Input
                  type="text"
                  placeholder="Email alternativo"
                  name="mailDos"
                  onChange={formik.handleChange}
                  error={formik.errors.mailDos}
                  value={formik.values.mailDos}
                />
              </div>
            </div>
            <div className="ui three column grid">
              <div className="sixteen wide column">
                <div className="ui segment">
                  <div className="ui three column grid">
                    <div className="column">
                      <Form.Field>Con RUC:</Form.Field>
                    </div>
                    <div className="column">
                      <Form.Field>
                        <Radio label="Si" name="conRuc" value="1" />
                      </Form.Field>
                    </div>
                    <div className="column">
                      <Form.Field>
                        <Radio label="No" name="conRuc" value="0" />
                      </Form.Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3>Dirección Domicilio</h3>
            <div className="ui three column grid">
              <div className="column">
                <Form.Field>Provincia</Form.Field>
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={provincias}
                  name="provincias"
                  selection
                  onChange={(_, data) => {
                    formik.setFieldValue("provincias", data.value);
                    setSelectedProvincia(data.value);
                  }}
                  error={formik.errors.provincias}
                  value={formik.values.provincias}
                />
              </div>
              <div className="column">
                <Form.Field>Ciudad</Form.Field>
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={ciudades}
                  name="ciudades"
                  selection
                  onChange={(_, data) => {
                    formik.setFieldValue("ciudades", data.value);
                  }}
                  error={formik.errors.ciudades}
                  value={formik.values.ciudades}
                />
              </div>
              <div className="column">
                <Form.Field>Dirección Completa</Form.Field>
                <Form.Input
                  type="text"
                  placeholder="Dirección"
                  name="direccion"
                  onChange={(_, data) =>
                    formik.setFieldValue("direccion", data.value)
                  }
                  error={formik.errors.direccion}
                  value={formik.values.direccion}
                />
              </div>
            </div>
            <h3>Formato y Tiempo de Vigencia</h3>
            <div className="ui three column grid">
              <div className="column">
                <Form.Field>En Formato</Form.Field>
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={Formato}
                  name="formato"
                  selection
                  onChange={(_, data) =>
                    formik.setFieldValue("formato", data.value)
                  }
                  error={formik.errors.formato}
                  value={formik.values.formato}
                />
              </div>
              <div className="column">
                <Form.Field>Tiempo de Vigencia</Form.Field>
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={Vigencia}
                  name="vigencia"
                  selection
                  onChange={(_, data) =>
                    formik.setFieldValue("vigencia", data.value)
                  }
                  error={formik.errors.vigencia}
                  value={formik.values.vigencia}
                />
              </div>
              <div className="column">
                <Form.Field></Form.Field>
                <Form.Checkbox
                  label="Serv. Express:"
                  name="express"
                  onChange={formik.handleChange}
                  error={formik.errors.express}
                />
              </div>
            </div>
            <br />
            <div className="ui two column grid">
              <div className="four column row">
                <div className="right floated column">
                  <Button
                    className="ui secondary button"
                    type="button"
                    onClick={formik.handleReset}
                  >
                    Limpiar
                  </Button>
                </div>
                <div className="left floated column">
                  <Button
                    className="ui primary button"
                    type="button"
                    onClick={() => setContenedor(true)}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        {contenedor && (
          <>
            <Button
              className="ui primary button"
              type="submit"
              disabled={Object.keys(formik.errors).length > 0}
            >
              Guardar
            </Button>
            {Object.keys(formik.errors).length > 0 && (
              <>
                <Message floating color="yellow">
                  {/* <Message.Header>Error</Message.Header> */}
                  <Message.Content>
                    <strong>Los siguientes campos tienes errores:</strong>{" "}
                    {Object.keys(formik.errors).map((error) => error + "    ")}.{" "}
                    <br />
                    <center>
                      <strong>
                        El botón de guardar se activará cuando los errores sean
                        corregidos.
                      </strong>
                    </center>
                  </Message.Content>
                </Message>
              </>
            )}
          </>
        )}
      </Form>
    </Container>
  );
};

export default Registro;
