/**
 * Definición de clase para representar una coordenada geográfica para las rutas.
 * La primera componente es la latitud y la segunda la longitud.
 */
export class Coordenada {
  /**
   * Inicializa una nueva instancia de la clase Coordenada.
   * @param latitud Latitud de la coordenada.
   * @param longitud Longitud de la coordenada.
   * @example
   * ```typescript
   * const coordenada = new Coordenada(40.416775, -3.703790);
   * ```
   */
  constructor(readonly latitud: number = 0, readonly longitud: number = 0) {}
}
