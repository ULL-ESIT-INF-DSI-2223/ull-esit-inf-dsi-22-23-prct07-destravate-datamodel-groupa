import { Coordenada } from "./BasicRuta";
import { BasicRuta } from "./BasicRuta";

/**
 * Definición de tipo para representar el tipo de actividad de una ruta.
 * @type {tipoActividad}
 * @property {string} Ciclismo - Actividad de ciclismo.
 * @property {string} Running - Actividad de running.
 */
export type tipoActividad = "Ciclismo" | "Running";

/**
 * Interfaz para representar la información de una ruta.
 * @interface RutaInfo
 * @property {string} nombre - Nombre de la ruta.
 * @property {number} desnivel - Desnivel medio de la ruta en metros.
 * @property {number[]} usuarios - Lista de usuarios que han realizado la ruta.
 * @property {tipoActividad} tipo - Tipo de actividad de la ruta.
 * @property {number} calificacion - Calificación de la ruta en una escala del 1 al 5.
 */
interface RutaInfo {
  nombre: string;
  desnivel: number;
  usuarios: number[];
  tipo: tipoActividad;
  calificacion: number;
}

export class Ruta extends BasicRuta implements RutaInfo {
  private _usuarios: number[];
  private _calificacion: number;
  constructor(
    readonly nombre: string,
    id: number,
    inicio: Coordenada,
    fin: Coordenada,
    longitud: number,
    readonly desnivel: number,
    readonly tipo: tipoActividad
  ) {
    super(id, inicio, fin, longitud);
    this._usuarios = [];
    this._calificacion = 0;
  }

  get usuarios(): number[] {
    return this._usuarios;
  }

  get calificacion(): number {
    return this._calificacion;
  }
}
