import { Entrenamiento } from "./Entrenamiento";
import { Estadistica } from "./Estadistica";

/**
 * Definición de la clase para representar las estadísticas de un usuario en la aplicación.
 */
export class EstadisticaUsuario implements Estadistica {
  /**
   * Inicializa una nueva instancia de la clase EstadisticaUsuario.
   * @param dia Estadísticas del día.
   * @param semana Estadísticas de la semana.
   * @param mes Estadísticas del mes.
   * @example
   * ```typescript
   * const estadisticaUsuario = new EstadisticaUsuario();
   * ```
   */
  constructor(
    public dia: Entrenamiento = new Entrenamiento(),
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento()
  ) {}
}
