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

const loginQuestion: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre de usuario: ",
  },
];

const activityQuestion: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "tipo",
    message: "Introduzca el tipo de actividad que desea realizar: ",
    choices: ["Ciclismo", "Running"],
  },
];

enum RutasCommands {
  Añadir = "Añadir Ruta",
  Eliminar = "Eliminar Ruta",
  Volver = "Volver",
}

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

const deleteRutaQuestion: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "id",
    message: "Introduzca el id de la ruta que desea eliminar: ",
  },
];

const rutasSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(RutasCommands),
  },
];

enum UsuariosCommands {
  Volver = "Volver",
}

const usuariosSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(UsuariosCommands),
  },
];

enum GruposCommands {
  Entrar = "Entrar en Grupo",
  Salir = "Salir de Grupo",
  Volver = "Volver",
}

const gruposSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(GruposCommands),
  },
];

const entrarEnGrupo: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del Grupo al que desea entrar: ",
  },
];

const salirDeGrupo: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del Grupo del que desee salir: ",
  },
];

const nuevoGrupo: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del grupo: ",
  },
];

enum RetosCommands {
  Añadir = "Añadir Reto",
  Eliminar = "Eliminar Reto",
  Volver = "Volver",
}

const retosSubMenuQuestions: inquirer.QuestionCollection = [
  {
    type: "list",
    name: "command",
    message: "¿Qué acción desea realizar?",
    choices: Object.values(RetosCommands),
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

  async login() {
    const usuario = await inquirer.prompt(loginQuestion);

    if (this._usuarios.find((usuario) => usuario.nombre === usuario.nombre)) {
      console.log("Bienvenido de nuevo, " + usuario);
    } else {
      const actividad = await inquirer.prompt(activityQuestion);
      this.addUsuario(new Usuario(usuario.nombre, actividad.tipo));
    }
    const id = this._usuarios.find(
      (usuario) => usuario.nombre === usuario.nombre
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
                const participantes : string[] = [];
                grupo?.participantes.forEach((id) => {
                  const nombre = this._usuarios.find((usuario) => usuario.id === id)?.nombre;
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
                if (this._grupos.find((grupo) => grupo.nombre === nuevo.nombre) === undefined) {
                  this.addGrupo(new Grupo(nuevo.nombre, this.usuarioActual));
                }
                const idNuevo = this._grupos.find((grupo) => grupo.nombre === nuevo.nombre)?.id;
                if (idNuevo !== undefined)
                  this._usuarios
                  .find((usuario) => usuario.id === this.usuarioActual)
                  ?.addGrupo(idNuevo);
                break;
              case GruposCommands.Salir:
                  const viejo = await inquirer.prompt(salirDeGrupo);
                  const idViejo = this._grupos.find((grupo) => grupo.nombre === viejo.nombre)?.id;
                  if (idViejo !== undefined) {
                    this._usuarios
                    .find((usuario) => usuario.id === this.usuarioActual)
                    ?.removeGrupo(idViejo);
                    this._grupos.find((grupo) => grupo.id === idViejo)?.removeParticipante(this.usuarioActual);
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
          while (!exitRetos) {
            const { command } = await inquirer.prompt(retosSubMenuQuestions);
            switch (command) {
              case RetosCommands.Añadir:
                break;
              case RetosCommands.Eliminar:
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
  }
}
