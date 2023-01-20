import React, { Component, useEffect, useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { MenuRequest } from "../../api/MenuRequest";
import RowMenu from "./components/RowMenu";

const Menu = () => {
  const [menu, setMenu] = useState();

  const menuRequest = () => {
    MenuRequest()
      .then((res) => {
        //console.log(res.menu);
        setMenu(res.menu);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    menuRequest();
  }, []);

  return (
    <React.Fragment>
      <br />
      <div style={{ textAlign: "center" }}>
        <h1>APSoftindustries</h1>
        <p>Nuestros servicios al alcance de tu mano</p>
        <br />
      </div>
      <Grid>
        <RowMenu columns={3} data={menu}></RowMenu>
      </Grid>
    </React.Fragment>
  );
};

export default Menu;
