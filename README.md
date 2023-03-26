# Práctica 7 - Destravate

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa)

## Introducción

El objetivo de esta práctica es desarrollar un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar registros de actividades deportivas.

Podríamos decir que otro objetivo de la práctica es trabajar en grupo de manera conjunta de tal modo que todos aportemos nuestro conocimiento para cumplir con el objetivo, enunciado y requisitos, todo esto gracias a la comunicación adecuada, al trabajo en grupo y también a herramientas muy útiles que vimos en prácticas anteriores como LiveShare para poder estar todos los componentes del grupo trabjando en el código a la vez.

## Desarrollo

En la actividad se desarrollarán 4 clases principales, que serán las siguientes: `Ruta`, `Usuario`, `Grupo` y `Reto`. Además, se utilizarán los módulos `Inquirer.js` y `Lowdb` para la gestión de datos. Para poder implementar estos módulos, se realizará una clase `Gestor` que se encargará de gestionar la información de los usuarios, grupos, retos y rutas.

### Rutas

Los requisitos que se nos pedían para las Rutas son los siguientes:

1. ID único de la ruta.

2. Nombre de la ruta.

3. Geolocalización del inicio (coordenadas).

4. Geolocalización del final de la ruta (coordenadas).

5. Longitud de la ruta en kilómetros.

6. Desnivel medio de la ruta.

7. Usuarios que han realizado la ruta (IDs).

8. Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.

9. Calificación media de la ruta.

#### Código

Dentro del directorio src/Ruta tenemos:

- `BasicRuta.ts`:

```TypeScript
import { Coordenada } from "./Coordenada";
export interface BasicRutaInfo {
  id: number;
  inicio: Coordenada;
  fin: Coordenada;
  longitud: number;
}

export class BasicRuta implements BasicRutaInfo {
  constructor(
    readonly id: number,
    readonly inicio: Coordenada,
    readonly fin: Coordenada,
    readonly longitud: number
  ) {}
}
```

Se define una interfaz y una clase relacionadas con la información de una ruta. La interfaz se llama `BasicRutaInfo` y define cuatro propiedades: un identificador único `id`, una coordenada de inicio `inicio`, una coordenada final `fin` y la longitud total de la ruta en kilómetros `longitud`. La clase `BasicRuta` implementa esta interfaz y tiene un `constructor` que acepta los mismos parámetros que la interfaz, y los almacena como propiedades de sólo lectura en la instancia de la clase. La clase y la interfaz dependen de la clase `Coordenada`, que se importa desde otro archivo.

- `Coordenada.ts`:

```TypeScript

export class Coordenada {
  constructor(readonly latitud: number, readonly longitud: number) {}
}
```

Se define una clase llamada `Coordenada` que representa una coordenada geográfica con dos propiedades: `latitud` y `longitud`. La clase tiene un `constructor` que toma dos argumentos, `latitud` y `longitud`, y los asigna a las propiedades correspondientes de solo lectura de la clase.

- `Ruta.ts`:

```TypeScript
import { Coordenada } from "./Coordenada";
import { BasicRuta } from "./BasicRuta";
export type TipoActividad = "Ciclismo" | "Running";

export interface RutaInfo {
  nombre: string;
  desnivel: number;
  usuarios: number[];
  addUsuario(id: number): void;
  actividad: TipoActividad;
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
    readonly actividad: TipoActividad
  ) {
    super(id, inicio, fin, longitud);
    this._usuarios = [];
    this._calificacion = 0;
  }

  get usuarios(): number[] {
    return this._usuarios;
  }

  addUsuario(id: number): void {
    if (this._usuarios.includes(id)) return;
    this._usuarios.push(id);
  }

  get calificacion(): number {
    return this._calificacion;
  }

  set calificacion(calificacion: number) {
    this._calificacion = calificacion;
  }
}
```

Aquí tenemos la implementación de una clase y una interfaz para representar la ruta y su información asociada. La clase `Ruta` implementa la interfaz `RutaInfo` y extiende la clase `BasicRuta`.

La interfaz `RutaInfo` describe la información que debe tener un objeto de tipo `Ruta`, incluyendo el nombre, el desnivel, la lista de usuarios que han realizado la ruta, la actividad de la ruta y su calificación. Además, la interfaz define un método `addUsuario` para añadir usuarios a la lista de usuarios que han realizado la ruta.

La clase `Ruta` tiene los mismos atributos y método que la interfaz `RutaInfo`. Además, tiene un `constructor` que toma los mismos parámetros que la interfaz, así como un identificador único para la ruta. La clase también tiene `getters` y `setters` para los atributos de la ruta, como la lista de usuarios que han realizado la ruta y la calificación de la ruta.

### Usuario

Los requisitos que se nos pedían para los usuarios son los siguientes:

1. ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).

2. Nombre del usuario.

3. Actividades que realiza: Correr o bicicleta.

4. Amigos en la aplicación: Colleción de IDs de usuarios con los que interacciona.

5. Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.

6. Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.

7. Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.

8. Retos activos: IDs de los retos que el usuario está realizando actualmente.

9. Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.

#### Código

Dentro del directorio src/Usuario tenemos:

- `BasicUsuario.ts`:

```TypeScript
import { TipoActividad } from "../Ruta/Ruta";

export interface BasicUsuarioInfo {
  nombre: string;
  id: number;
  actividad: TipoActividad;
}

export abstract class BasicUsuario implements BasicUsuarioInfo {
  protected _actividad: TipoActividad;
  constructor(
    readonly nombre: string,
    readonly id: number,
    actividad: TipoActividad
  ) {
    this._actividad = actividad;
  }

  get actividad(): TipoActividad {
    return this._actividad;
  }
}
```

Se define una interfaz llamada `BasicUsuarioInfo` que describe la información básica de un usuario. La interfaz tiene tres propiedades: `nombre`, `id` y `actividad`. La propiedad actividad es de tipo `TipoActividad`, que se define en el archivo comentado anteriormente llamado `Ruta.ts`.

