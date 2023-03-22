import "mocha";
import { expect } from "chai";

import { Ruta } from "../../src/Ruta/Ruta";

const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");

describe("Ruta class tests", () => {
  it("Ruta debería tener un nombre", () => {
    expect(ruta.nombre).to.be.a("string");
    expect(ruta.nombre).to.equal("Ruta de prueba");
  });
  it("Ruta debería tener un identificador", () => {
    expect(ruta.id).to.be.a("number");
    expect(ruta.id).to.equal(1);
  });
  it("Ruta debería tener una coordenada de inicio", () => {
    expect(ruta.inicio).to.be.a("array");
    expect(ruta.inicio).to.deep.equal([0, 0]);
  });
  it("Ruta debería tener una coordenada de fin", () => {
    expect(ruta.fin).to.be.a("array");
    expect(ruta.fin).to.deep.equal([1, 1]);
  });
  it("Ruta debería tener una longitud", () => {
    expect(ruta.longitud).to.be.a("number");
    expect(ruta.longitud).to.equal(1);
  });
  it("Ruta debería tener un desnivel", () => {
    expect(ruta.desnivel).to.be.a("number");
    expect(ruta.desnivel).to.equal(1);
  });
  it("Ruta debería tener un tipo de actividad", () => {
    expect(ruta.tipo).to.be.a("string");
    expect(ruta.tipo).to.equal("Ciclismo");
  });
  it("Ruta debería tener una lista de usuarios", () => {
    expect(ruta.usuarios).to.be.a("array");
    expect(ruta.usuarios).to.deep.equal([]);
  });
  it("Ruta debería tener una calificación", () => {
    expect(ruta.calificacion).to.be.a("number");
    expect(ruta.calificacion).to.equal(0);
  });
});