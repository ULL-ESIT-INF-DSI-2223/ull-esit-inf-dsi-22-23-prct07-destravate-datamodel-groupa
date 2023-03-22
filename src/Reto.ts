// Clase para representar un reto
class Reto {
  id: number;
  nombre: string;
  rutas: number[]; // IDs de las rutas que forman parte del reto
  tipoActividad: "bicicleta" | "corriendo";
  kmTotales: number;
  usuarios: number[]; // IDs de los usuarios que están realizando el reto
}