Luego, se define una clase abstracta llamada `BasicUsuario`, que implementa la interfaz `BasicUsuarioInfo`. La clase tiene tres propiedades: ` nombre``,  `id`y`\_actividad`. La propiedad `\_actividad` está protegida y no es accesible desde fuera de la clase. El`constructor`de la clase acepta los mismos tres parámetros que la interfaz`BasicUsuarioInfo``` que ya habíamos mencionado.

La clase tiene un método `getter` llamado `actividad` que devuelve la propiedad `_actividad`.

- `Usuario.ts`:

```TypeScript
import { BasicUsuario } from "./BasicUsuario";
import { TipoActividad } from "../Ruta/Ruta";
import { Estadistica } from "./Estadistica";
import { Registro } from "./Registro";

export interface UsuarioInfo {
  amigos: number[];
  grupos: number[][];
  estadisticas: Estadistica;
  rutasFavoritas: number[];
  retos: number[];
  historial: Registro[];
}

export class Usuario extends BasicUsuario implements UsuarioInfo {
  protected _amigos: number[] = [];
  protected _grupos: number[][] = [];
  protected _estadisticas: Estadistica = new Estadistica();
  protected _rutasFavoritas: number[] = [];
  protected _retos: number[] = [];
  protected _historial: Registro[] = [];
  constructor(nombre: string, id: number, actividad: TipoActividad) {
    super(nombre, id, actividad);
  }

  get amigos(): number[] {
    return this._amigos;
  }

  get grupos(): number[][] {
    return this._grupos;
  }

  get estadisticas(): Estadistica {
    return this._estadisticas;
  }

  get rutasFavoritas(): number[] {
    return this._rutasFavoritas;
  }

  get retos(): number[] {
    return this._retos;
  }

  get historial(): Registro[] {
    return this._historial;
  }
}
```

Es definida una interfaz llamada `UsuarioInfo` que especifica la información que debe contener la clase `Usuario`. La clase `Usuario` extiende otra clase llamada `BasicUsuario` y también implementa la interfaz `UsuarioInfo`. La clase `Usuario` tiene seis propiedades protegidas que representan la información del usuario: `_amigos`, `_grupos`, `_estadisticas`, `_rutasFavoritas`, `_retos` y `_historial`. La clase también tiene seis métodos `getter` que permiten acceder a estas propiedades protegidas.

### Grupos

Los requisitos para grupos son los siguientes:

1. ID único del grupo.

2. Nombre del grupo.

3. Participantes: IDs de los miembros del grupo.

4. Estadísticas de entrenamiento grupal: Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año.

5. Clasificación de los usuarios: Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado.

6. Rutas favoritas del grupo: Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas.

7. Histórico de rutas realizadas por el grupo: Información similar que almacenan los usuarios pero en este caso referente a los grupos. Nótese que un usuario puede realizar rutas con un grupo y/o de manera individual el mismo día. Es decir, a modo de simplificación, asumimos que todos los usuarios de un grupo realizan la actividad cuando se planifica. Aunque, también pueden realizar otras actividades de manera individual.

#### Código

Dentro del directorio src/Grupo tenemos:

- `Grupo.ts`:

```TypeScript
import { IdGenerator } from "../IdGenerator";
import { EstadisticaGrupo } from "../Estadistica/EstadisticaGrupo";
import { Registro } from "../Registro";

export interface GrupoInfo {
  id: number;
  nombre: string;
  participantes: number[];
  estadisticas: EstadisticaGrupo;
  ranking: number[];
  rutasFavoritas: number[];
  historial: Registro[];
}

export class Grupo implements GrupoInfo {
  private static idGenerator = new IdGenerator();

  public readonly id: number;
  private _participantes: number[] = [];
  private _estadisticas: EstadisticaGrupo = new EstadisticaGrupo();
  private _ranking: number[] = [];
  private _rutasFavoritas: number[] = [];
  private _historial: Registro[] = [];

  constructor(
    public nombre: string,
    ...participantes: number[]
  ) {
    this.id = Grupo.idGenerator.generate();
    this._participantes = participantes;
  }

  get participantes(): number[] {
    return this._participantes;
  }

  get estadisticas(): EstadisticaGrupo {
    return this._estadisticas;
  }

  get ranking(): number[] {
    return this._ranking;
  }

  get rutasFavoritas(): number[] {
    return this._rutasFavoritas;
  }

  get historial(): Registro[] {
    return this._historial;
  }
}
```

La interfaz `GrupoInfo` define las propiedades que debe tener un objeto que represente la información básica de un grupo, incluyendo su `ID`, `nombre`, `participantes`, `estadisticas`, `ranking`, `rutasFavoritas` e `historial` de entrenamientos.

La clase `Grupo` implementa la interfaz `GrupoInfo` y define las propiedades y métodos de un objeto que representa un grupo. La clase tiene una propiedad `id` única generada por la clase `IdGenerator`, que asigna un `ID` automáticamente cada vez que se crea una nueva instancia de la clase `Grupo`. Además, la clase tiene propiedades para el nombre del grupo, los IDs de los participantes, las estadísticas del grupo, el ranking, las rutas favoritas y el historial de entrenamientos.

La clase también tiene métodos `getter` para cada una de las propiedades, lo que permite acceder a ellas desde fuera de la clase. Finalmente, el `constructor` de la clase acepta el nombre del grupo y una lista variable de IDs de participantes como argumentos y asigna estas propiedades a las correspondientes en la instancia de la clase.

### Estadística

#### Código

En el directortio src/Estadistica tenemos:

- `Entrenamiento.ts`:

```TypeScript

export class Entrenamiento {
  constructor(public km: number = 0, public desnivel: number = 0) {}
};
```

Aquí una clase llamada `Entrenamiento` que representa un entrenamiento de un usuario en una aplicación. La clase tiene dos propiedades públicas llamadas `km` y `desnivel`, que representan los kilómetros recorridos y el desnivel acumulado en el entrenamiento respectivamente. El `constructor` de la clase tiene dos parámetros opcionales que inicializan las propiedades `km` y `desnivel` con un valor predeterminado de 0.

- `Estadistica.ts`:

```TypeScript
import { Entrenamiento } from './Entrenamiento';

