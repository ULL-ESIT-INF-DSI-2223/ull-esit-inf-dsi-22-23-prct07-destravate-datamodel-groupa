import { Entrenamiento } from './Entrenamiento';
import { Estadistica } from './Estadistica';

/**
 * Definición de la clase para representar las estadísticas de un grupo en la aplicación.
 * @class EstadisticaGrupo
 * @extends {Estadistica}
 * @property {Entrenamiento} semana - Registro de km recorridos y desnivel acumulado en la semana por el grupo.
 * @property {Entrenamiento} mes - Registro de km recorridos y desnivel acumulado en el mes por el grupo.
 * @property {Entrenamiento} año - Registro de km recorridos y desnivel acumulado en el año por el grupo.
 */
export class EstadisticaGrupo implements Estadistica{
  constructor(
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento(),
    public año: Entrenamiento = new Entrenamiento()
  ) {}
}
