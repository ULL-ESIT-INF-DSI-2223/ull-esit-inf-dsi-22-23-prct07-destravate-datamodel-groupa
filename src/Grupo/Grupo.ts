import { Estadistica } from "../Usuario/Estadistica";

/**
 * Interfaz para representar la información básica de un grupo.
 * @interface GrupoInfo
 * @property {number} id - Identificador, único, del grupo.
 * @property {string} nombre - Nombre del grupo.
 * @property {number[]} participantes - IDs de los usuarios del grupo.
 * @property {Estadistica} estadisticas - Estadísticas del grupo.
 * @property {number[]} ranking - IDs de los usuarios ordenados por km totales o desnivel acumulado.
 * @property {number[]} rutasFavoritas - IDs de las rutas favoritas del grupo.
 */
export interface GrupoInfo {
  id: number;
  nombre: string;
  participantes: number[];
  estadisticas: Estadistica;
  ranking: number[];
  rutasFavoritas: number[];
}

export class Grupo {}

/*// Clase para representar un grupo
export class Grupo implements GrupoInfo {
  id: number;
  nombre: string;
  participantes: number[]; // IDs de los usuarios del grupo
  estadisticas: {
    semana: {
      km: number;
      desnivel: number;
    };
    mes: {
      km: number;
      desnivel: number;
    };
    año: {
      km: number;
      desnivel: number;
    };
  };
  clasificacion: number[]; // IDs de los usuarios ordenados por km totales o desnivel acumulado
  rutasFavoritas: number[]; // IDs de las rutas favoritas del grupo
  historico: {
    [fecha: string]: number[]; // IDs de las rutas realizadas por el grupo en la fecha
  };
}*/