export interface Estadistica {
  semana: Entrenamiento;
  mes: Entrenamiento;
}
```

Aquí tenemos la interfaz llamada `Estadistica`. La interfaz tiene dos propiedades: `semana` y `mes`, ambas son del tipo `Entrenamiento`, que es otra clase definida en el archivo `Entrenamiento.ts`. La interfaz `Estadistica` se utiliza para representar las estadísticas de un usuario, y cada estadística tiene información de km recorridos y desnivel acumulado en una semana o un mes.

- `EstadisticaGrupo.ts `:

```TypeScript
import { Entrenamiento } from './Entrenamiento';
import { Estadistica } from './Estadistica';

export class EstadisticaGrupo implements Estadistica{
  constructor(
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento(),
    public año: Entrenamiento = new Entrenamiento()
  ) {}
}
```

Definimos la clase `EstadisticaGrupo` que implementa la interfaz `Estadistica`. La clase tiene tres propiedades públicas que representan los registros de entrenamiento de un grupo en una `semana`, `mes` y `año`. Estas propiedades son instancias de la clase `Entrenamiento`, que no se proporciona en el código que se muestra. El `constructor` de la clase inicializa estas propiedades con instancias vacías de la clase `Entrenamiento` si no se proporcionan valores al momento de crear una instancia de `EstadisticaGrupo`. La clase `EstadisticaGrupo` extiende la clase `Estadistica`, lo que significa que debe implementar todas las propiedades y métodos definidos en la interfaz `Estadistica`.

- `EstadisticaUsuario.ts `:

```TypeScript
import { Entrenamiento } from './Entrenamiento';
import { Estadistica } from './Estadistica';

export class EstadisticaUsuario implements Estadistica{
  constructor(
    public dia: Entrenamiento = new Entrenamiento(),
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento()
  ) {}
}
```

Se define la clase `EstadisticaUsuario` que implementa la interfaz `Estadistica`. La clase tiene tres propiedades públicas, `dia`, `semana` y `mes`, que representan las estadísticas de un usuario para un día, una semana y un mes. Cada una de estas propiedades es un objeto de la clase `Entrenamiento`, que registra la distancia recorrida y el desnivel acumulado. Además, el `constructor` de la clase inicializa estas propiedades con nuevos objetos de la clase `Entrenamiento` si no se proporcionan valores para ellas en el momento en el que se crea del objeto `EstadisticaUsuario`.

### Retos

Los requisitos para los retos son los siguientes:

1. ID único del reto.

2. Nombre del reto.

3. Rutas que forman parte del reto.

4. Tipo de actividad del reto: bicicleta o correr.

5. Km totales a realizar (como la suma de los kms de las rutas que lo engloban).

6. Usuarios que están realizando el reto.

#### Código

En el directorio src/Reto tenemos:

- `Reto.ts`:

```TypeScript
import { TipoActividad } from "../Ruta/Ruta";
import { IdGenerator } from "../IdGenerator";

export interface RetoInfo {
  id: number;
  nombre: string;
  rutas: number[];
  tipo: TipoActividad;
  km: number;
  usuarios: number[];
}

export class Reto implements RetoInfo {
  private static idGenerator = new IdGenerator();
  public readonly id: number;
  private _rutas: number[] = [];
  private _usuarios: number[] = [];
  private _km: number;

  constructor(public nombre: string, public readonly tipo: TipoActividad, ...rutas: number[]) {
    this.id = Reto.idGenerator.generate();
    this._rutas = rutas;
    this._km = 0;
  }

  get rutas(): number[] {
    return this._rutas;
  }

  get usuarios(): number[] {
    return this._usuarios;
  }

  get km(): number {
    return this._km;
  }
}
```

La interfaz `RetoInfo` define las propiedades que deben tener los objetos que representan un reto, como su identificador único, nombre, rutas, tipo de actividad (bicicleta o correr), kilómetros totales y usuarios que están realizando el reto.

La clase `Reto` implementa la interfaz `RetoInfo` y agrega algunas propiedades y métodos adicionales. En su `constructor`, toma como parámetros el `nombre` del reto, el `tipo` de actividad y un número variable de `rutas` que forman parte del reto. El identificador del reto se genera automáticamente utilizando una clase `IdGenerator`. La propiedad `_rutas` devuelve un array de números que representa las rutas que forman parte del reto. La propiedad `_usuarios` devuelve un array de números que representa los usuarios que están realizando el reto. La propiedad `_km` devuelve el total de kilómetros del reto.

### Otros

En el directorio src/Otros tenemos:

- `Registro.ts`:

```TypeScript

export interface RegistroInfo {
  readonly fecha: string;
  rutas: number[];
}

export class Registro {
  private _rutas: number[] = [];
  constructor(readonly fecha: string, rutas: number[]) {
    this._rutas = rutas;
  }

  get rutas(): number[] {
    return this._rutas;
  }

  addRuta(id: number): void {
    if (this._rutas.includes(id))
      return;
    this._rutas.push(id);
  }
}
```

Se define una interfaz y una clase para representar registros de entrenamiento. La interfaz `RegistroInfo` define los atributos de un registro, como su `fecha` y las `rutas` realizadas durante el entrenamiento. La clase `Registro` implementa la interfaz `RegistroInfo` y define su `constructor`, que toma una fecha y una lista de rutas realizadas durante el entrenamiento.

La clase `Registro` también tiene un método `addRuta`, que permite añadir una nueva ruta al registro. La propiedad `rutas` de la clase `Registro` devuelve la lista de rutas realizadas durante el entrenamiento.

- `IdGenerator.ts`:

```TypeScript

export class IdGenerator {
  private ids: number;
  constructor() {
    this.ids = 0;
  }

