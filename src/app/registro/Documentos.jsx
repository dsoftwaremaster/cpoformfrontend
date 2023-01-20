import React, { useState } from "react";
import idfront from "./img/id-Card-front.png";
import idback from "./img/id-Card-back.png";
import selfie from "./img/Selfie_cedula_Ejemplo.png";
import cartaAutorizacion from "./img/Carta_autorizacion_icon.jpg";
import ImagenComponent from "./ImagenComponent";
const Documentos = ({ setContenedor, formik }) => {
  const regresar = () => {
    setContenedor(false);
  };
  const [file, setFile] = useState();
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      //console.log(e.target.files[0]);
    }
  };
  return (
    <>
      <h3 style={{ textAlign: "center" }}>DOCUMENTOS NECESARIOS</h3>
      <div className="ui two column grid">
        <div className="column">
          <div className="ui segment">
            <ImagenComponent imagenPath={idfront} name="fileFront" formik={formik} />
            {/* <input type="file" onChange={handleFileChange} /> */}
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <ImagenComponent imagenPath={idback} name="fileBack"></ImagenComponent>
          </div>
        </div>
      </div>
      <div className="ui two column grid">
        <div className="column">
          <div className="ui segment">
            <ImagenComponent imagenPath={selfie} name="fileSelfie"></ImagenComponent>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <ImagenComponent imagenPath={cartaAutorizacion} name="fileCarta"></ImagenComponent>
          </div>
        </div>
      </div>
      <button className="ui secondary button" onClick={() => regresar()}>
        Regresar
      </button>
    </>
  );
};

export default Documentos;
