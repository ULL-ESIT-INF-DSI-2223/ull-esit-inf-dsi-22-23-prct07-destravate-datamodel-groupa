import * as inquirer from "inquirer";

import lowdb = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

import { Coordenada } from "../Ruta/Coordenada";
import { Ruta } from "../Ruta/Ruta";
import { Usuario } from "../Usuario/Usuario";
import { Grupo } from "../Grupo/Grupo";
import { Reto } from "../Reto/Reto";

import { BasicGestor } from "./BasicGestor";

/**
 * Definición de la base de datos para el gestor.
 */
export type Database = {
  rutas: Ruta[];
  usuarios: Usuario[];
  grupos: Grupo[];
  retos: Reto[];
};

/**
 * Pregunta para el login.
 */
const loginQuestion: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre de usuario: ",
  },
];

/**
 * Pregunta para el registro de un nuevo usuario.
 */
const activityQuestion: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "tipo",
    message: "Introduzca el tipo de actividad que desea realizar: ",
    choices: ["Ciclismo", "Running"],
  },
];

/**
 * Comandos para la gestión de rutas.
 */
enum RutasCommands {
  Añadir = "Añadir Ruta",
  Eliminar = "Eliminar Ruta",
  Volver = "Volver",
}

/**
 * Preguntas para la creación de una nueva ruta.
 */
const rutasFormQuestions: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre de la ruta: ",
  },
  {
    type: "input",
    name: "inicioX",
    message: "Introduzca la coordenada X del punto de inicio de la ruta: ",
  },
  {
    type: "input",
    name: "inicioY",
    message: "Introduzca la coordenada Y del punto de inicio de la ruta: ",
  },
  {
    type: "input",
    name: "finX",
    message: "Introduzca la coordenada X del punto de fin de la ruta: ",
  },
  {
    type: "input",
    name: "finY",
    message: "Introduzca la coordenada Y del punto de fin de la ruta: ",
  },
  {
    type: "input",
    name: "longitud",
    message: "Introduzca la longitud de la ruta: ",
  },
  {
    type: "input",
    name: "desnivel",
    message: "Introduzca el desnivel de la ruta: ",
  },
  {
    type: "list",
    name: "actividad",
    message: "Introduzca el tipo de actividad de la ruta: ",
    choices: ["Ciclismo", "Running"],
  },
];

/**
 * Pregunta para la eliminación de una ruta.
 */
const deleteRutaQuestion: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "id",
    message: "Introduzca el id de la ruta que desea eliminar: ",
  },
];

/**
 * Preguntas para la gestión de rutas.
 */
const rutasSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(RutasCommands),
  },
];

/**
 * Comandos para la gestión de usuarios.
 */
enum UsuariosCommands {
  Volver = "Volver",
}

/**
 * Preguntas para la gestión de usuarios.
 */
const usuariosSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(UsuariosCommands),
  },
];

/**
 * Comandos para la gestión de grupos.
 */
enum GruposCommands {
  Entrar = "Entrar en Grupo",
  Salir = "Salir de Grupo",
  Volver = "Volver",
}

/**
 * Preguntas para la gestión de grupos.
 */
const gruposSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(GruposCommands),
  },
];

/**
 * Pregunta para entrar en un grupo.
 */
const entrarEnGrupo: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del Grupo al que desea entrar: ",
  },
];

/**
 * Pregunta para salir de un grupo.
 */
const salirDeGrupo: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del Grupo del que desee salir: ",
  },
];

/**
 * Comandos para la gestión de retos.
 */
enum RetosCommands {
  Entrar = "Entrar en Reto",
  Salir = "Salir de Reto",
  Volver = "Volver",
}

/**
 * Preguntas para la gestión de retos.
 */
const retosSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(RetosCommands),
  },
];

/**
 * Pregunta para entrar en un reto.
 */
const entrarEnReto: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del reto al que desea entrar: ",
  },
];

/**
 * Pregunta para salir de un reto.
 */
const salirDeReto: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del reto del que desee salir: ",
  },
];

/**
 * Preguntas para la creación de un nuevo reto.
 */
