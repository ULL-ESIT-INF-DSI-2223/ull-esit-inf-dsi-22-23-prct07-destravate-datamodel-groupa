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
    expect(usuario.id).to.equal(0);
  });
  it("Usuario debería tener una activad rutinaria", () => {
    expect(usuario.actividad).to.be.a("string");
    expect(usuario.actividad).to.equal("Ciclismo");
    usuario.actividad = "Running";
    expect(usuario.actividad).to.equal("Running");
  });
  it("Usuario debería tener una lista de amigos", () => {
    expect(usuario.amigos).to.be.a("array");
    expect(usuario.amigos).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de amigos", () => {
    usuario.addAmigo(1);
    expect(usuario.amigos).to.deep.equal([1]);
    usuario.removeAmigo(1);
    expect(usuario.amigos).to.be.empty;
  });
  it("Usuario debería tener una lista de grupos de amigos", () => {
    expect(usuario.grupos).to.be.a("array");
    expect(usuario.grupos).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de grupos de amigos", () => {
    usuario.addGrupo(1);
    expect(usuario.grupos).to.deep.equal([1]);
    usuario.removeGrupo(1);
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
  it("Usuario debería poder modificar sus estadísticas", () => {
    usuario.estadisticas.dia.km = 10;
    usuario.estadisticas.dia.desnivel = 100;
    usuario.estadisticas.semana.km = 100;
    usuario.estadisticas.semana.desnivel = 1000;
    usuario.estadisticas.mes.km = 1000;
    usuario.estadisticas.mes.desnivel = 10000;
    expect(usuario.estadisticas.dia.km).to.equal(10);
    expect(usuario.estadisticas.dia.desnivel).to.equal(100);
    expect(usuario.estadisticas.semana.km).to.equal(100);
    expect(usuario.estadisticas.semana.desnivel).to.equal(1000);
    expect(usuario.estadisticas.mes.km).to.equal(1000);
    expect(usuario.estadisticas.mes.desnivel).to.equal(10000);
  });
  it("Usuario debería tener una lista de rutas favoritas", () => {
    expect(usuario.rutasFavoritas).to.be.a("array");
    expect(usuario.rutasFavoritas).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de rutas favoritas", () => {
    usuario.addRutaFavorita(1);
    expect(usuario.rutasFavoritas).to.deep.equal([1]);
    usuario.removeRutaFavorita(1);
    expect(usuario.rutasFavoritas).to.be.empty;
  });
  it("Usuario debería tener una lista de retos activos", () => {
    expect(usuario.retos).to.be.a("array");
    expect(usuario.retos).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de retos activos", () => {
    usuario.addReto(1);
    expect(usuario.retos).to.deep.equal([1]);
    usuario.removeReto(1);
    expect(usuario.retos).to.be.empty;
  });
  it("Usuario debería tener un registro de sus rutas", () => {
    expect(usuario.historial).to.be.a("array");
    expect(usuario.historial).to.be.empty;
  });
});
