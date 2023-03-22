// Clase para representar un usuario
class Usuario {
  id: number;
  nombre: string;
  actividades: ("corriendo" | "bicicleta")[];
  amigos: number[]; // IDs de los usuarios amigos
  grupos: number[][]; // IDs de los grupos a los que pertenece el usuario
  estadisticas: {
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
  };
  rutasFavoritas: number[]; // IDs de las rutas favoritas del usuario
  retosActivos: number[]; // IDs de los retos en los que está participando el usuario
  historico: {
    [fecha: string]: number[]; // IDs de las rutas realizadas en la fecha
  };
}
