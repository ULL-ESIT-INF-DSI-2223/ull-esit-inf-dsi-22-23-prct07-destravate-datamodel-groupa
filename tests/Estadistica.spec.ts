import "mocha";
import { expect } from "chai";

import { EstadisticaUsuario } from "../src/Estadistica/EstadisticaUsuario";
import { EstadisticaGrupo } from "../src/Estadistica/EstadisticaGrupo";

describe("EstadisticaUsuario class tests", () => {
  it("EstadisticaUsuario debería tener estadísticas diarias, semanales, mensuales y anuales", () => {
    const estadistica = new EstadisticaUsuario();
    expect(estadistica.dia.km).to.equal(0);
    expect(estadistica.dia.desnivel).to.equal(0);
    expect(estadistica.semana.km).to.equal(0);
    expect(estadistica.semana.desnivel).to.equal(0);
    expect(estadistica.mes.km).to.equal(0);
    expect(estadistica.mes.desnivel).to.equal(0);
  });
});

describe("EstadisticaGrupo class tests", () => {
  it("EstadisticaGrupo debería tener estadísticas diarias, semanales, mensuales y anuales", () => {
    const estadistica = new EstadisticaGrupo();
    expect(estadistica.semana.km).to.equal(0);
    expect(estadistica.semana.desnivel).to.equal(0);
    expect(estadistica.mes.km).to.equal(0);
    expect(estadistica.mes.desnivel).to.equal(0);
    expect(estadistica.año.km).to.equal(0);
    expect(estadistica.año.desnivel).to.equal(0);
  });
});