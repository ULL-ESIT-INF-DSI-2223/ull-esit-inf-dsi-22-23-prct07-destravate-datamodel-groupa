import "mocha";
import { expect } from "chai";

import { Reto } from "../src/Reto/Reto";

const reto = new Reto("Reto 1", "Ciclismo");

describe("Reto class tests", () => {
  it("Reto debería tener un identificador", () => {
    expect(reto.id).to.be.a("number");
    expect(reto.id).to.equal(0);
  });
  it("Reto debería tener un nombre", () => {
    expect(reto.nombre).to.be.a("string");
    expect(reto.nombre).to.equal("Reto 1");
  });
  it("Reto debería tener una lista de rutas", () => {
    expect(reto.rutas).to.be.a("array");
    expect(reto.rutas).to.be.empty;
  });
  it("Reto debería poder modificar su lista de rutas", () => {
    reto.addRuta(1);
    expect(reto.rutas).to.be.a("array");
    expect(reto.rutas).to.have.lengthOf(1);
    expect(reto.rutas).to.deep.equal([1]);
    reto.removeRuta(1);
    expect(reto.rutas).to.be.a("array");
    expect(reto.rutas).to.be.empty;
  });
  it("Reto debería tener un tipo de actividad", () => {
    expect(reto.tipo).to.be.a("string");
    expect(reto.tipo).to.equal("Ciclismo");
  });
  it("Reto debería tener una lista de usuarios", () => {
    expect(reto.usuarios).to.be.a("array");
    expect(reto.usuarios).to.be.empty;
  });
  it("Reto debería poder modificar su lista de usuarios", () => {
    reto.addUsuario(1);
    expect(reto.usuarios).to.be.a("array");
    expect(reto.usuarios).to.have.lengthOf(1);
    expect(reto.usuarios).to.deep.equal([1]);
    reto.removeUsuario(1);
    expect(reto.usuarios).to.be.a("array");
    expect(reto.usuarios).to.be.empty;
  });
  it("Reto debería tener una cantidad de kilómetros a realizar", () => {
    expect(reto.km).to.be.a("number");
    expect(reto.km).to.equal(0);
    reto.km = 100;
    expect(reto.km).to.be.a("number");
    expect(reto.km).to.equal(100);
  });
});