  generate(): number {
    const newId = this.ids++;
    return newId;
  }
}
```

Se define una clase llamada `IdGenerator` que se utiliza para generar IDs únicos para cada una de las instancias de la clase `_amigos`. La clase contiene un atributo privado `ids` que se inicializa a cero en el `constructor` y un método público `generate()` que devuelve un nuevo ID único cada vez que se llama.

### Gestor

Cuyo enunciado nos indicaba lo siguiente:

Por último, deberá crear una clase Gestor que permita gestionar el tratamiento de la información del sistema.

Para el funcionamiento de la clase Gestor, también necesitará hacer uso de Inquirer.js. En concreto, un usuario podrá:

Registrarse en el sistema. Un usuario que se conecte por primera vez al sistema deberá poder incluir su información para ser almacenada en el sistema. Asimismo, un usuario podrá visualizar el listado de usuarios existentes dentro del sistema y añadir/borrar amigos.

Visualizar todas las rutas existentes dentro del sistema. En este apartado se deben poder consultar el listado de rutas así como acceder a la información completa de cada una de ellas.

Unirse a un grupo existente. Este apartado considera la opción de un usuario que desea incluirse dentro de un grupo ya existente en el sistema.

Visualizar, crear y borrar grupos. Un usuario podrá borrar un grupo, pero solo si esta ha sido creado por él, es decir, no se podrá borrar un grupo pre-cargado en el sistema. Por otro lado, los grupos se podrán guardar usando el mismo sistema empleado para guardar la información cargada en el sistema. Por último, considere que en posteriores conexiones al sistema, el usuario podrá desear borrar un grupo que haya creado anteriormente. Debido a esto, se deberá distinguir entre los grupos creados por el usuario y los creados por el sistema con el objetivo de evitar borrar información sin permiso.

#### Código

Dentro del fichero src/Gestor tenemos:

- `BasicGestor.ts`:

```TypeScript
import { Ruta } from "../Ruta/Ruta";
import { Usuario } from "../Usuario/Usuario";
import { Grupo } from "../Grupo/Grupo";
import { Reto } from "../Reto/Reto";

export abstract class BasicGestor {

  protected _rutas: Ruta[] = [];

  protected _usuarios: Usuario[] = [];

  protected _grupos: Grupo[] = [];

  protected _retos: Reto[] = [];

  get rutas(): Ruta[] {
    return this._rutas;
  }

  addRuta(ruta: Ruta): void {
    this._rutas.push(ruta);
  }

  removeRuta(id: number): void {
    this._rutas = this._rutas.filter((ruta) => ruta.id !== id);
  }

  get usuarios(): Usuario[] {
    return this._usuarios;
  }

  addUsuario(usuario: Usuario): void {
    this._usuarios.push(usuario);
  }

  removeUsuario(id: number): void {
    this._usuarios = this._usuarios.filter((usuario) => usuario.id !== id);
  }

  get grupos(): Grupo[] {
    return this._grupos;
  }

  addGrupo(grupo: Grupo): void {
    this._grupos.push(grupo);
  }

  removeGrupo(id: number): void {
    this._grupos = this._grupos.filter((grupo) => grupo.id !== id);
  }

  get retos(): Reto[] {
    return this._retos;
  }

  addReto(reto: Reto): void {
    this._retos.push(reto);
  }

  removeReto(id: number): void {
    this._retos = this._retos.filter((reto) => reto.id !== id);
  }
}
```

Aquí se define una clase abstracta llamada `BasicGestor` que tiene propiedades para almacenar listas de objetos de tipo `Ruta`, `Usuario`, `Grupo` y `Reto`. También tiene métodos para agregar y eliminar objetos de estas listas.

Los métodos `get` permiten acceder a las listas de objetos desde fuera de la clase, mientras que los métodos `add` permiten agregar nuevos objetos a las listas y los métodos `remove` permiten eliminar objetos de las listas por su identificador `id`.

Esta clase es abstracta, lo que significa que no se puede crear una instancia directamente, sino que debe ser extendida por otras clases que proporcionen una implementación para los métodos abstractos definidos en la clase padre.

- `Gestor.ts`:

```TypeScript
import * as inquirer from "inquirer";

import lowdb = require("lowdb");
import FileSync = require("lowdb/adapters/FileSync");

import { Coordenada } from "../Ruta/Coordenada";
import { Ruta } from "../Ruta/Ruta";
import { Usuario } from "../Usuario/Usuario";
import { Grupo } from "../Grupo/Grupo";
import { Reto } from "../Reto/Reto";

import { BasicGestor } from "./BasicGestor";

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

enum RetosCommands {
  Entrar = "Entrar en Reto",
  Salir = "Salir de Reto",
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

const entrarEnReto: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del reto al que desea entrar: ",
  },
];

const salirDeReto: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre del reto del que desee salir: ",
  },
];

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

const retoFormQuestions: inquirer.QuestionCollection = [
  {
    type: "input",
    name: "nombre",
    message: "Introduzca el nombre de la ruta a añadir: ",
  },
];

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

export interface GestorInfo {

  login(): void;

  promptUser(): void;
}

export class Gestor extends BasicGestor implements GestorInfo {

  private static instance: Gestor;

  private database: lowdb.LowdbSync<Database>;

  private usuarioActual: number = -1;

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

