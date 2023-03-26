import { Entrenamiento } from "./Entrenamiento";

/**
 * Definición de la interfaz para representar las estadísticas básicas de los usuarios y grupos en la aplicación.
 */
export interface Estadistica {
  /**
   * Entrenamiento semanal del usuario o grupo.
   * @type {Entrenamiento}
   */
  semana: Entrenamiento;
  /**
   * Entrenamiento mensual del usuario o grupo.
   * @type {Entrenamiento}
   */
  mes: Entrenamiento;
}
