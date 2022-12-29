import React, { useState } from "react";
import { Button, Container, Form, Radio } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveFormularioRequest } from "../../api/FormRequest";
import Documentos from "./Documentos";
import ImagenComponent from "./ImagenComponent";
import idfront from "./img/id-Card-front.png";
import idback from "./img/id-Card-back.png";
import selfie from "./img/Selfie_cedula_Ejemplo.png";
import cartaAutorizacion from "./img/Carta_autorizacion_icon.jpg";
const Registro = () => {
  const [contenedor, setContenedor] = useState(false);

  const IdentificacionOption = [
    { key: 1, value: "CEDULA", text: "CEDULA" },
    { key: 2, value: "PASAPORTE", text: "PASAPORTE" },
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

  const Provincias = [
    { key: 1, value: "PICHINCHA", text: "PICHINCHA" },
    // { key: 2, value: 'GUAYAS', text: 'GUAYAS' },
  ];

  const Ciudades = [
    { key: 1, value: "QUITO", text: "QUITO" },
    // { key: 2, value: 'MACHACHI', text: 'MACHACHI' },
  ];

  const Formato = [
    // { key: 1, value: 'FIRMA EN LA NUBE', text: 'FIRMA EN LA NUBE' },
    { key: 2, value: "ARCHIVO .P12", text: "ARCHIVO .P12" },
    // { key: 3, value: 'EN TOKEN', text: 'EN TOKEN' }
  ];

  const Vigencia = [
    { key: 1, value: "1 año", text: "1 año" },
    { key: 2, value: "2 años", text: "2 años" },
    { key: 3, value: "3 años", text: "3 años" },
    { key: 4, value: "4 años", text: "4 años" },
    { key: 5, value: "5 años", text: "5 años" },
    { key: 6, value: "7 días", text: "7 días" },
  ];
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
      conRuc: false,
      provincias: "",
      ciudades: "",
      direccion: "",
      formato: "",
      vigencia: "",
      express: false,
      fileFront: "",
      fileBack: "",
      fileCarta: "",
      fileSelfie: "",
    },
    onSubmit: (formData) => {
      //console.log(formData);
      save(formData);
    },
    // validationSchema: Yup.object({
    //   nombreCompleto: Yup.string().required(),
    //   fechaNacimiento: Yup.date().required(),
    //   tipoIdentificacion: Yup.string().required(),
    //   identificacion: Yup.string().required().max(13),
    //   nacionalidad: Yup.string().required(),
    //   apellidoUno: Yup.string().required(),
    //   apellidoDos: Yup.string().required(),
    //   codigoDactilar: Yup.string().required(),
    //   sexo: Yup.string().required(),
    //   celular: Yup.string().required(),
    //   celularDos: Yup.string(),
    //   mail: Yup.string().email("Debe ser un email válido").required(),
    //   mailDos: Yup.string().email("Debe ser un email válido"),
    //   provincias: Yup.string().required(),
    //   ciudades: Yup.string().required(),
    //   direccion: Yup.string().required(),
    //   formato: Yup.string().required(),
    //   vigencia: Yup.string().required(),
    //   express: Yup.bool(),
    // }),
  });
  const save = async (formData) => {
    await saveFormularioRequest(formData)
      .then((res) => {
        //console.log(res);
        formik.handleReset();
        alert('Información guardada correctamente');
      })
      .catch((error) => {
        alert('Ocurrió un error, intente más tarde');
        console.log(error.response.data);
        console.log(error.response.data.error);
      });
  };
  const regresar = () => {
    setContenedor(false);
  };
  const handleFileChange = (e, nombre) => {
    if (e.target.files) {
      // setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      formik.setFieldValue(nombre, e.target.files[0]);
    }
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
            <div className="ui three column grid">
              <div className="column">
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={IdentificacionOption}
                  name="tipoIdentificacion"
                  selection
                  error={formik.errors.tipoIdentificacion}
                  value={formik.values.tipoIdentificacion}
                  onChange={(_, data) =>
                    formik.setFieldValue("tipoIdentificacion", data.value)
                  }
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
                />
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
                />
                <Form.Input
                  type="text"
                  placeholder="Celular2"
                  name="celularDos"
                  onChange={formik.handleChange}
                  error={formik.errors.celularDos}
                  value={formik.values.celularDos}
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
                  placeholder="Email2"
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
                  options={Provincias}
                  name="provincias"
                  selection
                  onChange={(_, data) =>
                    formik.setFieldValue("provincias", data.value)
                  }
                  error={formik.errors.provincias}
                  value={formik.values.provincias}
                />
              </div>
              <div className="column">
                <Form.Field>Ciudad</Form.Field>
                <Form.Dropdown
                  placeholder="Seleccione..."
                  options={Ciudades}
                  name="ciudades"
                  selection
                  onChange={(_, data) =>
                    formik.setFieldValue("ciudades", data.value)
                  }
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
            <Button className="ui primary button" type="submit">
              Guardar
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default Registro;
