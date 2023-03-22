import "mocha";
import { expect } from "chai";

import { Usuario } from "../src/Usuario/Usuario";

const usuario = new Usuario("Iluzio", 0, "Ciclismo");

describe("Usuario class tests", () => {
  it("Usuario debería tener un nombre", () => {
    expect(usuario.nombre).to.be.a("string");
    expect(usuario.nombre).to.equal("Iluzio");
  });
  it("Usuario debería tener un identificador", () => {
    expect(usuario.id).to.be.a("number");
    expect(usuario.id).to.equal(0);
  });
  it("Usuario debería tener una activad rutinaria", () => {
    expect(usuario.actividad).to.be.a("string");
    expect(usuario.actividad).to.equal("Ciclismo");
  });
  it("Usuario debería tener una lista de amigos", () => {
    expect(usuario.amigos).to.be.a("array");
    expect(usuario.amigos).to.be.empty;
  });
  it("Usuario debería tener una lista de grupos de amigos", () => {
    expect(usuario.grupos).to.be.a("array");
    expect(usuario.grupos).to.be.empty;
  });
});
