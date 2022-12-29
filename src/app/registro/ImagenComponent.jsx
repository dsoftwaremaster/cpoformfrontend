import { Form, FormField } from "semantic-ui-react";

const ImagenComponent = ({ imagenPath, name, formik }) => {
  console.log("formik: " + formik);
  return (
    <>
      <a className="ui medium image">
        {/* <img src={imagenPath} /> */}
        <Form.Input type="file" name={name} onChange={formik.handleChange} />
      </a>
    </>
  );
};

export default ImagenComponent;
