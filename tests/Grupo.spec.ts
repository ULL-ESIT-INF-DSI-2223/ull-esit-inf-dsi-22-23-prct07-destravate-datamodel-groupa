import "mocha";
import { expect } from "chai";
import { Grupo } from "../src/Grupo/Grupo";

const grupo = new Grupo("Ciclismo");

describe("Grupo class tests", () => {

  it("Grupo debería tener un identificador", () => {
    expect(grupo.id).to.be.a("number");
    expect(grupo.id).to.equal(0);
  });
  it("Grupo debería tener un nombre", () => {
    expect(grupo.nombre).to.be.a("string");
    expect(grupo.nombre).to.equal("Ciclismo");
  });
  it("Grupo debería tener una lista de participantes", () => {
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.be.empty;
  });
  it("Grupo debería tener estadísticas semanales, mensuales y anuales", () => {
    expect(grupo.estadisticas).to.be.a("object");
    expect(grupo.estadisticas).to.have.property("semana");
  });
    
  it("Grupo debe tener una clasificación de sus integrantes", () => {
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.be.empty;
  });
  it("Grupo debe tener un ranking de sus integrantes", () => {
    expect(grupo.ranking).to.be.a("array");
    expect(grupo.ranking).to.be.empty;
  });
  it("Grupo debe tener una lista de rutas favoritas", () => {
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.be.empty;
  });
  it("Grupo debe tener un historial de entrenamientos", () => {
    expect(grupo.historial).to.be.a("array");
    expect(grupo.historial).to.be.empty;
  });
});