/**
 * Definición de clase para representar una coordenada geográfica para las rutas.
 * La primera componente es la latitud y la segunda la longitud.
 * @class Coordenada
 * @property {number} latitud - Latitud de la coordenada.
 * @property {number} longitud - Longitud de la coordenada.
 */
export class Coordenada {
  constructor(readonly latitud: number, readonly longitud: number) {}
}