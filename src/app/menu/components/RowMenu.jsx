import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import CardMenu from "./CardMenu";

function RowMenu({ columns, data }) {
  return (
    <>
      <Grid.Row columns={columns} centered>
        {data &&
          data.map((menu) => {
            return <CardMenu data={menu}></CardMenu>;
          })}
      </Grid.Row>
    </>
  );
}

export default RowMenu;
