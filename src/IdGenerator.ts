/**
 * Clase para poder generar los ids únicos de cada una
 * de las clases._amigos.
 * @class IdGenerator
 * @param {number} ids - Ids únicos de cada una de las clases.
 */
export class IdGenerator {
  private ids: number;
  constructor() {
    this.ids = 0;
  }

  /**
   * Método para generar cada uno de los ids únicos.
   * @returns {number} Devuelve el id del nuevo usuario, ruta, 
   * grupo o reto.
   */
  generate(): number {
    const newId = this.ids++;
    return newId;
  }
}