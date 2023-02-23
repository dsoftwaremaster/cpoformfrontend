import { Link } from "react-router-dom";
import { Button, Grid, Image } from "semantic-ui-react";

function CardMenu({ data }) {
  const openPage = (path) => {
    // window.open(path, "_blank");
    window.open(path);
  };

  return (
    <>
      <div class="ui card">
        <div class="image">
          {data.img ? <Image src={data.img} /> : <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />}
        </div>
        <div class="content">
          <a class="header" style={{ textAlign: "center" }}>
            {data.nombre}
          </a>
          <div class="meta" style={{ textAlign: "center" }}>
            {/* <span class="date" > desde $0.99/mes</span> */}
          </div>
          <div class="description" style={{ textAlign: "center" }}>
            {data.descripcion}
          </div>
        </div>
        <div class="extra content" style={{ textAlign: "center" }}>
          <a>
            {/* <i class="user icon"></i>
            22 Friends */}
            {data.isExternal ? (
              <Button id="enlace" primary onClick={() => openPage(data.path)}>
                {data.buttonName ? data.buttonName : "Ingresar"}
              </Button>
            ) : (
              <Link to={data.path}>
                <Button primary>
                  {data.buttonName ? data.buttonName : "Ingresar"}
                </Button>
              </Link>
            )}
          </a>
        </div>
      </div>
    </>
  );
}

export default CardMenu;
