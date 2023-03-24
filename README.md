# Práctica 7 - Destravate

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

- ```BasicRuta.ts```:

```TypeScript
import { Coordenada } from "./Coordenada";

/**
 * Interfaz para representar la información básica de una ruta.
 * @interface BasicRutaInfo
 * @property {number} id - Identificador, único, de la ruta.
 * @property {Coordenada} inicio - Coordenada de inicio de la ruta.
 * @property {Coordenada} fin - Coordenada de fin de la ruta.
 * @property {number} longitud - Longitud total de la ruta en kilómetros.
 */
export interface BasicRutaInfo {
  id: number;
  inicio: Coordenada;
  fin: Coordenada;
  longitud: number;
}

/**
 * Clase para representar la información básica de una ruta.
 * @class BasicRuta
 * @implements {BasicRutaInfo}
 * @param {number} id - Identificador, único, de la ruta.
 * @param {Coordenada} inicio - Coordenada de inicio de la ruta.
 * @param {Coordenada} fin - Coordenada de fin de la ruta.
 * @param {number} longitud - Longitud total de la ruta en kilómetros.
 */
export class BasicRuta implements BasicRutaInfo {
  constructor(
    readonly id: number,
    readonly inicio: Coordenada,
    readonly fin: Coordenada,
    readonly longitud: number
  ) {}
}
```

Se define una interfaz y una clase relacionadas con la información de una ruta. La interfaz se llama ```BasicRutaInfo``` y define cuatro propiedades: un identificador único ```id```, una coordenada de inicio ```inicio```, una coordenada final ```fin``` y la longitud total de la ruta en kilómetros ```longitud```. La clase ```BasicRuta``` implementa esta interfaz y tiene un ```constructor``` que acepta los mismos parámetros que la interfaz, y los almacena como propiedades de sólo lectura en la instancia de la clase. La clase y la interfaz dependen de la clase ```Coordenada```, que se importa desde otro archivo.

- ```Coordenada.ts```:

```TypeScript
/**
 * Definición de clase para representar una coordenada geográfica para las rutas.
 * La primera componente es la latitud y la segunda la longitud.
 * @class Coordenada
 * @property {number} latitud - Latitud de la coordenada.
 * @property {number} longitud - Longitud de la coordenada.
 */
export class Coordenada {
  constructor(readonly latitud: number, readonly longitud: number) {}
}
```

Se define una clase llamada ```Coordenada``` que representa una coordenada geográfica con dos propiedades: ```latitud``` y ```longitud```. La clase tiene un ```constructor``` que toma dos argumentos, ```latitud``` y ```longitud```, y los asigna a las propiedades correspondientes de solo lectura de la clase.

- ```Ruta.ts```:

```TypeScript
import { Coordenada } from "./Coordenada";
import { BasicRuta } from "./BasicRuta";

/**
 * Definición de actividad para representar el actividad de actividad de una ruta.
 * @type {TipoActividad}
 * @property {string} Ciclismo - Actividad de ciclismo.
 * @property {string} Running - Actividad de running.
 */
export type TipoActividad = "Ciclismo" | "Running";

/**
 * Interfaz para representar la información de una ruta.
 * @interface RutaInfo
 * @property {string} nombre - Nombre de la ruta.
 * @property {number} desnivel - Desnivel medio de la ruta en metros.
 * @property {number[]} usuarios - Lista de usuarios que han realizado la ruta.
 * @method addUsuario - Añade un usuario a la lista de usuarios que han realizado la ruta.
 * @property {TipoActividad} actividad - actividad de actividad de la ruta.
 * @property {number} calificacion - Calificación de la ruta en una escala del 1 al 5.
 */
export interface RutaInfo {
  nombre: string;
  desnivel: number;
  usuarios: number[];
  addUsuario(id: number): void;
  actividad: TipoActividad;
  calificacion: number;
}

/**
 * Clase para representar una ruta.
 * @class Ruta
 * @implements {RutaInfo}
 * @extends {BasicRuta}
 * @property {string} nombre - Nombre de la ruta.
 * @property {number} desnivel - Desnivel medio de la ruta en metros.
 * @property {number[]} usuarios - Lista de usuarios que han realizado la ruta.
 * @method addUsuario - Añade un usuario a la lista de usuarios que han realizado la ruta.
 * @property {TipoActividad} actividad - actividad de actividad de la ruta.
 * @property {number} calificacion - Calificación de la ruta en una escala del 1 al 5.
 * @example
 * ```typescript
 * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
 * ruta.nombre; // "Ruta de prueba"
 * ruta.id; // 1
 * ruta.inicio; // [0, 0]
 * ruta.fin; // [1, 1]
 * ruta.longitud; // 1
 * ruta.desnivel; // 1
 * ruta.actividad; // "Ciclismo"
 * ruta.usuarios; // []
 * ruta.calificacion; // 0
 * ```
 */
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

  /**
   * Método para acceder a la lista de usuarios que han realizado la ruta.
   * @returns {number[]} Lista de usuarios que han realizado la ruta.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.usuarios; // []
   * ```
   */
  get usuarios(): number[] {
    return this._usuarios;
  }

  /**
   * Método para añadir un usuario a la lista de usuarios que han realizado la ruta.
   * @param {number} id - Identificador del usuario.
   * @returns {void}
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.addUsuario(1);
   * ruta.usuarios; // [1]
   * ```
   */
  addUsuario(id: number): void {
    if (this._usuarios.includes(id)) return;
    this._usuarios.push(id);
  }

  /**
   * Método para acceder a la calificación de la ruta.
   * @returns {number} Calificación de la ruta en una escala del 1 al 5.
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.calificacion; // 0
   * ```
   */
  get calificacion(): number {
    return this._calificacion;
  }

  /**
   * Método para modificar la calificación de la ruta.
   * @param {number} calificacion - Calificación de la ruta en una escala del 1 al 5.
   * @returns {void}
   * @example
   * ```typescript
   * const ruta = new Ruta("Ruta de prueba", 1, [0, 0], [1, 1], 1, 1, "Ciclismo");
   * ruta.calificacion = 3;
   * ruta.calificacion; // 3
   * ```
   */
  set calificacion(calificacion: number) {
    this._calificacion = calificacion;
  }
}
```

Aquí tenemos la implementación de una clase y una interfaz para representar la ruta y su información asociada. La clase ```Ruta``` implementa la interfaz ```RutaInfo``` y extiende la clase ```BasicRuta```.

La interfaz ```RutaInfo``` describe la información que debe tener un objeto de tipo ```Ruta```, incluyendo el nombre, el desnivel, la lista de usuarios que han realizado la ruta, la actividad de la ruta y su calificación. Además, la interfaz define un método ```addUsuario``` para añadir usuarios a la lista de usuarios que han realizado la ruta.

La clase ```Ruta``` tiene los mismos atributos y método que la interfaz ```RutaInfo```. Además, tiene un ```constructor``` que toma los mismos parámetros que la interfaz, así como un identificador único para la ruta. La clase también tiene ```getters``` y ```setters``` para los atributos de la ruta, como la lista de usuarios que han realizado la ruta y la calificación de la ruta.



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

- ```BasicUsuario.ts```:

```TypeScript
import { TipoActividad } from "../Ruta/Ruta";

/**
 * Interfaz para representar la información básica de un usuario.
 * @interface BasicUsuarioInfo
 * @property {string} nombre - Nombre del usuario.
 * @property {number} id - Identificador del usuario.
 * @property {TipoActividad} actividad - actividad de actividad del usuario.
 */
export interface BasicUsuarioInfo {
  nombre: string;
  id: number;
  actividad: TipoActividad;
}

/**
 * Clase para representar la información básica de un usuario.
 * @class BasicUsuario
 * @implements {BasicUsuarioInfo}
 * @param {string} nombre - Nombre del usuario.
 * @param {number} id - Identificador del usuario.
 * @param {TipoActividad} actividad - actividad de actividad del usuario.
 */
export abstract class BasicUsuario implements BasicUsuarioInfo {
  protected _actividad: TipoActividad;
  constructor(
    readonly nombre: string,
    readonly id: number,
    actividad: TipoActividad
  ) {
    this._actividad = actividad;
  }

  /**
   * Método para acceder a la actividad del usuario.
   * @returns {TipoActividad} Actividad del usuario.
   * @example
   * ```typescript
   * const usuario = new BasicUsuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.actividad; // "Ciclismo"
   * ```
   */
  get actividad(): TipoActividad {
    return this._actividad;
  }
}
```

Se define una interfaz llamada ```BasicUsuarioInfo``` que describe la información básica de un usuario. La interfaz tiene tres propiedades: ```nombre```, ```id``` y ```actividad```. La propiedad actividad es de tipo ```TipoActividad```, que se define en el archivo comentado anteriormente llamado ```Ruta.ts```.

Luego, se define una clase abstracta llamada ```BasicUsuario```, que implementa la interfaz ```BasicUsuarioInfo```. La clase tiene tres propiedades: ```nombre, ```id``` y ```_actividad```. La propiedad ```_actividad``` está protegida y no es accesible desde fuera de la clase. El ```constructor``` de la clase acepta los mismos tres parámetros que la interfaz ```BasicUsuarioInfo``` que ya habíamos mencionado.

