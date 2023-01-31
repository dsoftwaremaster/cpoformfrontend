import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import CardMenu from "./CardMenu";
import { Container } from "semantic-ui-react";

function RowMenu({ data }) {
  return (
    <>
      <Container>
        <div class="ui three column centered grid">
          <div class="three column centered row">
            {data &&
              data.map((menu, key) => {
                return (
                  <>
                    <div class="column">
                      <CardMenu data={menu}></CardMenu>
                    </div>
                    {(key + 1) % 3 === 0 ? (
                      <>
                        <br />
                        <br />
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default RowMenu;