  static getInstance(): Gestor {
    if (!Gestor.instance) Gestor.instance = new Gestor();
    return Gestor.instance;
  }

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
```

Y por último en este fichero es dónde utilizamos y enlazamos todo el proyecto.

## Pruebas y cubrimiento

Han sido realiazadas pruebas con mucha y chai con el fin de verificar el correcto funcionamiento de todos y cada uno de los ficheros del proyecto. A continuación se muestras las pruebas realizadas para cada parte:

- `Estadistica.spec.ts`:

```TypeScript
import "mocha";
import { expect } from "chai";

import { EstadisticaUsuario } from "../src/Estadistica/EstadisticaUsuario";
import { EstadisticaGrupo } from "../src/Estadistica/EstadisticaGrupo";

describe("EstadisticaUsuario class tests", () => {
  it("EstadisticaUsuario debería tener estadísticas diarias, semanales, mensuales y anuales", () => {
    const estadistica = new EstadisticaUsuario();
    expect(estadistica.dia.km).to.equal(0);
    expect(estadistica.dia.desnivel).to.equal(0);
    expect(estadistica.semana.km).to.equal(0);
    expect(estadistica.semana.desnivel).to.equal(0);
    expect(estadistica.mes.km).to.equal(0);
    expect(estadistica.mes.desnivel).to.equal(0);
  });
});

describe("EstadisticaGrupo class tests", () => {
  it("EstadisticaGrupo debería tener estadísticas diarias, semanales, mensuales y anuales", () => {
    const estadistica = new EstadisticaGrupo();
    expect(estadistica.semana.km).to.equal(0);
    expect(estadistica.semana.desnivel).to.equal(0);
    expect(estadistica.mes.km).to.equal(0);
    expect(estadistica.mes.desnivel).to.equal(0);
    expect(estadistica.año.km).to.equal(0);
    expect(estadistica.año.desnivel).to.equal(0);
  });
});
```

- `Gestor.spec.ts`:

```TypeScript
import "mocha";
import { expect } from "chai";

import { Coordenada } from "../src/Ruta/Coordenada";
import { Ruta } from "../src/Ruta/Ruta";
import { Usuario } from "../src/Usuario/Usuario";
import { Grupo } from "../src/Grupo/Grupo";
import { Reto } from "../src/Reto/Reto";

import { Gestor } from "../src/Gestor/Gestor";


const usuario = new Usuario("Pepe", "Ciclismo");
const gestor = Gestor.getInstance();

describe("Gestor class tests", () => {
  it("Gestor debería ser una clase singleton", () => {
    expect(Gestor.getInstance()).to.be.equal(gestor);
  });
  it("Gestor debería tener una colección de rutas", () => {
    expect(gestor.rutas).to.be.an("array");
    expect(gestor.rutas).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir rutas", () => {
    const ruta = new Ruta(
      "Ruta de prueba",
      new Coordenada(0, 0),
      new Coordenada(1, 1),
      1,
      1,
      "Ciclismo"
    );
    gestor.addRuta(ruta);
    expect(gestor.rutas).to.have.lengthOf(1);
    expect(gestor.rutas[0].nombre).to.be.equal("Ruta de prueba");
  });
  it("Gestor debería ser capaz de eliminar rutas", () => {
    gestor.removeRuta(gestor.rutas[0].id);
    expect(gestor.rutas).to.be.empty;
  });
  it("Gestor debería tener una colección de usuarios", () => {
    expect(gestor.usuarios).to.be.an("array");
    expect(gestor.usuarios).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir usuarios", () => {
    gestor.addUsuario(usuario);
    expect(gestor.usuarios).to.have.lengthOf(1);
    expect(gestor.usuarios[0].nombre).to.be.equal("Pepe");
  });
  it("Gestor debería ser capaz de eliminar usuarios", () => {
    gestor.removeUsuario(usuario.id);
    expect(gestor.usuarios).to.be.empty;
  });
  it("Gestor debería tener una colección de grupos", () => {
    expect(gestor.grupos).to.be.an("array");
    expect(gestor.grupos).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir grupos", () => {
    const grupo = new Grupo("Ciclismo");
    gestor.addGrupo(grupo);
    expect(gestor.grupos).to.have.lengthOf(1);
    expect(gestor.grupos[0].nombre).to.be.equal("Ciclismo");
  });
  it("Gestor debería ser capaz de eliminar grupos", () => {
    gestor.removeGrupo(gestor.grupos[0].id);
    expect(gestor.grupos).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir usuarios a grupos", () => {
    const grupo = new Grupo("Ciclismo");
    gestor.addGrupo(grupo);
    gestor.addUsuario(usuario);
    gestor.grupos[0].addParticipante(usuario.id);
    expect(gestor.grupos[0].participantes).to.have.lengthOf(1);
    expect(gestor.grupos[0].participantes).to.include(usuario.id);
  });
  it("Gestor debería ser capaz de eliminar usuarios de grupos", () => {
    gestor.grupos[0].removeParticipante(usuario.id);
    expect(gestor.grupos[0].participantes).to.be.empty;
  });
  it("Gestor debería tener una colección de retos", () => {
    expect(gestor.retos).to.be.an("array");
    expect(gestor.retos).to.be.empty;
  });
  it("Gestor debería ser capaz de añadir retos", () => {
    const reto = new Reto(
      "Ruta de prueba",
      "Ciclismo",
      1);
    gestor.addReto(reto);
    expect(gestor.retos).to.have.lengthOf(1);
    expect(gestor.retos[0].rutas).to.include(1);
  });
  it("Gestor debería ser capaz de eliminar retos", () => {
    gestor.removeReto(gestor.retos[0].id);
    expect(gestor.retos).to.be.empty;
  });
  it("Gestor debería tener un método para ejecutar un menú", () => {
    expect(gestor.promptUser).to.be.a("function");
  });
});
```

- `Grupo.spec.ts`:

```TypeScript
import "mocha";
import { expect } from "chai";
import { Grupo } from "../src/Grupo/Grupo";

const grupo = new Grupo("Ciclismo");

describe("Grupo class tests", () => {
  it("Grupo debería tener un identificador", () => {
    expect(grupo.id).to.be.a("number");
    expect(grupo.id).to.equal(0);
  });
  it("Grupo debería tener un nombre", () => {
    expect(grupo.nombre).to.be.a("string");
    expect(grupo.nombre).to.equal("Ciclismo");
  });
  it("Grupo debería tener una lista de participantes", () => {
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.be.empty;
  });
  it("Grupo debería poder modificar su lista de participantes", () => {
    grupo.addParticipante(1);
    grupo.addParticipante(2);
    grupo.addParticipante(3);
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.have.lengthOf(3);
    expect(grupo.participantes).to.deep.equal([1, 2, 3]);
    grupo.removeParticipante(2);
    expect(grupo.participantes).to.be.a("array");
    expect(grupo.participantes).to.have.lengthOf(2);
    expect(grupo.participantes).to.deep.equal([1, 3]);
  });
  it("Grupo debería tener estadísticas semanales, mensuales y anuales", () => {
    expect(grupo.estadisticas).to.be.a("object");
    expect(grupo.estadisticas).to.have.property("semana");
  });
  it("Grupo debe tener un ranking de sus integrantes", () => {
    expect(grupo.ranking).to.be.a("array");
    expect(grupo.ranking).to.be.empty;
  });
  it("Grupo debería poder modificar su ranking", () => {
    grupo.ranking = [1, 2, 3];
    expect(grupo.ranking).to.be.a("array");
    expect(grupo.ranking).to.deep.equal([1, 2, 3]);
  });
  it("Grupo debe tener una lista de rutas favoritas", () => {
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.be.empty;
  });
  it("Grupo debe poder modificar su lista de rutas favoritas", () => {
    grupo.addRutaFavorita(1);
    grupo.addRutaFavorita(2);
    grupo.addRutaFavorita(3);
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.have.lengthOf(3);
    expect(grupo.rutasFavoritas).to.deep.equal([1, 2, 3]);
    grupo.removeRutaFavorita(2);
    expect(grupo.rutasFavoritas).to.be.a("array");
    expect(grupo.rutasFavoritas).to.have.lengthOf(2);
    expect(grupo.rutasFavoritas).to.deep.equal([1, 3]);
  });
  it("Grupo debe tener un historial de entrenamientos", () => {
    expect(grupo.historial).to.be.a("array");
    expect(grupo.historial).to.be.empty;
  });
});
```

- `Reto.spec.ts`:

```TypeScript
import "mocha";
import { expect } from "chai";

import { Reto } from "../src/Reto/Reto";

const reto = new Reto("Reto 1", "Ciclismo");

describe("Reto class tests", () => {
  it("Reto debería tener un identificador", () => {
    expect(reto.id).to.be.a("number");
    expect(reto.id).to.equal(0);
  });
  it("Reto debería tener un nombre", () => {
    expect(reto.nombre).to.be.a("string");
    expect(reto.nombre).to.equal("Reto 1");
  });
  it("Reto debería tener una lista de rutas", () => {
    expect(reto.rutas).to.be.a("array");
    expect(reto.rutas).to.be.empty;
  });
  it("Reto debería poder modificar su lista de rutas", () => {
    reto.addRuta(1);
    expect(reto.rutas).to.be.a("array");
    expect(reto.rutas).to.have.lengthOf(1);
    expect(reto.rutas).to.deep.equal([1]);
    reto.removeRuta(1);
    expect(reto.rutas).to.be.a("array");
    expect(reto.rutas).to.be.empty;
  });
  it("Reto debería tener un tipo de actividad", () => {
    expect(reto.tipo).to.be.a("string");
    expect(reto.tipo).to.equal("Ciclismo");
  });
  it("Reto debería tener una lista de usuarios", () => {
    expect(reto.usuarios).to.be.a("array");
    expect(reto.usuarios).to.be.empty;
  });
  it("Reto debería poder modificar su lista de usuarios", () => {
    reto.addUsuario(1);
    expect(reto.usuarios).to.be.a("array");
    expect(reto.usuarios).to.have.lengthOf(1);
    expect(reto.usuarios).to.deep.equal([1]);
    reto.removeUsuario(1);
    expect(reto.usuarios).to.be.a("array");
    expect(reto.usuarios).to.be.empty;
  });
  it("Reto debería tener una cantidad de kilómetros a realizar", () => {
    expect(reto.km).to.be.a("number");
    expect(reto.km).to.equal(0);
    reto.km = 100;
    expect(reto.km).to.be.a("number");
    expect(reto.km).to.equal(100);
  });
});
```

- `Ruta.spec.ts`:

```TypeScript
import "mocha";
import { expect } from "chai";

import { Coordenada } from "../src/Ruta/Coordenada";
import { Ruta } from "../src/Ruta/Ruta";

const ruta = new Ruta(
  "Ruta de prueba",
  new Coordenada(0, 0),
  new Coordenada(1, 1),
  1,
  1,
  "Ciclismo"
);

describe("Coordenada class tests", () => {
  it("Coordenada debería tener una latitud", () => {
    const coordenada = new Coordenada();
    expect(coordenada.latitud).to.be.a("number");
    expect(coordenada.latitud).to.equal(0);
  });
  it("Coordenada debería tener una longitud", () => {
    const coordenada = new Coordenada();
    expect(coordenada.longitud).to.be.a("number");
    expect(coordenada.longitud).to.equal(0);
  });
});

describe("Ruta class tests", () => {
  it("Ruta debería tener un nombre", () => {
    expect(ruta.nombre).to.be.a("string");
    expect(ruta.nombre).to.equal("Ruta de prueba");
  });
  it("Ruta debería tener un identificador", () => {
    expect(ruta.id).to.be.a("number");
    expect(ruta.id).to.equal(0);
  });
  it("Ruta debería tener una coordenada de inicio", () => {
    expect(ruta.inicio).to.be.an.instanceOf(Coordenada);
    expect(ruta.inicio.latitud).to.equal(0);
    expect(ruta.inicio.longitud).to.equal(0);
  });
  it("Ruta debería tener una coordenada de fin", () => {
    expect(ruta.fin).to.be.an.instanceOf(Coordenada);
    expect(ruta.fin.latitud).to.equal(1);
    expect(ruta.fin.longitud).to.equal(1);
  });
  it("Ruta debería tener una longitud", () => {
    expect(ruta.longitud).to.be.a("number");
    expect(ruta.longitud).to.equal(1);
  });
  it("Ruta debería tener un desnivel", () => {
    expect(ruta.desnivel).to.be.a("number");
    expect(ruta.desnivel).to.equal(1);
  });
  it("Ruta debería tener un actividad de actividad", () => {
    expect(ruta.actividad).to.be.a("string");
    expect(ruta.actividad).to.equal("Ciclismo");
  });
  it("Ruta debería tener una lista de usuarios", () => {
    expect(ruta.usuarios).to.be.a("array");
    expect(ruta.usuarios).to.deep.equal([]);
  });
  it("Ruta debería poder modificar su lista de usuarios", () => {
    ruta.addUsuario(1);
    expect(ruta.usuarios).to.deep.equal([1]);
    ruta.removeUsuario(1);
    expect(ruta.usuarios).to.deep.equal([]);
  });
  it("Ruta debería tener una calificación", () => {
    expect(ruta.calificacion).to.be.a("number");
    expect(ruta.calificacion).to.equal(0);
  });
  it("Ruta debería poder modificar su calificación", () => {
    ruta.calificacion = 5;
    expect(ruta.calificacion).to.equal(5);
  });
});
```

- `Usuario.spec.ts`:

```TypeScript
import "mocha";
import { expect } from "chai";

import { Usuario } from "../src/Usuario/Usuario";
import { EstadisticaUsuario } from "../src/Estadistica/EstadisticaUsuario";

const usuario = new Usuario("Iluzio", "Ciclismo");

describe("Usuario class tests", () => {
  it("Usuario debería tener un nombre", () => {
    expect(usuario.nombre).to.be.a("string");
    expect(usuario.nombre).to.equal("Iluzio");
  });
  it("Usuario debería tener un identificador", () => {
    expect(usuario.id).to.be.a("number");
  });
  it("Usuario debería tener una activad rutinaria", () => {
    expect(usuario.actividad).to.be.a("string");
    expect(usuario.actividad).to.equal("Ciclismo");
    usuario.actividad = "Running";
    expect(usuario.actividad).to.equal("Running");
  });
  it("Usuario debería tener una lista de amigos", () => {
    expect(usuario.amigos).to.be.a("array");
    expect(usuario.amigos).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de amigos", () => {
    usuario.addAmigo(1);
    expect(usuario.amigos).to.deep.equal([1]);
    usuario.removeAmigo(1);
    expect(usuario.amigos).to.be.empty;
  });
  it("Usuario debería tener una lista de grupos de amigos", () => {
    expect(usuario.grupos).to.be.a("array");
    expect(usuario.grupos).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de grupos de amigos", () => {
    usuario.addGrupo(1);
    expect(usuario.grupos).to.deep.equal([1]);
    usuario.removeGrupo(1);
    expect(usuario.grupos).to.be.empty;
  });
  it("Usuario debería tener unas estadísticas", () => {
    expect(usuario.estadisticas).to.be.an.instanceOf(EstadisticaUsuario);
    expect(usuario.estadisticas.dia.km).to.equal(0);
    expect(usuario.estadisticas.dia.desnivel).to.equal(0);
    expect(usuario.estadisticas.semana.km).to.equal(0);
    expect(usuario.estadisticas.semana.desnivel).to.equal(0);
    expect(usuario.estadisticas.mes.km).to.equal(0);
    expect(usuario.estadisticas.mes.desnivel).to.equal(0);
  });
  it("Usuario debería poder modificar sus estadísticas", () => {
    usuario.estadisticas.dia.km = 10;
    usuario.estadisticas.dia.desnivel = 100;
    usuario.estadisticas.semana.km = 100;
    usuario.estadisticas.semana.desnivel = 1000;
    usuario.estadisticas.mes.km = 1000;
    usuario.estadisticas.mes.desnivel = 10000;
    expect(usuario.estadisticas.dia.km).to.equal(10);
    expect(usuario.estadisticas.dia.desnivel).to.equal(100);
    expect(usuario.estadisticas.semana.km).to.equal(100);
    expect(usuario.estadisticas.semana.desnivel).to.equal(1000);
    expect(usuario.estadisticas.mes.km).to.equal(1000);
    expect(usuario.estadisticas.mes.desnivel).to.equal(10000);
  });
  it("Usuario debería tener una lista de rutas favoritas", () => {
    expect(usuario.rutasFavoritas).to.be.a("array");
    expect(usuario.rutasFavoritas).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de rutas favoritas", () => {
    usuario.addRutaFavorita(1);
    expect(usuario.rutasFavoritas).to.deep.equal([1]);
    usuario.removeRutaFavorita(1);
    expect(usuario.rutasFavoritas).to.be.empty;
  });
  it("Usuario debería tener una lista de retos activos", () => {
    expect(usuario.retos).to.be.a("array");
    expect(usuario.retos).to.be.empty;
  });
  it("Usuario debería poder modificar su lista de retos activos", () => {
    usuario.addReto(1);
    expect(usuario.retos).to.deep.equal([1]);
    usuario.removeReto(1);
    expect(usuario.retos).to.be.empty;
  });
  it("Usuario debería tener un registro de sus rutas", () => {
    expect(usuario.historial).to.be.a("array");
    expect(usuario.historial).to.be.empty;
  });
});
```

Y como podemos ver a continuación todas las pruebas fueron superadas con éxito:

```bash
  EstadisticaUsuario class tests
    ✔ EstadisticaUsuario debería tener estadísticas diarias, semanales, mensuales y anuales

