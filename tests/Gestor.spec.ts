/*import "mocha";
import { expect } from "chai";

import { Usuario } from "../src/Usuario/Usuario";
import { Grupo } from "../src/Grupo/Grupo";
import { Gestor } from "../src/Gestor/Gestor";

const usuario = new Usuario("Pepe", "Ciclismo");
const gestor = new Gestor();

describe("Gestor class tests", () => {
  it("Gestor debería tener una colección de usuarios", () => {
    expect(gestor.usuarios).to.be.an("array");
    expect(gestor.usuarios).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir usuarios", () => {
    
    gestor.addUsuario(usuario);
    expect(gestor.usuarios).to.have.lengthOf(1);
    expect(gestor.usuarios[0].nombre).to.be.equal("Pepe");
  });
  it("Gestor debería ser capaz de eliminar usuarios", () => {
    gestor.removeUsuario(usuario.id);
    expect(gestor.usuarios).to.be.empty;
  });
  it("Gestor debería tener una colección de grupos", () => {
    expect(gestor.grupos).to.be.an("array");
    expect(gestor.grupos).to.be.empty;
  });
});*/