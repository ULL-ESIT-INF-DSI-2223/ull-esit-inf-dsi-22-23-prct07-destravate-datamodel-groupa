/**
 * Definición de la clase para representar un entrenamiento de un usuario o grupos de la aplicación.
 * Puede ser diario, semanal, mensual o anual.
 */
export class Entrenamiento {
  /**
   * Inicializa una nueva instancia de la clase Entrenamiento.
   * @param km Kilómetros recorridos en el entrenamiento.
   * @param desnivel Desnivel acumulado en el entrenamiento.
   * @example
   * ```typescript
   * const entrenamiento = new Entrenamiento();
   * ```
   */
  constructor(public km: number = 0, public desnivel: number = 0) {}
}