  EstadisticaGrupo class tests
    ✔ EstadisticaGrupo debería tener estadísticas diarias, semanales, mensuales y anuales

  Gestor class tests
    ✔ Gestor debería ser una clase singleton
    ✔ Gestor debería tener una colección de rutas
    ✔ Gestor debería ser capaz de añadir rutas
    ✔ Gestor debería ser capaz de eliminar rutas
    ✔ Gestor debería tener una colección de usuarios
    ✔ Gestor debería ser capaz de añadir usuarios
    ✔ Gestor debería ser capaz de eliminar usuarios
    ✔ Gestor debería tener una colección de grupos
    ✔ Gestor debería ser capaz de añadir grupos
    ✔ Gestor debería ser capaz de eliminar grupos
    ✔ Gestor debería ser capaz de añadir usuarios a grupos
    ✔ Gestor debería ser capaz de eliminar usuarios de grupos
    ✔ Gestor debería tener una colección de retos
    ✔ Gestor debería ser capaz de añadir retos
    ✔ Gestor debería ser capaz de eliminar retos
    ✔ Gestor debería tener un método para ejecutar un menú

  Grupo class tests
    ✔ Grupo debería tener un identificador
    ✔ Grupo debería tener un nombre
    ✔ Grupo debería tener una lista de participantes
    ✔ Grupo debería poder modificar su lista de participantes
    ✔ Grupo debería tener estadísticas semanales, mensuales y anuales
    ✔ Grupo debe tener un ranking de sus integrantes
    ✔ Grupo debería poder modificar su ranking
    ✔ Grupo debe tener una lista de rutas favoritas
    ✔ Grupo debe poder modificar su lista de rutas favoritas
    ✔ Grupo debe tener un historial de entrenamientos

