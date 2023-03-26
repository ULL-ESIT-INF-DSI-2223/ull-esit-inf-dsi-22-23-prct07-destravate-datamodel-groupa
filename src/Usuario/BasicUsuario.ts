import { IdGenerator } from "../Otros/IdGenerator";
import { TipoActividad } from "../Ruta/Ruta";

/**
 * Interfaz para representar la información básica de un usuario de la aplicación de rutas deportivas.
 */
export interface BasicUsuarioInfo {
  /**
   * Nombre del usuario, puede ser un alias, un nombre real o un nombre de usuario.
   * @type {string}
   */
  nombre: string;

  /**
   * Identificador único del usuario, generado automáticamente.
   * @type {number}
   */
  id: number;

  /**
   * Actividad del usuario de la aplicación, puede ser cualquier tipo de actividad deportiva.
   * Como por ejemplo: "Ciclismo", "Running", "Senderismo", "Natación", etc.
   * @type {TipoActividad}
   */
  actividad: TipoActividad;
}

/**
 * Clase para representar la información básica de un usuario de la aplicación de rutas deportivas.
 * Esta clase es abstracta, no se puede instanciar directamente ya que va a ser extendida por otras clases.
 * @abstract
 */
export abstract class BasicUsuario implements BasicUsuarioInfo {
  /**
   * Generador de identificadores únicos para los usuarios.
   * @protected
   * @static
   * @type {IdGenerator}
   */
  protected static idGenerator = new IdGenerator();

  /**
   * Identificador único del usuario, generado automáticamente.
   * @readonly
   * @type {number}
   */
  public readonly id: number;

  /**
   * Tipo de actividad que realiza el usuario. Por ejemplo: "Ciclismo", "Running", "Senderismo", "Natación", etc.
   * @protected
   * @type {TipoActividad}
   */
  protected _actividad: TipoActividad;

  /**
   * Inicializa una nueva instancia de la clase BasicUsuario.
   * @param nombre Nombre del usuario, puede ser un alias, un nombre real o un nombre de usuario.
   * @param actividad Tipo de actividad deportiva que realiza el usuario.
   * @example
   * ```typescript
   * const usuario = new BasicUsuario("Usuario de prueba", 1, "Ciclismo");
   * ```
   */
  constructor(readonly nombre: string, actividad: TipoActividad) {
    this.id = BasicUsuario.idGenerator.generate();
    this._actividad = actividad;
  }

  /**
   * Método para acceder a la actividad del usuario.
   * @returns La propiedad actividad del usuario.
   * @example
   * ```typescript
   * const usuario = new BasicUsuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.actividad; // "Ciclismo"
   * ```
   */
  get actividad(): TipoActividad {
    return this._actividad;
  }

  /**
   * Método para modificar la actividad del usuario.
   * @param actividad La nueva actividad del usuario.
   * @example
   * ```typescript
   * const usuario = new BasicUsuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.actividad = "Running";
   * usuario.actividad; // "Running"
   * ```
   */
  set actividad(actividad: TipoActividad) {
    this._actividad = actividad;
  }
}
