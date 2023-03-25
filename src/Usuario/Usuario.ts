import { BasicUsuario } from "./BasicUsuario";
import { TipoActividad } from "../Ruta/Ruta";
import { EstadisticaUsuario } from "../Estadistica/EstadisticaUsuario";
import { Registro } from "../Registro";

/**
 * Interfaz para representar la información de un usuario para la aplicación.
 * @interface UsuarioInfo
 * @property {Set<number>} amigos - Lista de amigos del usuario.
 * @property {Set<number>} grupos - Lista de grupos del usuario.
 * @property {EstadisticaUsuario} estadisticas - Estadísticas diarias, semanales y mensuales del usuario.
 * @property {Set<number>} rutasFavoritas - Lista de rutas favoritas del usuario.
 * @property {Set<number>} retos - Lista de retos activos del usuario.
 * @property {Registro[]} historial - Lista de registros de entrenamientos del usuario.
 */
export interface UsuarioInfo {
  amigos: Set<number>;
  grupos: Set<number>;
  estadisticas: EstadisticaUsuario;
  rutasFavoritas: Set<number>;
  retos: Set<number>;
  historial: Registro[];
}

/**
 * Clase para representar la información de un usuario para la aplicación.
 * @class Usuario
 * @extends {BasicUsuario}
 * @implements {UsuarioInfo}
 * @param {string} nombre - Nombre del usuario. 
 * @param {number} id - Identificador del usuario.
 * @param {TipoActividad} actividad - actividad de actividad del usuario.
 * @param {Set<number>} amigos - Lista de amigos del usuario.
 * @param {Set<number>} grupos - Lista de grupos del usuario.
 */
export class Usuario extends BasicUsuario implements UsuarioInfo {
  protected _amigos: Set<number>;
  protected _grupos: Set<number>;
  protected _estadisticas: EstadisticaUsuario = new EstadisticaUsuario();
  protected _rutasFavoritas: Set<number>;
  protected _retos: Set<number>;
  protected _historial: Registro[] = [];

  constructor(nombre: string, actividad: TipoActividad) {
    super(nombre, actividad);
    this._amigos = new Set();
    this._grupos = new Set();
    this._rutasFavoritas = new Set();
    this._retos = new Set();
  }

  /**
   * Método para acceder a la lista de amigos del usuario.
   * @returns {Set<number>} Lista de amigos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.amigos; // []
   * ```
   */
  get amigos(): Set<number> {
    return this._amigos;
  }

  /**
   * Método para acceder a la lista de grupos del usuario.
   * @returns {Set<number>} Lista de grupos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.grupos; // []
   * ```
   */
  get grupos(): Set<number> {
    return this._grupos;
  }

  /**
   * Método para acceder a las estadísticas del usuario.
   * @returns {EstadisticaUsuario} Estadísticas del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.estadisticas.dia.km; // 0
   * usuario.estadisticas.dia.desnivel; // 0
   * usuario.estadisticas.semana.km; // 0
   * usuario.estadisticas.semana.desnivel; // 0
   * usuario.estadisticas.mes.km; // 0
   * usuario.estadisticas.mes.desnivel; // 0
   * ```
   */
  get estadisticas(): EstadisticaUsuario {
    return this._estadisticas;
  }

  /**
   * Método para acceder a la lista de rutas favoritas del usuario.
   * @returns {Set<number>} Lista de rutas favoritas del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.rutasFavoritas; // []
   * ```
   */
  get rutasFavoritas(): Set<number> {
    return this._rutasFavoritas;
  }

  /**
   * Método para acceder a la lista de retos activos del usuario.
   * @returns {Set<number>} Lista de retos activos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.retos; // []
   * ```
   */
  get retos(): Set<number> {
    return this._retos;
  }

  /**
   * Método para acceder a la lista de registros de entrenamientos del usuario.
   * @returns {Registro[]} Lista de registros de entrenamientos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.historial; // []
   * ```
   */
  get historial(): Registro[] {
    return this._historial;
  }
}