const retoQuestion: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "tipo",
    message: "Introduzca el tipo de actividad para el reto: ",
    choices: ["Ciclismo", "Running"],
  },
  {
    type: "input",
    name: "km",
    message: "Introduzca el número de kilómetros para el reto: ",
  },
  {
    type: "input",
    name: "rutas",
    message: "Introduzca el número de rutas para el reto: ",
  }
];

/**
 * Preguntas para la creación de un nuevo reto.
 */
const retoFormQuestions: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre de la ruta a añadir: ",
  },
];

/**
 * Comandos disponibles en el menú principal del gestor de la aplicación.
 */
enum PromptCommands {
  Rutas = "Visualizar Rutas",
  Usuarios = "Visualizar Usuarios",
  Grupos = "Visualizar Grupos",
  Retos = "Visualizar Retos",
  Salir = "Salir",
}

/**
 * Preguntas para el menú principal del gestor de la aplicación.
 */
const mainMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "Menú principal. Escoge una opción: ",
    choices: Object.values(PromptCommands),
  },
];

/**
 * Interfaz que define los métodos que debe implementar el gestor de la aplicación.
 */
export interface GestorInfo {
  /**
   * Método para iniciar sesión en el gestor de la aplicación.
   */
  login(): void;
  /**
   * Método para ejecutar el menú principal del gestor de la aplicación.
   */
  promptUser(): void;
}

/**
 * Clase que contiene la información del gestor de la aplicación.
 * El gestor se debe encargar de gestionar las rutas, usuarios, grupos y retos, además de
 * guardar la información en una base de datos.
 */
export class Gestor extends BasicGestor implements GestorInfo {
  /**
   * Instancia del gestor de la aplicación.
   * @type {Gestor}
   * @private
   * @static
   */
  private static instance: Gestor;
  /**
   * Base de datos del gestor.
   * @type {lowdb.LowdbSync<Database>}
   * @private
   */
  private database: lowdb.LowdbSync<Database>;

  /**
   * Usuario actualmente logueado en el gestor.
   * @type {number}
   * @private
   */
  private usuarioActual: number = -1;

  /**
   * Inicializa el gestor de la aplicación.
   * La clase sigue el patrón Singleton, por lo que no se puede instanciar directamente.
   */
  private constructor() {
    super();
    this.database = lowdb(new FileSync("databases/DeStravaTe.json"));
    this.database
      .defaults({ rutas: [], usuarios: [], grupos: [], retos: [] })
      .write();
    this._usuarios = this.database.get("usuarios").value();
    this._rutas = this.database.get("rutas").value();
    this._grupos = this.database.get("grupos").value();
    this._retos = this.database.get("retos").value();
  }

  /**
   * Método para obtener la instancia del gestor de la aplicación.
   * @returns {Gestor} Instancia del gestor de la aplicación.
   * @static
   * @example
   * ```typescript
   * const gestor = Gestor.getInstance();
   * gestor.promptUser();
   * ```
   */
  static getInstance(): Gestor {
    if (!Gestor.instance) Gestor.instance = new Gestor();
    return Gestor.instance;
  }

  /* istanbul ignore next */
  /**
   * Método para iniciar sesión en el gestor de la aplicación.
   * @async
   */
  async login() {
    const loggedUser = await inquirer.prompt(loginQuestion);

    if (this._usuarios.find((usuario) => usuario.nombre === loggedUser.nombre)) {
      console.log("Bienvenido de nuevo, " + loggedUser);
    } else {
      const actividad = await inquirer.prompt(activityQuestion);
      this.addUsuario(new Usuario(loggedUser.nombre, actividad.tipo));
    }
    const id = this._usuarios.find(
      (usuario) => usuario.nombre === loggedUser.nombre
    )?.id;
    if (id !== undefined) this.usuarioActual = id;

    this.promptUser();
  }

