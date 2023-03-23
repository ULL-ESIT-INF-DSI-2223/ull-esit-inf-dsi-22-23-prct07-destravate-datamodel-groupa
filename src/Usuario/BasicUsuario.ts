import { TipoActividad } from "../Ruta/Ruta";

/**
 * Interfaz para representar la información básica de un usuario.
 * @interface BasicUsuarioInfo
 * @property {string} nombre - Nombre del usuario.
 * @property {number} id - Identificador del usuario.
 * @property {TipoActividad} actividad - actividad de actividad del usuario.
 */
export interface BasicUsuarioInfo {
  nombre: string;
  id: number;
  actividad: TipoActividad;
}

/**
 * Clase para representar la información básica de un usuario.
 * @class BasicUsuario
 * @implements {BasicUsuarioInfo}
 * @param {string} nombre - Nombre del usuario.
 * @param {number} id - Identificador del usuario.
 * @param {TipoActividad} actividad - actividad de actividad del usuario.
 */
export abstract class BasicUsuario implements BasicUsuarioInfo {
  protected _actividad: TipoActividad;
  constructor(
    readonly nombre: string,
    readonly id: number,
    actividad: TipoActividad
  ) {
    this._actividad = actividad;
  }

  /**
   * Método para acceder a la actividad del usuario.
   * @returns {TipoActividad} Actividad del usuario.
   * @example
   * ```typescript
   * const usuario = new BasicUsuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.actividad; // "Ciclismo"
   * ```
   */
  get actividad(): TipoActividad {
    return this._actividad;
  }
}