/**
 * Clase para poder generar los ids únicos de cada una
 * de las clases que requieran un id.
 */
export class IdGenerator {
  /**
   * Atributo para almacenar el id que se va a generar.
   * @private
   * @type {number}
   */
  private ids: number;

  /**
   * Inicializa una nueva instancia de la clase IdGenerator.
   * @example
   * ```typescript
   * const idGenerator = new IdGenerator();
   * ```
   */
  constructor() {
    this.ids = 0;
  }

  /**
   * Método para generar cada uno de los ids únicos.
   * @returns {number} Devuelve el id del nuevo usuario, ruta, grupo o reto.
   * @example
   * ```typescript
   * const idGenerator = new IdGenerator();
   * idGenerator.generate(); // 0
   * idGenerator.generate(); // 1
   * idGenerator.generate(); // 2
   * ```
   */
  generate(): number {
    const newId = this.ids++;
    return newId;
  }
}
