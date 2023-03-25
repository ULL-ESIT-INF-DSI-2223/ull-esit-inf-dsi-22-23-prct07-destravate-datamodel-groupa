import { TipoActividad } from "../Ruta/Ruta";
import { IdGenerator } from "../IdGenerator";

/**
 * Interfaz para representar la información de un reto para la aplicación.
 * @interface RetoInfo
 * @property {number} id - Identificador, único, del reto.
 * @property {string} nombre - Nombre del reto.
 * @property {number[]} rutas - Rutas que forman parte del reto.
 * @property {TipoActividad} tipo - Tipo de actividad del reto, en bicicleta o corriendo.
 * @property {number} km - Kilómetros totales del reto.
 * @property {number[]} usuarios - Usuarios que están realizando el reto.
 */
export interface RetoInfo {
  id: number;
  nombre: string;
  rutas: number[];
  tipo: TipoActividad;
  km: number;
  usuarios: number[];
}

/**
 * Clase para representar un reto para la aplicación.
 * @class Reto
 * @implements RetoInfo
 * @property {number} id - Identificador, único, del reto.
 * @property {string} nombre - Nombre del reto.
 * @property {number[]} rutas - Rutas que forman parte del reto.
 * @property {TipoActividad} tipo - Tipo de actividad del reto, en bicicleta o corriendo.
 * @property {number} km - Kilómetros totales del reto.
 * @property {number[]} usuarios - Usuarios que están realizando el reto.
 */
export class Reto implements RetoInfo {
  private static idGenerator = new IdGenerator();
  public readonly id: number;
  private _rutas: number[] = [];
  private _usuarios: number[] = [];
  private _km: number;
  
  constructor(public nombre: string, public readonly tipo: TipoActividad, ...rutas: number[]) {
    this.id = Reto.idGenerator.generate();
    this._rutas = rutas;
    this._km = 0;
  }

  /**
   * Devuelve las rutas que forman parte del reto.
   * @returns {number[]} - Rutas que forman parte del reto.
   */
  get rutas(): number[] {
    return this._rutas;
  }

  /**
   * Devuelve el número de usuarios que realizan el reto.
   * @returns {number} - Número de usuarios que realizan el reto.
   */
  get usuarios(): number[] {
    return this._usuarios;
  }

  /**
   * Devuelve los kilómetros totales del reto.
   * @returns {number} - Kilómetros totales del reto.
   */
  get km(): number {
    return this._km;
  }
}