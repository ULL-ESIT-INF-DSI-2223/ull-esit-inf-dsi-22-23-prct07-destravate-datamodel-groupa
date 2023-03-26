import { Coordenada } from "./Coordenada";
import { BasicRuta } from "./BasicRuta";

/**
 * Definición de actividad para representar el actividad de actividad de una ruta.
 * Puede ser "Ciclismo" o "Running", aunque se pueden añadir más actividades.
 */
export type TipoActividad = "Ciclismo" | "Running";

/**
 * Interfaz para representar la información estándar de una ruta.
 * Se puede considerar una extensión de la información básica de una ruta.
 */
export interface RutaInfo {
  /**
   * Nombre de la ruta, puede ser el nombre de la calle, un alias, un sendero, etc.
   * @type {string}
   */
  nombre: string;
  /**
   * Desnivel medio de la ruta en metros.
   * @type {number}
   */
  desnivel: number;
  /**
   * Lista de usuarios que han realizado la ruta.
   * @type {number[]}
   */
  usuarios: number[];
  /**
   * Método para añadir un usuario a la lista de usuarios que han realizado la ruta.
   * @param id Identificador del usuario a añadir.
   */
  addUsuario(id: number): void;
  /**
   * Método para eliminar un usuario de la lista de usuarios que han realizado la ruta.
   * @param id Identificador del usuario a eliminar.
   */
  removeUsuario(id: number): void;
  /**
   * Tipo de actividad de la ruta, puede ser un sendero de "Ciclismo" o de "Running".
   */
  actividad: TipoActividad;
  /**
   * Calificación de la ruta determinada por los usuarios que la han realizado, en una escala del 1 al 5.
   * @type {number}
   */
  calificacion: number;
}

/**
 * Clase para representar una ruta de la aplicación de rutas deportivas.
 */
export class Ruta extends BasicRuta implements RutaInfo {
  /**
   * Lista de usuarios que han realizado la ruta.
   * @private
   * @type {Set<number>}
   */
  private _usuarios: Set<number> = new Set<number>();

  /**
   * Calificación de la ruta determinada por los usuarios que la han realizado, en una escala del 1 al 5.
   * @private
   * @type {number}
   */
  private _calificacion: number;

  /**
   * Inicializa una nueva instancia de la clase Ruta.
   * @param nombre Nombre de la ruta, puede ser el nombre de la calle, un alias, un sendero, etc.
   * @param inicio Coordenada de inicio de la ruta.
   * @param fin Coordenada de fin de la ruta.
   * @param longitud Longitud de la ruta en kilómetros.
   * @param desnivel Desnivel medio de la ruta en metros.
   * @param actividad Tipo de actividad de la ruta.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ```
   */
  constructor(
    readonly nombre: string,
    inicio: Coordenada,
    fin: Coordenada,
    longitud: number,
    readonly desnivel: number,
    readonly actividad: TipoActividad
  ) {
    super(inicio, fin, longitud);
    this._calificacion = 0;
  }

  /**
   * Método para acceder a la lista de usuarios que han realizado la ruta.
   * @returns Lista con los identificadores de los usuarios que han realizado la ruta.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.usuarios; // []
   * ```
   */
  get usuarios(): number[] {
    return Array.from(this._usuarios);
  }

  /**
   * Método para añadir un usuario a la lista de usuarios que han realizado la ruta.
   * @param id Identificador del usuario que ha realizado la ruta.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.addUsuario(1);
   * ruta.usuarios; // [1]
   * ```
   */
  addUsuario(id: number): void {
    this._usuarios.add(id);
  }

  /**
   * Método para eliminar un usuario de la lista de usuarios que han realizado la ruta.
   * @param id Identificador del usuario a eliminar de la lista de usuarios.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.addUsuario(1);
   * ruta.usuarios; // [1]
   * ruta.removeUsuario(1);
   * ruta.usuarios; // []
   * ```
   */
  removeUsuario(id: number): void {
    this._usuarios.delete(id);
  }

  /**
   * Método para obtener la calificación de la ruta.
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

  /**
   * Método para modificar la calificación de la ruta.
   * @param {number} calificacion - Calificación de la ruta en una escala del 1 al 5.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.calificacion = 3;
   * ruta.calificacion; // 3
   * ```
   */
  set calificacion(calificacion: number) {
    this._calificacion = calificacion;
  }
}
