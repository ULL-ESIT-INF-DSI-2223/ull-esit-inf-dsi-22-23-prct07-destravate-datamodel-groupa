/**
 * Interfaz para definir la información de un registro de entrenamiento.
 * @interface RegistroInfo
 * @property {string} fecha - Fecha del registro.
 * @property {number[]} rutas - Lista de rutas realizadas en el registro.
 */
export interface RegistroInfo {
  readonly fecha: string;
  rutas: number[];
  }

/**
 * Clase para representar un registro de entrenamiento.
 * @class Registro
 * @implements {RegistroInfo}
 * @property {string} fecha - Fecha del registro.
 * @property {number[]} rutas - Lista de rutas realizadas en el registro.
 * @method addRuta - Añade una ruta al registro.
 */
export class Registro {
  private _rutas: number[] = [];
  constructor(readonly fecha: string, rutas: number[]) {
    this._rutas = rutas;
  }

  /**
   * Lista de rutas realizadas en el registro.
   * @returns {number[]}
   * @example
   * ```typescript
   * const registro = new Registro("2020-01-01", [1, 2, 3]);
   * registro.rutas; // [1, 2, 3]
   * ```
   */
  get rutas(): number[] {
    return this._rutas;
  }

  /**
   * Añade una ruta al registro.
   * @param {number} id - Identificador de la ruta.
   * @returns {void}
   * @example
   * ```typescript
   * const registro = new Registro("2020-01-01", [1, 2, 3]);
   * registro.addRuta(4);
   * registro.rutas; // [1, 2, 3, 4]
   * ```
   */
  addRuta(id: number): void {
    if (this._rutas.includes(id)) 
      return;
    this._rutas.push(id);
  }
}
