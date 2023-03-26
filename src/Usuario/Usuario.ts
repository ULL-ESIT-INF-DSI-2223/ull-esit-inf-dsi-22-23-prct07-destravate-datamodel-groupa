import { BasicUsuario } from "./BasicUsuario";
import { TipoActividad } from "../Ruta/Ruta";
import { EstadisticaUsuario } from "../Estadistica/EstadisticaUsuario";
import { Registro } from "../Otros/Registro";

/**
 * Interfaz para representar la información de un usuario estándar para la aplicación.
 * Sirve como una extensión de la información básica de un usuario.
 */
export interface UsuarioInfo {
  /**
   * Lista de los ids de los amigos del usuario.
   * @type {number[]}
   */
  amigos: number[];
  /**
   * Método para añadir un amigo a la lista de amigos del usuario.
   * @param id Identificador del amigo a añadir.
   */
  addAmigo(id: number): void;
  /**
   * Método para eliminar un amigo de la lista de amigos del usuario.
   * @param id Identificador del amigo a eliminar.
   */
  removeAmigo(id: number): void;
  /**
   * Lista de los ids de los grupos del usuario.
   * @type {number[]}
   */
  grupos: number[];
  /**
   * Método para añadir un grupo a la lista de grupos del usuario.
   * @param id Identificador del grupo a añadir.
   */
  addGrupo(id: number): void;
  /**
   * Método para eliminar un grupo de la lista de grupos del usuario.
   * @param id Identificador del grupo a eliminar.
   */
  removeGrupo(id: number): void;
  /**
   * Estadísticas del usuario diarias, semanales y mensuales.
   * @type {EstadisticaUsuario}
   */
  estadisticas: EstadisticaUsuario;
  /**
   * Lista de los ids de las rutas favoritas del usuario.
   * @type {number[]}
   */
  rutasFavoritas: number[];
  /**
   * Método para añadir una ruta a la lista de rutas favoritas del usuario.
   * @param id Identificador de la ruta a añadir.
   */
  addRutaFavorita(id: number): void;
  /**
   * Método para eliminar una ruta de la lista de rutas favoritas del usuario.
   * @param id Identificador de la ruta a eliminar.
   */
  removeRutaFavorita(id: number): void;
  /**
   * Lista de los ids de los retos del usuario.
   * @type {number[]}
   */
  retos: number[];
  /**
   * Método para añadir un reto a la lista de retos del usuario.
   * @param id Identificador del reto a añadir.
   */
  addReto(id: number): void;
  /**
   * Método para eliminar un reto de la lista de retos del usuario.
   * @param id Identificador del reto a eliminar.
   */
  removeReto(id: number): void;
  /**
   * Lista de los registros diarios del usuario.
   * @type {Registro[]}
   */
  historial: Registro[];
}

/**
 * Clase para representar la información de un usuario para la aplicación.
<<<<<<< HEAD
 * El usuario cuenta con un identificador único, un nombre, amigos, grupos de amigos,
 * estadísticas, rutas favoritas, retos y un historial de registros.
 */
export class Usuario extends BasicUsuario implements UsuarioInfo {
  /**
   * Lista de los ids de los amigos del usuario.
   * @private
   * @type {Set<number>}
   */
  private _amigos: Set<number> = new Set();
  /**
   * Lista de los ids de los grupos del usuario.
   * @private
   * @type {Set<number>}
   */
  private _grupos: Set<number> = new Set();
  /**
   * Estadísticas del usuario diarias, semanales y mensuales.
   * @private
   * @type {EstadisticaUsuario}
   */
  private _estadisticas: EstadisticaUsuario = new EstadisticaUsuario();
  /**
   * Lista de los ids de las rutas favoritas del usuario.
   * @private
   * @type {Set<number>}
   */
  private _rutasFavoritas: Set<number> = new Set();
  /**
   * Lista de los ids de los retos del usuario.
   * @private
   * @type {Set<number>}
   */
  private _retos: Set<number> = new Set();
  /**
   * Lista de los registros diarios del usuario.
   * @private
   * @type {Registro[]}
   */
  private _historial: Registro[] = [];

