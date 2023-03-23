import { Coordenada } from "./Coordenada";

/**
 * Interfaz para representar la información básica de una ruta.
 * @interface BasicRutaInfo
 * @property {number} id - Identificador, único, de la ruta.
 * @property {Coordenada} inicio - Coordenada de inicio de la ruta.
 * @property {Coordenada} fin - Coordenada de fin de la ruta.
 * @property {number} longitud - Longitud total de la ruta en kilómetros.
 */
export interface BasicRutaInfo {
  id: number;
  inicio: Coordenada;
  fin: Coordenada;
  longitud: number;
}

/**
 * Clase para representar la información básica de una ruta.
 * @class BasicRuta
 * @implements {BasicRutaInfo}
 * @param {number} id - Identificador, único, de la ruta.
 * @param {Coordenada} inicio - Coordenada de inicio de la ruta.
 * @param {Coordenada} fin - Coordenada de fin de la ruta.
 * @param {number} longitud - Longitud total de la ruta en kilómetros.
 */
export class BasicRuta implements BasicRutaInfo {
  constructor(
    readonly id: number,
    readonly inicio: Coordenada,
    readonly fin: Coordenada,
    readonly longitud: number
  ) {}
}