La clase tiene un método ```getter``` llamado ```actividad``` que devuelve la propiedad ```_actividad```.

- ```Entrenamiento.ts```:

```TypeScript
/**
 * Definición de la clase para representar un entrenamiento de un usuario en la aplicación.
 * Puede ser diario, semanal o mensual.
 * @class Entrenamiento
 * @property {number} km - Kilómetros recorridos en el entrenamiento, por defecto 0.
 * @property {number} desnivel - Desnivel acumulado en el entrenamiento, por defecto 0.
 */
export class Entrenamiento {
  constructor(public km: number = 0, public desnivel: number = 0) {}
};
```

Aquí una clase llamada ```Entrenamiento``` que representa un entrenamiento de un usuario en una aplicación. La clase tiene dos propiedades públicas llamadas ```km``` y ```desnivel```, que representan los kilómetros recorridos y el desnivel acumulado en el entrenamiento respectivamente. El ```constructor``` de la clase tiene dos parámetros opcionales que inicializan las propiedades ```km``` y ```desnivel``` con un valor predeterminado de 0.

- ```Estadistica.ts```:

```TypeScript
import { Entrenamiento } from './Entrenamiento';

/**
 * Definición de la clase para representar las estadísticas de un usuario en la aplicación.
 * @class Estadistica
 * @property {Entrenamiento} dia - Registro de km recorridos y desnivel acumulado en el día.
 * @property {Entrenamiento} semana - Registro de km recorridos y desnivel acumulado en la semana.
 * @property {Entrenamiento} mes - Registro de km recorridos y desnivel acumulado en el mes.
 */
export class Estadistica {
  constructor(
    public dia: Entrenamiento = new Entrenamiento(),
    public semana: Entrenamiento = new Entrenamiento(),
    public mes: Entrenamiento = new Entrenamiento()
  ) {}
}
```

Se define la clase llamada ```Estadistica``` que tiene tres propiedades: ```dia```, ```semana``` y ```mes```, todas del tipo ```Entrenamiento```. La clase tiene un ```constructor``` que inicializa las propiedades con valores predeterminados de un objeto ```Entrenamiento``` vacío.

- ```Registro.ts```:

```TypeScript
/**
 * Interfaz para definir la información de un registro de entrenamiento.
 * @interface RegistroInfo
 * @property {string} fecha - Fecha del registro.
 * @property {number[]} rutas - Lista de rutas realizadas en el registro.
 */
export interface RegistroInfo {
  readonly fecha: string;
  rutas: number[];
}

/**
 * Clase para representar un registro de entrenamiento.
 * @class Registro
 * @implements {RegistroInfo}
 * @property {string} fecha - Fecha del registro.
 * @property {number[]} rutas - Lista de rutas realizadas en el registro.
 * @method addRuta - Añade una ruta al registro.
 */
export class Registro {
  private _rutas: number[] = [];
  constructor(readonly fecha: string, rutas: number[]) {
    this._rutas = rutas;
  }

  /**
   * Lista de rutas realizadas en el registro.
   * @returns {number[]}
   * @example
   * ```typescript
   * const registro = new Registro("2020-01-01", [1, 2, 3]);
   * registro.rutas; // [1, 2, 3]
   * ```
   */
  get rutas(): number[] {
    return this._rutas;
  }

  /**
   * Añade una ruta al registro.
   * @param {number} id - Identificador de la ruta.
   * @returns {void}
   * @example
   * ```typescript
   * const registro = new Registro("2020-01-01", [1, 2, 3]);
   * registro.addRuta(4);
   * registro.rutas; // [1, 2, 3, 4]
   * ```
   */
  addRuta(id: number): void {
    if (this._rutas.includes(id)) 
      return;
    this._rutas.push(id);
  }
}
```

Se define una interfaz y una clase para representar registros de entrenamiento. La interfaz ```RegistroInfo``` define los atributos de un registro, como su ```fecha``` y las ```rutas``` realizadas durante el entrenamiento. La clase ```Registro``` implementa la interfaz ```RegistroInfo``` y define su ```constructor```, que toma una fecha y una lista de rutas realizadas durante el entrenamiento.

