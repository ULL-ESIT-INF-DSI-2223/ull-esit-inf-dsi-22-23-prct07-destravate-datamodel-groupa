import { IdGenerator } from "../IdGenerator";
import { EstadisticaGrupo } from "../Estadistica/EstadisticaGrupo";
import { Registro } from "../Registro";

/**
 * Interfaz para representar la información básica de un grupo.
 * @interface GrupoInfo
 * @property {number} id - Identificador, único, del grupo.
 * @property {string} nombre - Nombre del grupo.
 * @property {number[]} participantes - IDs de los usuarios del grupo.
 * @property {EstadisticaGrupo} estadisticas - Estadísticas del grupo.
 * @property {number[]} ranking - IDs de los usuarios ordenados por km totales o desnivel acumulado.
 * @property {number[]} rutasFavoritas - IDs de las rutas favoritas del grupo.
 * @property {Registro[]} historial - Lista de registros de entrenamientos del grupo.
 */
export interface GrupoInfo {
  id: number;
  nombre: string;
  participantes: number[];
  estadisticas: EstadisticaGrupo;
  ranking: number[];
  rutasFavoritas: number[];
  historial: Registro[];
}

/**
 * Clase para representar la información de un grupo.
 * @class Grupo
 * @implements GrupoInfo
 * @property {number} id - Identificador, único, del grupo.
 * @property {string} nombre - Nombre del grupo.
 * @property {number[]} participantes - IDs de los usuarios del grupo.
 * @property {EstadisticaGrupo} estadisticas - Estadísticas del grupo.
 * @property {number[]} ranking - IDs de los usuarios ordenados por km totales o desnivel acumulado.
 * @property {number[]} rutasFavoritas - IDs de las rutas favoritas del grupo.
 * @property {Registro[]} historial - Lista de registros de entrenamientos del grupo.
 */
export class Grupo implements GrupoInfo {
  private static idGenerator = new IdGenerator();
  
  public readonly id: number;
  private _participantes: number[] = [];
  private _estadisticas: EstadisticaGrupo = new EstadisticaGrupo();
  private _ranking: number[] = [];
  private _rutasFavoritas: number[] = [];
  private _historial: Registro[] = [];
  
  constructor(
    public nombre: string,
    ...participantes: number[]
  ) {
    this.id = Grupo.idGenerator.generate();
    this._participantes = participantes;
  }
  
  /**
   * Muestra los participantes del grupo.
   * @returns {number[]} - Lista de IDs de los participantes.
   */
  get participantes(): number[] {
    return this._participantes;
  }

  /**
   * Muestra las estadísticas del grupo.
   * @returns {EstadisticaGrupo} - Estadísticas del grupo.
   */
  get estadisticas(): EstadisticaGrupo {
    return this._estadisticas;
  }

  /**
   * Muestra el ranking del grupo.
   * @returns {number[]} - Lista de IDs de los usuarios ordenados por km totales o desnivel acumulado.
   */
  get ranking(): number[] {
    return this._ranking;
  }

  /**
   * Muestra las rutas favoritas del grupo.
   * @returns {number[]} - Lista de IDs de las rutas favoritas del grupo.
   */
  get rutasFavoritas(): number[] {
    return this._rutasFavoritas;
  }

  /**
   * Muestra el historial del grupo.
   * @returns {Registro[]} - Lista de registros de entrenamientos del grupo.
   */
  get historial(): Registro[] {
    return this._historial;
  }
}