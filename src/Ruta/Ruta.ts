import { Coordenada } from "./BasicRuta";
import { BasicRuta } from "./BasicRuta";

/**
 * Definición de actividad para representar el actividad de actividad de una ruta.
 * @type {TipoActividad}
 * @property {string} Ciclismo - Actividad de ciclismo.
 * @property {string} Running - Actividad de running.
 */
export type TipoActividad = "Ciclismo" | "Running";

/**
 * Interfaz para representar la información de una ruta.
 * @interface RutaInfo
 * @property {string} nombre - Nombre de la ruta.
 * @property {number} desnivel - Desnivel medio de la ruta en metros.
 * @property {number[]} usuarios - Lista de usuarios que han realizado la ruta.
 * @property {TipoActividad} actividad - actividad de actividad de la ruta.
 * @property {number} calificacion - Calificación de la ruta en una escala del 1 al 5.
 */
interface RutaInfo {
  nombre: string;
  desnivel: number;
  usuarios: number[];
  actividad: TipoActividad;
  calificacion: number;
}

export class Ruta extends BasicRuta implements RutaInfo {
  private _usuarios: number[];
  private _calificacion: number;
  constructor(
    readonly nombre: string,
    id: number,
    inicio: Coordenada,
    fin: Coordenada,
    longitud: number,
    readonly desnivel: number,
    readonly actividad: TipoActividad
  ) {
    super(id, inicio, fin, longitud);
    this._usuarios = [];
    this._calificacion = 0;
  }

  /**
   * Método para acceder a la lista de usuarios que han realizado la ruta.
   * @returns {number[]} Lista de usuarios que han realizado la ruta.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.usuarios; // []
   * ```
   */
  get usuarios(): number[] {
    return this._usuarios;
  }

  /**
   * Método para acceder a la calificación de la ruta.
   * @returns {number} Calificación de la ruta en una escala del 1 al 5.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.calificacion; // 0
   * ```
   */
  get calificacion(): number {
    return this._calificacion;
  }
}
