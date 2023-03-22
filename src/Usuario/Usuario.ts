import { BasicUsuario } from "./BasicUsuario";
import { TipoActividad } from "../Ruta/Ruta";

/**
 * Interfaz para representar la información de un usuario para la aplicación.
 * @interface UsuarioInfo
 * @property {number[]} amigos - Lista de amigos del usuario.
 * @property {number[][]} grupos - Lista de grupos del usuario.
 */
interface UsuarioInfo {
  amigos: number[];
  grupos: number[][];
}

/**
 * Clase para representar la información de un usuario para la aplicación.
 * @class Usuario
 * @extends {BasicUsuario}
 * @implements {UsuarioInfo}
 * @param {string} nombre - Nombre del usuario.
 * @param {number} id - Identificador del usuario.
 * @param {TipoActividad} actividad - actividad de actividad del usuario.
 * @param {number[]} amigos - Lista de amigos del usuario.
 * @param {number[][]} grupos - Lista de grupos del usuario.
 */
export class Usuario extends BasicUsuario implements UsuarioInfo {
  protected _amigos: number[] = [];
  protected _grupos: number[][] = [];
  constructor(nombre: string, id: number, actividad: TipoActividad) {
    super(nombre, id, actividad);
  }

  get amigos(): number[] {
    return this._amigos;
  }

  get grupos(): number[][] {
    return this._grupos;
  }
  /*estadisticas: {
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
  };*/
}
