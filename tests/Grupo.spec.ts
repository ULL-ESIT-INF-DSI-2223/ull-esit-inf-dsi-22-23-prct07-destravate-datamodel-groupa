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
  it("Grupo debería poder modificar su lista de participantes", () => {
    grupo.addParticipante(1);
    grupo.addParticipante(2);
    grupo.addParticipante(3);
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.have.lengthOf(3);
    expect(grupo.participantes).to.deep.equal([1, 2, 3]);
    grupo.removeParticipante(2);
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.have.lengthOf(2);
    expect(grupo.participantes).to.deep.equal([1, 3]);
  });
  it("Grupo debería tener estadísticas semanales, mensuales y anuales", () => {
    expect(grupo.estadisticas).to.be.a("object");
    expect(grupo.estadisticas).to.have.property("semana");
  });
  it("Grupo debe tener un ranking de sus integrantes", () => {
    expect(grupo.ranking).to.be.a("array");
    expect(grupo.ranking).to.be.empty;
  });
  it("Grupo debería poder modificar su ranking", () => {
    grupo.ranking = [1, 2, 3];
    expect(grupo.ranking).to.be.a("array");
    expect(grupo.ranking).to.deep.equal([1, 2, 3]);
  });
  it("Grupo debe tener una lista de rutas favoritas", () => {
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.be.empty;
  });
  it("Grupo debe poder modificar su lista de rutas favoritas", () => {
    grupo.addRutaFavorita(1);
    grupo.addRutaFavorita(2);
    grupo.addRutaFavorita(3);
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.have.lengthOf(3);
    expect(grupo.rutasFavoritas).to.deep.equal([1, 2, 3]);
    grupo.removeRutaFavorita(2);
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.have.lengthOf(2);
    expect(grupo.rutasFavoritas).to.deep.equal([1, 3]);
  });
  it("Grupo debe tener un historial de entrenamientos", () => {
    expect(grupo.historial).to.be.a("array");
    expect(grupo.historial).to.be.empty;
  });
});
