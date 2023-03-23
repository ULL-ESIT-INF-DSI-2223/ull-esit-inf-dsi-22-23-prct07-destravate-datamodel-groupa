import { Ruta, TipoActividad } from "../Ruta/Ruta";
import { Usuario } from "../Usuario/Usuario";

/**
 * Interfaz para representar la información de un reto para la aplicación.
 * @interface RetoInfo
 * @property {number} id - Identificador, único, del reto.
 * @property {string} nombre - Nombre del reto.
 * @property {Ruta[]} rutas - Rutas que forman parte del reto.
 * @property {TipoActividad} tipoActividad - Tipo de actividad del reto, en bicicleta o corriendo.
 * @property {number} kmTotales - Kilómetros totales del reto.
 * @property {Usuario[]} usuarios - Usuarios que están realizando el reto.
 */
export interface RetoInfo {
  id: number;
  nombre: string;
  rutas: Ruta[];
  tipoActividad: TipoActividad;
  kmTotales: number;
  usuarios: Usuario[];
}
/*
// Clase para representar un reto
class Reto {
  id: number;
  nombre: string;
  rutas: number[]; // IDs de las rutas que forman parte del reto
  tipoActividad: "bicicleta" | "corriendo";
  kmTotales: number;
  usuarios: number[]; // IDs de los usuarios que están realizando el reto
}
*/