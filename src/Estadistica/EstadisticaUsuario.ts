import { Entrenamiento } from './Entrenamiento';
import { Estadistica } from './Estadistica';

/**
 * Definición de la clase para representar las estadísticas de un usuario en la aplicación.
 * @class EstadisticaUsuario
 * @extends {Estadistica}
 * @property {Entrenamiento} dia - Registro de km recorridos y desnivel acumulado en el día.
 * @property {Entrenamiento} semana - Registro de km recorridos y desnivel acumulado en la semana.
 * @property {Entrenamiento} mes - Registro de km recorridos y desnivel acumulado en el mes.
 */
export class EstadisticaUsuario implements Estadistica{
  constructor(
    public dia: Entrenamiento = new Entrenamiento(),
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento()
  ) {}
}
