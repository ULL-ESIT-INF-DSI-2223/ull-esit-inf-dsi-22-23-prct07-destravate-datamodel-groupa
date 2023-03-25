import "mocha";
import { expect } from "chai";

import { Usuario } from "../src/Usuario/Usuario";
import { EstadisticaUsuario } from "../src/Estadistica/EstadisticaUsuario";

const usuario = new Usuario("Iluzio", "Ciclismo");

describe("Usuario class tests", () => {
  it("Usuario debería tener un nombre", () => {
    expect(usuario.nombre).to.be.a("string");
    expect(usuario.nombre).to.equal("Iluzio");
  });
  it("Usuario debería tener un identificador", () => {
    expect(usuario.id).to.be.a("number");
    expect(usuario.id).to.equal(1);
  });
  it("Usuario debería tener una activad rutinaria", () => {
    expect(usuario.actividad).to.be.a("string");
    expect(usuario.actividad).to.equal("Ciclismo");
  });
  it("Usuario debería tener una lista de amigos", () => {
    expect(usuario.amigos).to.be.a("Set{}");
    expect(usuario.amigos).to.be.empty;
  });
  it("Usuario debería tener una lista de grupos de amigos", () => {
    expect(usuario.grupos).to.be.a("Set{}");
    expect(usuario.grupos).to.be.empty;
  });
  it("Usuario debería tener unas estadísticas", () => {
    expect(usuario.estadisticas).to.be.an.instanceOf(EstadisticaUsuario);
    expect(usuario.estadisticas.dia.km).to.equal(0);
    expect(usuario.estadisticas.dia.desnivel).to.equal(0);
    expect(usuario.estadisticas.semana.km).to.equal(0);
    expect(usuario.estadisticas.semana.desnivel).to.equal(0);
    expect(usuario.estadisticas.mes.km).to.equal(0);
    expect(usuario.estadisticas.mes.desnivel).to.equal(0);
  });
  it("Usuario debería tener una lista de rutas favoritas", () => {
    expect(usuario.rutasFavoritas).to.be.a("Set{}");
    expect(usuario.rutasFavoritas).to.be.empty;
  });
  it("Usuario debería tener una lista de retos activos", () => {
    expect(usuario.retos).to.be.a("Set{}");
    expect(usuario.retos).to.be.empty;
  });
  it("Usuario debería tener un registro de sus rutas", () => {
    expect(usuario.historial).to.be.a("Set{}");
    expect(usuario.historial).to.be.empty;
  });
});
