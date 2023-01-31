import React, { Component, useEffect, useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { MenuRequest } from "../../api/MenuRequest";
import RowMenu from "./components/RowMenu";

const Menu = () => {
  const [menu, setMenu] = useState(0);
  const [menuSize, setMenuSize] = useState();

  const menuRequest = () => {
    MenuRequest()
      .then((res) => {
        setMenu(res.menu);
        setMenuSize(res.menu.length);
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
        <Grid>
          <RowMenu data={menu}></RowMenu>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Menu;