  Reto class tests
    ✔ Reto debería tener un identificador
    ✔ Reto debería tener un nombre
    ✔ Reto debería tener una lista de rutas
    ✔ Reto debería poder modificar su lista de rutas
    ✔ Reto debería tener un tipo de actividad
    ✔ Reto debería tener una lista de usuarios
    ✔ Reto debería poder modificar su lista de usuarios
    ✔ Reto debería tener una cantidad de kilómetros a realizar

  Coordenada class tests
    ✔ Coordenada debería tener una latitud
    ✔ Coordenada debería tener una longitud

  Ruta class tests
    ✔ Ruta debería tener un nombre
    ✔ Ruta debería tener un identificador
    ✔ Ruta debería tener una coordenada de inicio
    ✔ Ruta debería tener una coordenada de fin
    ✔ Ruta debería tener una longitud
    ✔ Ruta debería tener un desnivel
    ✔ Ruta debería tener un actividad de actividad
    ✔ Ruta debería tener una lista de usuarios
    ✔ Ruta debería poder modificar su lista de usuarios
    ✔ Ruta debería tener una calificación
    ✔ Ruta debería poder modificar su calificación

  Usuario class tests
    ✔ Usuario debería tener un nombre
    ✔ Usuario debería tener un identificador
    ✔ Usuario debería tener una activad rutinaria
    ✔ Usuario debería tener una lista de amigos
    ✔ Usuario debería poder modificar su lista de amigos
    ✔ Usuario debería tener una lista de grupos de amigos
    ✔ Usuario debería poder modificar su lista de grupos de amigos
    ✔ Usuario debería tener unas estadísticas
    ✔ Usuario debería poder modificar sus estadísticas
    ✔ Usuario debería tener una lista de rutas favoritas
    ✔ Usuario debería poder modificar su lista de rutas favoritas
    ✔ Usuario debería tener una lista de retos activos
    ✔ Usuario debería poder modificar su lista de retos activos
    ✔ Usuario debería tener un registro de sus rutas

