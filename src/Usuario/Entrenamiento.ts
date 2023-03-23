/**
 * Definición de la clase para representar un entrenamiento de un usuario en la aplicación.
 * Puede ser diario, semanal o mensual.
 * @class Entrenamiento
 * @property {number} km - Kilómetros recorridos en el entrenamiento, por defecto 0.
 * @property {number} desnivel - Desnivel acumulado en el entrenamiento, por defecto 0.
 */
export class Entrenamiento {
  constructor(public km: number = 0, public desnivel: number = 0) {}
};