La clase ```Registro``` también tiene un método ```addRuta```, que permite añadir una nueva ruta al registro. La propiedad ```rutas``` de la clase ```Registro``` devuelve la lista de rutas realizadas durante el entrenamiento.

- ```Usuario.ts```:

```TypeScript
import { BasicUsuario } from "./BasicUsuario";
import { TipoActividad } from "../Ruta/Ruta";
import { Estadistica } from "./Estadistica";
import { Registro } from "./Registro";

/**
 * Interfaz para representar la información de un usuario para la aplicación.
 * @interface UsuarioInfo
 * @property {number[]} amigos - Lista de amigos del usuario.
 * @property {number[][]} grupos - Lista de grupos del usuario.
 * @property {Estadistica} estadisticas - Estadísticas diarias, semanales y mensuales del usuario.
 * @property {number[]} rutasFavoritas - Lista de rutas favoritas del usuario.
 * @property {number[]} retos - Lista de retos activos del usuario.
 * @property {Registro[]} historial - Lista de registros de entrenamientos del usuario.
 */
export interface UsuarioInfo {
  amigos: number[];
  grupos: number[][];
  estadisticas: Estadistica;
  rutasFavoritas: number[];
  retos: number[];
  historial: Registro[];
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
  protected _estadisticas: Estadistica = new Estadistica();
  protected _rutasFavoritas: number[] = [];
  protected _retos: number[] = [];
  protected _historial: Registro[] = [];
  constructor(nombre: string, id: number, actividad: TipoActividad) {
    super(nombre, id, actividad);
  }

  /**
   * Método para acceder a la lista de amigos del usuario.
   * @returns {number[]} Lista de amigos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.amigos; // []
   * ```
   */
  get amigos(): number[] {
    return this._amigos;
  }

  /**
   * Método para acceder a la lista de grupos del usuario.
   * @returns {number[][]} Lista de grupos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.grupos; // []
   * ```
   */
  get grupos(): number[][] {
    return this._grupos;
  }

  /**
   * Método para acceder a las estadísticas del usuario.
   * @returns {Estadistica} Estadísticas del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.estadisticas.dia.km; // 0
   * usuario.estadisticas.dia.desnivel; // 0
   * usuario.estadisticas.semana.km; // 0
   * usuario.estadisticas.semana.desnivel; // 0
   * usuario.estadisticas.mes.km; // 0
   * usuario.estadisticas.mes.desnivel; // 0
   * ```
   */
  get estadisticas(): Estadistica {
    return this._estadisticas;
  }

  /**
   * Método para acceder a la lista de rutas favoritas del usuario.
   * @returns {number[]} Lista de rutas favoritas del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.rutasFavoritas; // []
   * ```
   */
  get rutasFavoritas(): number[] {
    return this._rutasFavoritas;
  }

  /**
   * Método para acceder a la lista de retos activos del usuario.
   * @returns {number[]} Lista de retos activos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.retos; // []
   * ```
   */
  get retos(): number[] {
    return this._retos;
  }

  /**
   * Método para acceder a la lista de registros de entrenamientos del usuario.
   * @returns {Registro[]} Lista de registros de entrenamientos del usuario.
   * @example
   * ```typescript
   * const usuario = new Usuario("Usuario de prueba", 1, "Ciclismo");
   * usuario.historial; // []
   * ```
   */
  get historial(): Registro[] {
    return this._historial;
  }
}
```

Es definida una interfaz llamada ```UsuarioInfo``` que especifica la información que debe contener la clase ```Usuario```. La clase ```Usuario``` extiende otra clase llamada ```BasicUsuario``` y también implementa la interfaz ```UsuarioInfo```. La clase ```Usuario``` tiene seis propiedades protegidas que representan la información del usuario: ```_amigos```, ```_grupos```, ```_estadisticas```, ```_rutasFavoritas```, ```_retos``` y ```_historial```. La clase también tiene seis métodos ```getter``` que permiten acceder a estas propiedades protegidas.


### Grupos

### Retos

## Conclusión 

## Elementos Bibliográficos:

- Guión de la práctica 7, https://ull-esit-inf-dsi-2223.github.io/prct07-destravate-dataModel/.

- Principios SOLID, https://profile.es/blog/principios-solid-desarrollo-software-calidad/.

- Adam Freeman - Essential TypeScript 4: From Beginner to ProURL,https://www.oreilly.com/library/view/essential-typescript-4/9781484270110/html/Part_1.xhtml .