  /**
   * Inicializa una nueva instancia de la clase Usuario.
   * @param nombre Nombre o alias del usuario.
   * @param actividad Actividad principal del usuario.
   */
  constructor(nombre: string, actividad: TipoActividad) {
    super(nombre, actividad);
  }

  /**
   * Método para acceder a la lista de amigos del usuario.
   * @returns {Set<number>} Lista de amigos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.amigos; // []
   * ```
   */
  get amigos(): number[] {
    return Array.from(this._amigos);
  }

  /**
   * Método para añadir un amigo a la lista de amigos del usuario.
   * @param id Identificador del amigo a añadir.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.amigos; // []
   * usuario.addAmigo(1);
   * usuario.amigos; // [1]
   * ```
   */
  addAmigo(id: number): void {
    this._amigos.add(id);
  }

  /**
   * Método para eliminar un amigo de la lista de amigos del usuario.
   * @param id Identificador del amigo a eliminar.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.amigos; // []
   * usuario.addAmigo(1);
   * usuario.removeAmigo(1);
   * usuario.amigos; // []
   */
  removeAmigo(id: number): void {
    this._amigos.delete(id);
  }

  /**
   * Método para acceder a la lista de grupos del usuario.
   * @returns {number[]} Lista de grupos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.grupos; // []
   * ```
   */
  get grupos(): number[] {
    return Array.from(this._grupos);
  }

  /**
   * Método para añadir un grupo a la lista de grupos del usuario.
   * @param id Identificador del grupo a añadir.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.grupos; // []
   * usuario.addGrupo(1);
   * usuario.grupos; // [1]
   * ```
   */
  addGrupo(id: number): void {
    this._grupos.add(id);
  }

  /**
   * Método para eliminar un grupo de la lista de grupos del usuario.
   * @param id Identificador del grupo a eliminar.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.grupos; // []
   * usuario.addGrupo(1);
   * usuario.removeGrupo(1);
   * usuario.grupos; // []
   * ```
   */
  removeGrupo(id: number): void {
    this._grupos.delete(id);
  }

  /**
   * Método para acceder a las estadísticas del usuario.
   * @returns {EstadisticaUsuario} Estadísticas del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
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
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.rutasFavoritas; // []
   * ```
   */
  get rutasFavoritas(): number[] {
    return Array.from(this._rutasFavoritas);
  }

  /**
   * Método para añadir una ruta a la lista de rutas favoritas del usuario.
   * @param id Identificador de la ruta a añadir.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.rutasFavoritas; // []
   * usuario.addRutaFavorita(1);
   * usuario.rutasFavoritas; // [1]
   * ```
   */
  addRutaFavorita(id: number): void {
    this._rutasFavoritas.add(id);
  }

  /**
   * Método para eliminar una ruta de la lista de rutas favoritas del usuario.
   * @param id Identificador de la ruta a eliminar.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.rutasFavoritas; // []
   * usuario.addRutaFavorita(1);
   * usuario.removeRutaFavorita(1);
   * usuario.rutasFavoritas; // []
   * ```
   */
  removeRutaFavorita(id: number): void {
    this._rutasFavoritas.delete(id);
  }

  /**
   * Método para acceder a la lista de retos activos del usuario.
   * @returns {Set<number>} Lista de retos activos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.retos; // []
   * ```
   */
  get retos(): number[] {
    return Array.from(this._retos);
  }

  /**
   * Método para añadir un reto a la lista de retos activos del usuario.
   * @param id Identificador del reto a añadir.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.retos; // []
   * usuario.addReto(1);
   * usuario.retos; // [1]
   * ```
   */
  addReto(id: number): void {
    this._retos.add(id);
  }

  /**
   * Método para eliminar un reto de la lista de retos activos del usuario.
   * @param id Identificador del reto a eliminar.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.retos; // []
   * usuario.addReto(1);
   * usuario.removeReto(1);
   * usuario.retos; // []
   * ```
   */
  removeReto(id: number): void {
    this._retos.delete(id);
  }

  /**
   * Método para acceder a la lista de registros de entrenamientos del usuario.
   * @returns {Registro[]} Lista de registros de entrenamientos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", "Ciclismo");
   * usuario.historial; // []
   * ```
   */
  get historial(): Registro[] {
    return this._historial;
  }
}
