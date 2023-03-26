import { Ruta } from "../Ruta/Ruta";
import { Usuario } from "../Usuario/Usuario";
import { Grupo } from "../Grupo/Grupo";
import { Reto } from "../Reto/Reto";

/**
 * Clase abstracta que contiene la información básica del gestor de la aplicación.
 * @abstract
 */
export abstract class BasicGestor {
  /**
   * Colección de rutas.
   * @type {Ruta[]}
   * @protected
   */
  protected _rutas: Ruta[] = [];
  /**
   * Colección de usuarios.
   * @type {Usuario[]}
   * @protected
   */
  protected _usuarios: Usuario[] = [];
  /**
   * Colección de grupos.
   * @type {Grupo[]}
   * @protected
   */
  protected _grupos: Grupo[] = [];
  /**
   * Colección de retos.
   * @type {Reto[]}
   * @protected
   */
  protected _retos: Reto[] = [];

  /**
   * Método para acceder a la colección de rutas.
   * @returns {Ruta[]} Colección de rutas.
   */
  get rutas(): Ruta[] {
    return this._rutas;
  }

  /**
   * Método para añadir una ruta a la colección de rutas.
   * @param ruta Ruta a añadir a la colección de rutas.
   * @example
   * ```typescript
   * const ruta = new Ruta(
   *  "Ruta de prueba",
   * [0, 0],
   * [1, 1],
   * 1,
   * 1,
   * "Ciclismo");
   * gestor.addRuta(ruta);
   * ```
   */
  addRuta(ruta: Ruta): void {
    this._rutas.push(ruta);
  }

  /**
   * Método para eliminar una ruta de la colección de rutas.
   * @param id Identificador de la ruta a eliminar.
   * @example
   * ```typescript
   * const ruta = new Ruta(
   * "Ruta de prueba",
   * [0, 0],
   * [1, 1],
   * 1,
   * 1,
   * "Ciclismo");
   * gestor.addRuta(ruta);
   * gestor.removeRuta(ruta.id);
   * ```
   */
  removeRuta(id: number): void {
    this._rutas = this._rutas.filter((ruta) => ruta.id !== id);
  }

  /**
   * Método para acceder a la colección de usuarios.
   * @returns {Usuario[]} Colección de usuarios.
   */
  get usuarios(): Usuario[] {
    return this._usuarios;
  }

  /**
   * Método para añadir un usuario a la colección de usuarios.
   * @param usuario Usuario a añadir a la colección de usuarios.
   * @example
   * ```typescript
   * const usuario = new Usuario("Pepe", "Ciclismo");
   * gestor.addUsuario(usuario);
   * ```
   */
  addUsuario(usuario: Usuario): void {
    this._usuarios.push(usuario);
  }

  /**
   * Método para eliminar un usuario de la colección de usuarios.
   * @param id Identificador del usuario a eliminar.
   * @example
   * ```typescript
   * const usuario = new Usuario("Pepe", "Ciclismo");
   * gestor.addUsuario(usuario);
   * gestor.removeUsuario(usuario.id);
   * ```
   */
  removeUsuario(id: number): void {
    this._usuarios = this._usuarios.filter((usuario) => usuario.id !== id);
  }

  /**
   * Método para acceder a la colección de grupos.
   * @returns {Grupo[]} Colección de grupos.
   */
  get grupos(): Grupo[] {
    return this._grupos;
  }

  /**
   * Método para añadir un grupo a la colección de grupos.
   * @param grupo Grupo a añadir a la colección de grupos.
   * @example
   * ```typescript
   * const grupo = new Grupo("Grupo de prueba");
   * gestor.addGrupo(grupo);
   * ```
   */
  addGrupo(grupo: Grupo): void {
    this._grupos.push(grupo);
  }

  /**
   * Método para eliminar un grupo de la colección de grupos.
   * @param id Identificador del grupo a eliminar.
   * @example
   * ```typescript
   * const grupo = new Grupo("Grupo de prueba");
   * gestor.addGrupo(grupo);
   * gestor.removeGrupo(grupo.id);
   * ```
   */
  removeGrupo(id: number): void {
    this._grupos = this._grupos.filter((grupo) => grupo.id !== id);
  }

  /**
   * Método para acceder a la colección de retos.
   * @returns {Reto[]} Colección de retos.
   */
  get retos(): Reto[] {
    return this._retos;
  }

  /**
   * Método para añadir un reto a la colección de retos.
   * @param reto Reto a añadir a la colección de retos.
   * @example
   * ```typescript
   * const reto =
   * new Reto(
   * "Reto de prueba",
   * "Ciclismo",
   * 1,
   * 2);
   * gestor.addReto(reto);
   * ```
   */
  addReto(reto: Reto): void {
    this._retos.push(reto);
  }

  /**
   * Método para eliminar un reto de la colección de retos.
   * @param id Identificador del reto a eliminar.
   * @example
   * ```typescript
   * const reto =
   * new Reto(
   * "Reto de prueba",
   * "Ciclismo",
   * 1,
   * 2);
   * gestor.addReto(reto);
   * gestor.removeReto(reto.id);
   * ```
   */
  removeReto(id: number): void {
    this._retos = this._retos.filter((reto) => reto.id !== id);
  }
}
