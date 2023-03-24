import { Entrenamiento } from './Entrenamiento';

/**
 * Definición de la interfaz para representar las estadísticas de un usuario en la aplicación.
 * @interface Estadistica
 * @property {Entrenamiento} semana - Registro de km recorridos y desnivel acumulado en la semana por el usuario.
 * @property {Entrenamiento} mes - Registro de km recorridos y desnivel acumulado en el mes por el usuario.
 */
export interface Estadistica {
  semana: Entrenamiento;
  mes: Entrenamiento;
}