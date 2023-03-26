import "mocha";
import { expect } from "chai";

import { Coordenada } from "../src/Ruta/Coordenada";
import { Ruta } from "../src/Ruta/Ruta";

const ruta = new Ruta(
  "Ruta de prueba",
  new Coordenada(0, 0),
  new Coordenada(1, 1),
  1,
  1,
  "Ciclismo"
);

describe("Coordenada class tests", () => {
  it("Coordenada debería tener una latitud", () => {
    const coordenada = new Coordenada();
    expect(coordenada.latitud).to.be.a("number");
    expect(coordenada.latitud).to.equal(0);
  });
  it("Coordenada debería tener una longitud", () => {
    const coordenada = new Coordenada();
    expect(coordenada.longitud).to.be.a("number");
    expect(coordenada.longitud).to.equal(0);
  });
});

describe("Ruta class tests", () => {
  it("Ruta debería tener un nombre", () => {
    expect(ruta.nombre).to.be.a("string");
    expect(ruta.nombre).to.equal("Ruta de prueba");
  });
  it("Ruta debería tener un identificador", () => {
    expect(ruta.id).to.be.a("number");
    expect(ruta.id).to.equal(0);
  });
  it("Ruta debería tener una coordenada de inicio", () => {
    expect(ruta.inicio).to.be.an.instanceOf(Coordenada);
    expect(ruta.inicio.latitud).to.equal(0);
    expect(ruta.inicio.longitud).to.equal(0);
  });
  it("Ruta debería tener una coordenada de fin", () => {
    expect(ruta.fin).to.be.an.instanceOf(Coordenada);
    expect(ruta.fin.latitud).to.equal(1);
    expect(ruta.fin.longitud).to.equal(1);
  });
  it("Ruta debería tener una longitud", () => {
    expect(ruta.longitud).to.be.a("number");
    expect(ruta.longitud).to.equal(1);
  });
  it("Ruta debería tener un desnivel", () => {
    expect(ruta.desnivel).to.be.a("number");
    expect(ruta.desnivel).to.equal(1);
  });
  it("Ruta debería tener un actividad de actividad", () => {
    expect(ruta.actividad).to.be.a("string");
    expect(ruta.actividad).to.equal("Ciclismo");
  });
  it("Ruta debería tener una lista de usuarios", () => {
    expect(ruta.usuarios).to.be.a("array");
    expect(ruta.usuarios).to.deep.equal([]);
  });
  it("Ruta debería poder modificar su lista de usuarios", () => {
    ruta.addUsuario(1);
    expect(ruta.usuarios).to.deep.equal([1]);
    ruta.removeUsuario(1);
    expect(ruta.usuarios).to.deep.equal([]);
  });
  it("Ruta debería tener una calificación", () => {
    expect(ruta.calificacion).to.be.a("number");
    expect(ruta.calificacion).to.equal(0);
  });
  it("Ruta debería poder modificar su calificación", () => {
    ruta.calificacion = 5;
    expect(ruta.calificacion).to.equal(5);
  });
});
