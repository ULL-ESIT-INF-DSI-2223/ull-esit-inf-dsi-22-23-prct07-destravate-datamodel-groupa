import { IdGenerator } from "../Otros/IdGenerator";
import { EstadisticaGrupo } from "../Estadistica/EstadisticaGrupo";
import { Registro } from "../Otros/Registro";

/**
 * Interfaz para representar la información básica de un grupo.
 * Cada grupo debe contar con un identificador único, un nombre y una lista de participantes, aparte
 * de las estadísticas, el ranking, las rutas favoritas y el historial de entrenamientos.
 */
export interface GrupoInfo {
  /**
   * Identificador, único, del grupo.
   * @type {number}
   */
  id: number;
  /**
   * Nombre del grupo, puede ser una organización, una asociación, un club deportivo, etc.
   * @type {string}
   */
  nombre: string;
  /**
   * Lista de IDs de los usuarios del grupo.
   * @type {number[]}
   */
  participantes: number[];
  /**
   * Método para añadir un participante al grupo.
   * @param id Identificador del participante a añadir.
   */
  addParticipante(id: number): void;
  /**
   * Método para eliminar un participante del grupo.
   * @param id Identificador del participante a eliminar.
   */
  removeParticipante(id: number): void;
  /**
   * Estadísticas del grupo.
   * @type {EstadisticaGrupo}
   */
  estadisticas: EstadisticaGrupo;
  /**
   * Lista de IDs de los usuarios ordenados por km totales o desnivel acumulado.
   * @type {number[]}
   */
  ranking: number[];
  /**
   * Lista de IDs de las rutas favoritas del grupo.
   * @type {number[]}
   */
  rutasFavoritas: number[];
  /**
   * Método para añadir una ruta a la lista de rutas favoritas del grupo.
   * @param id Identificador de la ruta a añadir.
   */
  addRutaFavorita(id: number): void;
  /**
   * Método para eliminar una ruta de la lista de rutas favoritas del grupo.
   * @param id Identificador de la ruta a eliminar.
   */
  removeRutaFavorita(id: number): void;
  /**
   * Lista de registros de entrenamientos del grupo.
   */
  historial: Registro[];
}

/**
 * Clase para representar a un grupo de usuarios de la aplicación.
 * Puede ser utilizada para representar a una organización, una asociación, un club deportivo, etc.
 */
export class Grupo implements GrupoInfo {
  /**
   * Generador de IDs para los grupos.
   * @private
   * @static
   * @type {IdGenerator}
   */
  private static idGenerator = new IdGenerator();

  /**
   * Identificador, único, del grupo, generado automáticamente.
   * @readonly
   * @type {number}
   */
  public readonly id: number;
  /**
   * Lista de IDs de los usuarios del grupo.
   * @private
   * @type {Set<number>}
   */
  private _participantes: Set<number> = new Set();
  /**
   * Estadísticas del grupo.
   * @private
   * @type {EstadisticaGrupo}
   */
  private _estadisticas: EstadisticaGrupo = new EstadisticaGrupo();
  /**
   * Lista de IDs de los usuarios ordenados por km totales o desnivel acumulado.
   * @private
   * @type {number[]}
   */
  private _ranking: number[] = [];
  /**
   * Lista de IDs de las rutas favoritas del grupo.
   * @private
   * @type {Set<number>}
   */
  private _rutasFavoritas: Set<number> = new Set();
  /**
   * Lista de registros de entrenamientos del grupo.
   * @private
   * @type {Registro[]}
   */
  private _historial: Registro[] = [];

  /**
   * Crea una instancia de Grupo.
   * @param {string} nombre - Nombre del grupo.
   * @param {number[]} participantes - Lista de IDs de los participantes del grupo.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * ```
   */
  constructor(public nombre: string, ...participantes: number[]) {
    this.id = Grupo.idGenerator.generate();
    this._participantes = new Set(participantes);
  }

  /**
   * Método para obtener la lista de participantes del grupo.
   * @returns {number[]} - Lista de IDs de los participantes.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.participantes; // [1, 2, 3]
   * ```
   */
  get participantes(): number[] {
    return Array.from(this._participantes);
  }

  /**
   * Método para añadir un participante al grupo.
   * @param {number} id - ID del usuario a añadir.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.addParticipante(4);
   * grupo.participantes; // [1, 2, 3, 4]
   * ```
   */
  addParticipante(id: number): void {
    this._participantes.add(id);
  }

  /**
   * Método para eliminar un participante del grupo.
   * @param {number} id - ID del usuario a eliminar.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.removeParticipante(2);
   * grupo.participantes; // [1, 3]
   * ```
   */
  removeParticipante(id: number): void {
    this._participantes.delete(id);
  }

  /**
   * Método para acceder a las estadísticas del grupo.
   * @returns {EstadisticaGrupo} - Estadísticas del grupo.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.estadisticas; // EstadisticaGrupo { kmTotales: 0, desnivelAcumulado: 0 }
   * ```
   */
  get estadisticas(): EstadisticaGrupo {
    return this._estadisticas;
  }

  /**
   * Método para acceder al ranking del grupo.
   * @returns {number[]} - Lista de IDs de los usuarios ordenados por km totales o desnivel acumulado.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.ranking; // []
   * ```
   */
  get ranking(): number[] {
    return this._ranking;
  }

  /**
   * Método para modificar el ranking del grupo.
   * @param {number[]} ranking - Lista de IDs de los usuarios ordenados por km totales o desnivel acumulado.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.ranking = [1, 2, 3];
   * grupo.ranking; // [1, 2, 3]
   * ```
   */
  set ranking(ranking: number[]) {
    this._ranking = ranking;
  }

  /**
   * Método para acceder a las rutas favoritas del grupo.
   * @returns {number[]} - Lista de IDs de las rutas favoritas del grupo.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.rutasFavoritas; // []
   * ```
   */
  get rutasFavoritas(): number[] {
    return Array.from(this._rutasFavoritas);
  }

  /**
   * Método para añadir una ruta favorita al grupo.
   * @param {number} id - ID de la ruta a añadir.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.addRutaFavorita(1);
   * grupo.rutasFavoritas; // [1]
   * ```
   */
  addRutaFavorita(id: number): void {
    this._rutasFavoritas.add(id);
  }

  /**
   * Método para eliminar una ruta favorita del grupo.
   * @param id ID de la ruta a eliminar.
   * @example
   * ```typescript
   * const grupo = new Grupo("Club de ciclismo", 1, 2, 3);
   * grupo.addRutaFavorita(1);
   * grupo.rutasFavoritas; // [1]
   * grupo.removeRutaFavorita(1);
   * grupo.rutasFavoritas; // []
   * ```
   */
  removeRutaFavorita(id: number): void {
    this._rutasFavoritas.delete(id);
  }

  /**
   * Método para acceder al historial de entrenamientos del grupo.
   * @returns {Registro[]} - Lista de registros de entrenamientos del grupo.
   */
  get historial(): Registro[] {
    return this._historial;
  }
}
