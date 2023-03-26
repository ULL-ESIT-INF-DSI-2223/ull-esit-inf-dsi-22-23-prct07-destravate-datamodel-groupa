import { IdGenerator } from "../Otros/IdGenerator";
import { Coordenada } from "./Coordenada";

/**
 * Interfaz para representar la información básica de una ruta en la aplicación.
 * Las rutas deben tener un identificador único, una coordenada de inicio, una coordenada de fin y una longitud entre otras cosas.
 */
export interface BasicRutaInfo {
  /**
   * Identificador único de la ruta.
   * @type {number}
   */
  id: number;
  /**
   * Coordenada de inicio de la ruta.
   * @type {Coordenada}
   */
  inicio: Coordenada;
  /**
   * Coordenada de fin de la ruta.
   * @type {Coordenada}
   */
  fin: Coordenada;
  /**
   * Longitud total de la ruta en kilómetros.
   * @type {number}
   */
  longitud: number;
}

/**
 * Clase para representar la información básica de una ruta.
 * Esta clase es abstracta, no se puede instanciar directamente ya que va a ser extendida por otras clases.
 * @abstract
 */
export abstract class BasicRuta implements BasicRutaInfo {
  /**
   * Generador de identificadores únicos para las rutas.
   * @protected
   * @static
   * @type {IdGenerator}
   */
  private static idGenerator = new IdGenerator();

  /**
   * Identificador único de la ruta.
   * @readonly
   * @type {number}
   */
  public readonly id: number;

  /**
   * Inicializa una nueva instancia de la clase BasicRuta.
   * @param inicio Coordenada de inicio de la ruta.
   * @param fin Coordenada de fin de la ruta.
   * @param longitud Longitud total de la ruta en kilómetros.
   * @example
   * ```typescript
   * const ruta = new BasicRuta(
   *  new Coordenada(40.416775, -3.703790),
   * new Coordenada(40.416775, -3.703790),
   * 10
   * );
   */
  constructor(
    readonly inicio: Coordenada,
    readonly fin: Coordenada,
    readonly longitud: number
  ) {
    this.id = BasicRuta.idGenerator.generate();
  }
}
