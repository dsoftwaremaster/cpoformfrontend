import React, { Component } from "react";
import { Container, Form, Button } from "semantic-ui-react";
class Signup extends Component {
  render() {
    return (
      <div>
        <Container
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1>Formulario de registro</h1>
          <Form style={{ width: "30%" }}>
            <Form.Input
              type="text"
              placeholder="Nombre y apellidos"
              name="name"
            />
            <Form.Input
              type="text"
              placeholder="Correo electronico"
              name="email"
            />
            <Form.Input
              type="password"
              placeholder="Contraseña"
              name="password"
            />
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