  63 passing (36ms)
```

También podemos comprobar el cubrimiento de código con Istanbul y Coveralls:

```bash
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------|---------|----------|---------|---------|-------------------
All files               |     100 |      100 |     100 |     100 | 
 Estadistica            |     100 |      100 |     100 |     100 | 
  Entrenamiento.ts      |     100 |      100 |     100 |     100 | 
  EstadisticaGrupo.ts   |     100 |      100 |     100 |     100 | 
  EstadisticaUsuario.ts |     100 |      100 |     100 |     100 | 
 Gestor                 |     100 |      100 |     100 |     100 | 
  BasicGestor.ts        |     100 |      100 |     100 |     100 | 
  Gestor.ts             |     100 |      100 |     100 |     100 | 
 Grupo                  |     100 |      100 |     100 |     100 | 
  Grupo.ts              |     100 |      100 |     100 |     100 | 
 Otros                  |     100 |      100 |     100 |     100 | 
  IdGenerator.ts        |     100 |      100 |     100 |     100 | 
 Reto                   |     100 |      100 |     100 |     100 | 
  Reto.ts               |     100 |      100 |     100 |     100 | 
 Ruta                   |     100 |      100 |     100 |     100 | 
  BasicRuta.ts          |     100 |      100 |     100 |     100 | 
  Coordenada.ts         |     100 |      100 |     100 |     100 | 
  Ruta.ts               |     100 |      100 |     100 |     100 | 
 Usuario                |     100 |      100 |     100 |     100 | 
  BasicUsuario.ts       |     100 |      100 |     100 |     100 | 
  Usuario.ts            |     100 |      100 |     100 |     100 | 
------------------------|---------|----------|---------|---------|-------------------
```

Así que por último mostramos su funcionamiento por terminal:

```console
? Introduzca el nombre de usuario:  Iluzio
? Introduzca el tipo de actividad que desea realizar:
  Ciclismo
> Running
? Menú principal. Escoge una opción:  (Use arrow keys)
> Visualizar Rutas
  Visualizar Usuarios
  Visualizar Grupos
  Visualizar Retos
  Salir
  =================================
  RUTAS
  =================================
  ID: 0
  Nombre: Camino de Santiago
  Inicio: 0, 0
  Fin: 5, 5
  Longitud: 4
  Desnivel: 1
  Actividad: Running
  =================================
  =================================
  USUARIOS
  =================================
  ID: 0
  Nombre: Iluzio
  Actividad: Running
  =================================
  ? ¿Qué acción desea realizar? (Use arrow keys)
  > Volver
  ? ¿Qué acción desea realizar? (Use arrow keys)
  > Entrar en Grupo
  Salir de Grupo
  Volver
  ? ¿Qué acción desea realizar? Entrar en Grupo
  ? Introduzca el nombre del Grupo al que desea entrar:  DSI
  =================================
  GRUPOS
  =================================
  ID: 0
  Nombre: DSI
  Participantes: Iluzio
  =================================
  =================================
  RETOS
  =================================
  ID: 0
  Nombre: one for all
  Tipo: Running
  Rutas:
  Kilometros: 9999999999999999999999
  Participantes: Iluzio
  =================================
```

## Conclusión

Ha sido una práctica con cierto nivel de complejidad pero que nos a ayudado no a saber trabajar en equipo por separado si no a usar herramientas como LiveShare en VSC que ha sido de gran ayuda. Cabe destacar que en esta práctica hemos alcanzado nuestro objetivo que era acabar con algo funcional, gracias al uso de todos los conocimientos adquiridos en la asignatura hasta esta semana. Incluso utilizamos patrones como `Singleton` por ejemplo. También tuvimos en cuenta y respetamos los principios Solid.

Por último, hay que mencionar la gran utilidad de Istanbul, Coveralls y Sonar, que te ayudan ha realizar un seguimiento y cubrimiento del código ejemplar junto a una buena caliad de código.

## Elementos Bibliográficos:

- Guión de la práctica 7, https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/.

- Principios SOLID, https://profile.es/blog/principios-solid-desarrollo-software-calidad/.

- Adam Freeman - Essential TypeScript 4: From Beginner to ProURL,https://www.oreilly.com/library/view/essential-typescript-4/9781484270110/html/Part_1.xhtml .
