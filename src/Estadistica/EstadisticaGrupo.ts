import { Entrenamiento } from "./Entrenamiento";
import { Estadistica } from "./Estadistica";

/**
 * Definición de la clase para representar las estadísticas de un grupo en la aplicación.
 */
export class EstadisticaGrupo implements Estadistica {
  /**
   * Inicializa una nueva instancia de la clase EstadisticaGrupo.
   * @param semana Estadísticas de la semana.
   * @param mes Estadísticas del mes.
   * @param año Estadísticas del año.
   * @example
   * ```typescript
   * const estadisticaGrupo = new EstadisticaGrupo();
   * ```
   */
  constructor(
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento(),
    public año: Entrenamiento = new Entrenamiento()
  ) {}
}
