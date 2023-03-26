/**
 * Interfaz para definir la información de un registro de entrenamiento.
 */
export interface RegistroInfo {
  /**
   * Fecha del registro, en formato "DD-MM-YYYY".
   */
  fecha: string;
  /**
   * Lista de rutas realizadas en el registro.
   */
  rutas: number[];
}

/**
 * Clase para representar un registro de entrenamiento.
 */
export class Registro {
  /**
   * Lista de rutas realizadas en el registro.
   * @private
   * @type {Set<number>}
   */
  private _rutas: Set<number> = new Set<number>();
  constructor(readonly fecha: string, rutas: number[]) {
    this._rutas = new Set<number>(rutas);
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
    return Array.from(this._rutas);
  }

  /**
   * Añade una ruta al registro.
   * @param {number} id - Identificador de la ruta.
   * @example
   * ```typescript
   * const registro = new Registro("2020-01-01", [1, 2, 3]);
   * registro.addRuta(4);
   * registro.rutas; // [1, 2, 3, 4]
   * ```
   */
  addRuta(id: number): void {
    this._rutas.add(id);
  }

  /**
   * Elimina una ruta del registro.
   * @param {number} id - Identificador de la ruta.
   * @example
   * ```typescript
   * const registro = new Registro("2020-01-01", [1, 2, 3]);
   * registro.removeRuta(2);
   * registro.rutas; // [1, 3]
   * ```
   */
  removeRuta(id: number): void {
    this._rutas.delete(id);
  }
}
