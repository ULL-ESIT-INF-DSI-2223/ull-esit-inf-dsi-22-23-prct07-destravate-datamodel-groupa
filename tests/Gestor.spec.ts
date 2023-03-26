import "mocha";
import { expect } from "chai";

import { Coordenada } from "../src/Ruta/Coordenada";
import { Ruta } from "../src/Ruta/Ruta";
import { Usuario } from "../src/Usuario/Usuario";
import { Grupo } from "../src/Grupo/Grupo";
import { Reto } from "../src/Reto/Reto";

import { Gestor } from "../src/Gestor/Gestor";


const usuario = new Usuario("Pepe", "Ciclismo");
const gestor = Gestor.getInstance();

describe("Gestor class tests", () => {
  it("Gestor debería ser una clase singleton", () => {
    expect(Gestor.getInstance()).to.be.equal(gestor);
  });
  it("Gestor debería tener una colección de rutas", () => {
    expect(gestor.rutas).to.be.an("array");
    expect(gestor.rutas).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir rutas", () => {
    const ruta = new Ruta(
      "Ruta de prueba",
      new Coordenada(0, 0),
      new Coordenada(1, 1),
      1,
      1,
      "Ciclismo"
    );
    gestor.addRuta(ruta);
    expect(gestor.rutas).to.have.lengthOf(1);
    expect(gestor.rutas[0].nombre).to.be.equal("Ruta de prueba");
  });
  it("Gestor debería ser capaz de eliminar rutas", () => {
    gestor.removeRuta(gestor.rutas[0].id);
    expect(gestor.rutas).to.be.empty;
  });
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
  it("Gestor debería ser capaz de añadir grupos", () => {
    const grupo = new Grupo("Ciclismo");
    gestor.addGrupo(grupo);
    expect(gestor.grupos).to.have.lengthOf(1);
    expect(gestor.grupos[0].nombre).to.be.equal("Ciclismo");
  });
  it("Gestor debería ser capaz de eliminar grupos", () => {
    gestor.removeGrupo(gestor.grupos[0].id);
    expect(gestor.grupos).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir usuarios a grupos", () => {
    const grupo = new Grupo("Ciclismo");
    gestor.addGrupo(grupo);
    gestor.addUsuario(usuario);
    gestor.grupos[0].addParticipante(usuario.id);
    expect(gestor.grupos[0].participantes).to.have.lengthOf(1);
    expect(gestor.grupos[0].participantes).to.include(usuario.id);
  });
  it("Gestor debería ser capaz de eliminar usuarios de grupos", () => {
    gestor.grupos[0].removeParticipante(usuario.id);
    expect(gestor.grupos[0].participantes).to.be.empty;
  });
  it("Gestor debería tener una colección de retos", () => {
    expect(gestor.retos).to.be.an("array");
    expect(gestor.retos).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir retos", () => {
    const reto = new Reto(
      "Ruta de prueba",
      "Ciclismo",
      1);
    gestor.addReto(reto);
    expect(gestor.retos).to.have.lengthOf(1);
    expect(gestor.retos[0].rutas).to.include(1);
  });
  it("Gestor debería ser capaz de eliminar retos", () => {
    gestor.removeReto(gestor.retos[0].id);
    expect(gestor.retos).to.be.empty;
  });
  it("Gestor debería tener un método para ejecutar un menú", () => {
    expect(gestor.promptUser).to.be.a("function");
  });
});