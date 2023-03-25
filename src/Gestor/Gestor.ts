import * as inquirer from "inquirer";

import lowdb = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");
const pressAnyKey = require('press-any-key');

import { Ruta } from "../Ruta/Ruta";
import { Usuario } from "../Usuario/Usuario";
import { Grupo } from "../Grupo/Grupo";
import { Reto } from "../Reto/Reto";

export type Database = {
  rutas: Ruta[];
  usuarios: Usuario[];
  grupos: Grupo[];
  retos: Reto[];
};

enum PromptCommands {
  Rutas = "Visualizar Rutas",
  Usuarios = "Visualizar Usuarios",
  Grupos = "Visualizar Grupos",
  Quit = "Salir",
}

export interface GestorInfo {
  rutas: Ruta[];
  usuarios: Usuario[];
  grupos: Grupo[];
  retos: Reto[];
  promptUser(): void;
}

export class Gestor {
  private database: lowdb.LowdbSync<Database>;

  private _rutas: Ruta[] = [];
  private _usuarios: Usuario[] = [];
  private _grupos: Grupo[] = [];
  private _retos: Reto[] = [];

  constructor() {
    this.database = lowdb(new FileSync("databases/DeStravaTe.json"));
    this.database
      .defaults({ rutas: [], usuarios: [], grupos: [], retos: [] })
      .write();
  }

  async promptUser() {
    console.clear();
    inquirer
      .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(PromptCommands),
      })
      .then((answers) => {
        if (answers["command"] !== PromptCommands.Quit) {
          switch (answers["command"]) {
            case PromptCommands.Rutas:
              console.log(this.database.get("rutas").value());
              break;
            case PromptCommands.Usuarios:
              console.log(this.database.get("usuarios").value());
              break;
            case PromptCommands.Grupos:
              console.log(this.database.get("grupos").value());
              break;
          }
          pressAnyKey().then(() => {
            this.promptUser();
          });
        }
      });
  }
}
