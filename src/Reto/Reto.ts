import { TipoActividad } from "../Ruta/Ruta";
import { IdGenerator } from "../Otros/IdGenerator";

/**
 * Interfaz para representar la información de un reto para la aplicación.
 * Cada reto debe contar con un identificador único, un nombre, una lista de rutas, un tipo de actividad
 * (en bicicleta o corriendo), un número de kilómetros y una lista de usuarios.
 */
export interface RetoInfo {
  /**
   * Identificador, único, del reto.
   * @type {number}
   */
  id: number;
  /**
   * Nombre del reto.
   * @type {string}
   */
  nombre: string;
  /**
   * Rutas que forman parte del reto.
   * @type {number[]}
   */
  rutas: number[];
  /**
   * Método para añadir una ruta al reto.
   * @param id Identificador de la ruta a añadir.
   */
  addRuta(id: number): void;
  /**
   * Método para eliminar una ruta del reto.
   * @param id Identificador de la ruta a eliminar.
   */
  removeRuta(id: number): void;
  /**
   * Tipo de actividad del reto, en bicicleta o corriendo.
   * @type {TipoActividad}
   */
  tipo: TipoActividad;
  /**
   * Kilómetros totales del reto.
   * @type {number}
   */
  km: number;
  /**
   * Usuarios que están realizando el reto.
   * @type {number[]}
   */
  usuarios: number[];
  /**
   * Método para añadir un usuario al reto.
   * @param id Identificador del usuario a añadir.
   */
  addUsuario(id: number): void;
  /**
   * Método para eliminar un usuario del reto.
   * @param id Identificador del usuario a eliminar.
   */
  removeUsuario(id: number): void;
}

/**
 * Clase para representar un reto para la aplicación de rutas.
 */
export class Reto implements RetoInfo {
  /**
   * Generador de IDs para los retos.
   * @private
   * @static
   * @type {IdGenerator}
   */
  private static idGenerator = new IdGenerator();
  /**
   * Identificador, único, del reto.
   * @type {number}
   * @readonly
   */
  public readonly id: number;
  /**
   * Rutas que forman parte del reto.
   * @private
   * @type {Set<number>}
   */
  private _rutas: Set<number> = new Set<number>();
  /**
   * Usuarios que están realizando el reto.
   * @private
   * @type {Set<number>}
   */
  private _usuarios: Set<number> = new Set<number>();
  /**
   * Kilómetros totales del reto.
   * @private
   * @type {number}
   * @default 0
   */
  private _km: number;

  /**
   * Inicializa una instancia de la clase Reto.
   * @param nombre Nombre del reto.
   * @param tipo Tipo de actividad del reto, en bicicleta o corriendo.
   * @param rutas Rutas que forman parte del reto.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * ```
   */
  constructor(
    public nombre: string,
    public readonly tipo: TipoActividad,
    ...rutas: number[]
  ) {
    this.id = Reto.idGenerator.generate();
    this._rutas = new Set<number>(rutas);
    this._km = 0;
  }

  /**
   * Método para acceder a la lista de rutas que forman parte del reto.
   * @returns {number[]} - Rutas que forman parte del reto.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * console.log(reto.rutas); // [1, 2, 3]
   * ```
   */
  get rutas(): number[] {
    return Array.from(this._rutas);
  }

  /**
   * Método para añadir una ruta al reto.
   * @param id Identificador de la ruta a añadir.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * console.log(reto.rutas); // [1, 2, 3]
   * reto.addRuta(4);
   * console.log(reto.rutas); // [1, 2, 3, 4]
   * ```
   */
  addRuta(id: number): void {
    this._rutas.add(id);
  }

  /**
   * Método para eliminar una ruta del reto.
   * @param id Identificador de la ruta a eliminar.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * console.log(reto.rutas); // [1, 2, 3]
   * reto.removeRuta(2);
   * console.log(reto.rutas); // [1, 3]
   * ```
   */
  removeRuta(id: number): void {
    this._rutas.delete(id);
  }

  /**
   * Método para acceder a la lista de usuarios que están realizando el reto.
   * @returns {number} - Número de usuarios que realizan el reto.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * console.log(reto.usuarios); // []
   * reto.addUsuario(1);
   * console.log(reto.usuarios); // [1]
   * reto.addUsuario(2);
   * ```
   */
  get usuarios(): number[] {
    return Array.from(this._usuarios);
  }

  /**
   * Método para añadir un usuario al reto.
   * @param id Identificador del usuario a añadir.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * reto.addUsuario(1);
   * console.log(reto.usuarios); // [1]
   * reto.addUsuario(2);
   * console.log(reto.usuarios); // [1, 2]
   * ```
   */
  addUsuario(id: number): void {
    this._usuarios.add(id);
  }

  /**
   * Método para eliminar un usuario del reto.
   * @param id Identificador del usuario a eliminar.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * reto.addUsuario(1);
   * reto.addUsuario(2);
   * console.log(reto.usuarios); // [1, 2]
   * reto.removeUsuario(1);
   * console.log(reto.usuarios); // [2]
   * ```
   */
  removeUsuario(id: number): void {
    this._usuarios.delete(id);
  }

  /**
   * Método para acceder a los kilómetros totales del reto.
   * @returns {number} - Kilómetros totales del reto.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * console.log(reto.km); // 0
   * ```
   */
  get km(): number {
    return this._km;
  }

  /**
   * Método para modificar los kilómetros totales del reto.
   * @param km Kilómetros totales del reto.
   * @example
   * ```typescript
   * const reto = new Reto("Reto de la semana", TipoActividad.BICICLETA, 1, 2, 3);
   * reto.km = 10;
   * console.log(reto.km); // 10
   * ```
   */
  set km(km: number) {
    this._km = km;
  }
}