  /* istanbul ignore next */
  /**
   * Método para ejecutar el menú principal del gestor de la aplicación.
   * @async
   */
  async promptUser() {
    let exit: boolean = false;
    while (!exit) {
      console.clear();
      const { command } = await inquirer.prompt(mainMenuQuestions);
      console.clear();
      switch (command) {
        case PromptCommands.Rutas:
          let exitRutas: boolean = false;
          while (!exitRutas) {
            if (this.rutas.length !== 0) {
              console.log("=================================");
              console.log("RUTAS");
              this.rutas.forEach((ruta) => {
                console.log("=================================");
                console.log("ID: " + ruta.id);
                console.log("Nombre: " + ruta.nombre);
                console.log(
                  "Inicio: " + ruta.inicio.latitud + ", " + ruta.inicio.longitud
                );
                console.log(
                  "Fin: " + ruta.fin.latitud + ", " + ruta.fin.longitud
                );
                console.log("Longitud: " + ruta.longitud);
                console.log("Desnivel: " + ruta.desnivel);
                console.log("Actividad: " + ruta.actividad);
              });
              console.log("=================================");
            }
            const { command } = await inquirer.prompt(rutasSubMenuQuestions);
            switch (command) {
              case RutasCommands.Añadir:
                const ruta = await inquirer.prompt(rutasFormQuestions);
                console.clear();
                this.addRuta(
                  new Ruta(
                    ruta.nombre,
                    new Coordenada(ruta.inicioX, ruta.inicioY),
                    new Coordenada(ruta.finX, ruta.finY),
                    ruta.longitud,
                    ruta.desnivel,
                    ruta.actividad
                  )
                );
                break;
              case RutasCommands.Eliminar:
                const { id } = await inquirer.prompt(deleteRutaQuestion);
                console.clear();
                this.removeRuta(parseInt(id));
                break;
              case RutasCommands.Volver:
                exitRutas = true;
                break;
            }
          }
          break;
        case PromptCommands.Usuarios:
          let exitUsuarios: boolean = false;
          while (!exitUsuarios) {
            if (this.usuarios.length !== 0) {
              console.log("=================================");
              console.log("USUARIOS");
              this.usuarios.forEach((usuario) => {
                console.log("=================================");
                console.log("ID: " + usuario.id);
                console.log("Nombre: " + usuario.nombre);
                console.log("Actividad: " + usuario.actividad);
              });
              console.log("=================================");
            }
            const { command } = await inquirer.prompt(usuariosSubMenuQuestions);
            switch (command) {
              case UsuariosCommands.Volver:
                exitUsuarios = true;
                break;
            }
          }
          break;
        case PromptCommands.Grupos:
          let exitGrupos: boolean = false;

          if (
            this._usuarios.find((usuario) => usuario.id === this.usuarioActual)
              ?.grupos.length !== 0
          ) {
            console.log("=================================");
            console.log("GRUPOS");
            this._usuarios
              .find((usuario) => usuario.id === this.usuarioActual)
              ?.grupos.forEach((id) => {
                const grupo = this._grupos.find((grupo) => grupo.id === id);
                console.log("=================================");
                console.log("ID: " + grupo?.id);
                console.log("Nombre: " + grupo?.nombre);
                const participantes: string[] = [];
                grupo?.participantes.forEach((id) => {
                  const nombre = this._usuarios.find(
                    (usuario) => usuario.id === id
                  )?.nombre;
                  if (nombre !== undefined) participantes.push(nombre);
                });
                console.log("Participantes: " + participantes);
              });
            console.log("=================================");
          }
          while (!exitGrupos) {
            const { command } = await inquirer.prompt(gruposSubMenuQuestions);
            switch (command) {
              case GruposCommands.Entrar:
                const nuevo = await inquirer.prompt(entrarEnGrupo);
                if (
                  this._grupos.find(
                    (grupo) => grupo.nombre === nuevo.nombre
                  ) === undefined
                ) {
                  this.addGrupo(new Grupo(nuevo.nombre, this.usuarioActual));
                }
                const idNuevo = this._grupos.find(
                  (grupo) => grupo.nombre === nuevo.nombre
                )?.id;
                if (idNuevo !== undefined)
                  this._usuarios
                    .find((usuario) => usuario.id === this.usuarioActual)
                    ?.addGrupo(idNuevo);
                break;
              case GruposCommands.Salir:
                const viejo = await inquirer.prompt(salirDeGrupo);
                const idViejo = this._grupos.find(
                  (grupo) => grupo.nombre === viejo.nombre
                )?.id;
                if (idViejo !== undefined) {
                  this._usuarios
                    .find((usuario) => usuario.id === this.usuarioActual)
                    ?.removeGrupo(idViejo);
                  this._grupos
                    .find((grupo) => grupo.id === idViejo)
                    ?.removeParticipante(this.usuarioActual);
                }
                break;
              case GruposCommands.Volver:
                exitGrupos = true;
                break;
            }
          }
          break;
        case PromptCommands.Retos:
          let exitRetos: boolean = false;
          if (
            this._usuarios.find((usuario) => usuario.id === this.usuarioActual)
              ?.retos.length !== 0
          ) {
            console.log("=================================");
            console.log("RETOS");
            this._usuarios
              .find((usuario) => usuario.id === this.usuarioActual)
              ?.retos.forEach((id) => {
                const reto = this._retos.find((reto) => reto.id === id);
                console.log("=================================");
                console.log("ID: " + reto?.id);
                console.log("Nombre: " + reto?.nombre);
                console.log("Tipo: " + reto?.tipo);
                const rutas: string[] = [];
                reto?.rutas.forEach((id) => {
                  const nombre = this._rutas.find(
                    (ruta) => ruta.id === id
                  )?.nombre;
                  if (nombre !== undefined) rutas.push(nombre);
                });
                console.log("Rutas: " + rutas);
                console.log("Kilometros: " + reto?.km);
                const participantes: string[] = [];
                reto?.usuarios.forEach((id) => {
                  const nombre = this._usuarios.find(
                    (usuario) => usuario.id === id
                  )?.nombre;
                  if (nombre !== undefined) participantes.push(nombre);
                });
                console.log("Participantes: " + participantes);
              });
            console.log("=================================");
          }
          while (!exitRetos) {
            const { command } = await inquirer.prompt(retosSubMenuQuestions);
            switch (command) {
              case RetosCommands.Entrar:
                const nuevo = await inquirer.prompt(entrarEnReto);
                if (
                  this._retos.find(
                    (reto) => reto.nombre === nuevo.nombre
                  ) === undefined
                ) {
                  const actividad = await inquirer.prompt(retoQuestion);
                  this.addReto(new Reto(nuevo.nombre, actividad.tipo));
                  const reto = this._retos.find((reto) => reto.nombre === nuevo.nombre);
                  if (reto !== undefined) {
                    reto.addUsuario(this.usuarioActual);
                    reto.km = actividad.km;
                  }
                  let i = 0;
                  while (i < parseInt(actividad.rutas)) {
                    const nuevaRuta = await inquirer.prompt(retoFormQuestions);
                    const idRuta = this._rutas.find((ruta) => ruta.nombre === nuevaRuta.nombre)?.id;
                    if (idRuta !== undefined)
                      this._retos.find((reto) => reto.nombre === nuevo.nombre)?.addRuta(idRuta);
                    i++;
                  }
                  const ruta = this._rutas.find((ruta) => ruta.nombre === actividad.ruta);
                  if (ruta !== undefined)
                    this._retos.find((reto) => reto.nombre === nuevo.nombre)?.addRuta(ruta.id);
                }
                const idNuevo = this._retos.find(
                  (reto) => reto.nombre === nuevo.nombre
                )?.id;
                if (idNuevo !== undefined)
                  this._usuarios
                    .find((usuario) => usuario.id === this.usuarioActual)
                    ?.addReto(idNuevo);
                break;
              case RetosCommands.Salir:
                const viejo = await inquirer.prompt(salirDeReto);
                const idViejo = this._retos.find(
                  (reto) => reto.nombre === viejo.nombre
                )?.id;
                if (idViejo !== undefined) {
                  this._usuarios
                    .find((usuario) => usuario.id === this.usuarioActual)
                    ?.removeReto(idViejo);
                  this._retos
                    .find((reto) => reto.id === idViejo)
                    ?.removeUsuario(this.usuarioActual);
                }
                break;
              case RetosCommands.Volver:
                exitRetos = true;
                break;
            }
          }
          break;
        case PromptCommands.Salir:
          exit = true;
          break;
      }
    }
    this.database.setState({ usuarios: [], rutas: [], grupos: [], retos: [] }).write();
    this._usuarios.forEach((usuario) => {
      this.database.get("usuarios").push(usuario).write();
    });
    this._rutas.forEach((ruta) => {
      this.database.get("rutas").push(ruta).write();
    });
    this._grupos.forEach((grupo) => {
      this.database.get("grupos").push(grupo).write();
    });
    this._retos.forEach((reto) => {
      this.database.get("retos").push(reto).write();
    });
  }
}
